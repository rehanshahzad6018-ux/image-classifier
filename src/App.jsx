import { useState, useRef, useCallback } from 'react'
import DropZone    from './components/DropZone'
import ResultsPanel from './components/ResultsPanel'
import LoadingBar  from './components/LoadingBar'
import { classifyImage } from './utils/classifier'
import styles from './App.module.css'

export default function App() {
  const [image,     setImage]     = useState(null)   // data URL for preview
  const [b64,       setB64]       = useState(null)   // raw base64
  const [mime,      setMime]      = useState(null)   // MIME type
  const [loading,   setLoading]   = useState(false)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState(null)
  const fileInputRef = useRef(null)

  /* ── Load file into state ─────────────────────────────────── */
  const loadFile = useCallback((file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target.result)
      setB64(e.target.result.split(',')[1])
      setMime(file.type)
      setResult(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }, [])

  /* ── Clear everything ─────────────────────────────────────── */
  const reset = () => {
    setImage(null); setB64(null); setMime(null)
    setResult(null); setError(null)
  }

  /* ── Call the API ─────────────────────────────────────────── */
  const analyse = async () => {
    if (!b64) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await classifyImage(b64, mime)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.app}>
      {/* Ambient glow decorations */}
      <div className={styles.glowTop}    aria-hidden />
      <div className={styles.glowBottom} aria-hidden />

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.label}>Vision AI</div>
        <h1 className={styles.title}>
          IMAGE<br /><span>CLASSIFIER</span>
        </h1>
        <p className={styles.subtitle}>Powered by Claude · Drop any image to analyze</p>
      </header>

      {/* ── Main card ── */}
      <main className={styles.card}>

        {/* Upload stage */}
        {!image && <DropZone onFile={loadFile} />}

        {/* Preview + actions stage */}
        {image && (
          <div className={styles.preview}>
            <div className={styles.imgWrap}>
              <img src={image} alt="Uploaded preview" className={styles.img} />

              {/* Overlay controls */}
              <div className={styles.overlayBtns}>
                <button
                  className={styles.iconBtn}
                  onClick={() => fileInputRef.current.click()}
                  title="Change image"
                >↺</button>
                <button
                  className={styles.iconBtn}
                  onClick={reset}
                  title="Remove image"
                >✕</button>
              </div>
            </div>

            {/* Hidden input for "change" */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => loadFile(e.target.files[0])}
            />

            <button
              className={styles.analyseBtn}
              onClick={analyse}
              disabled={loading}
            >
              {loading ? 'Analyzing…' : '→ Classify Image'}
            </button>

            {loading && <LoadingBar />}

            {error && (
              <div className={styles.errorBox} role="alert">
                ⚠ {error}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result && <ResultsPanel result={result} />}
      </main>
    </div>
  )
}
