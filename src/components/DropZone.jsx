import { useRef, useState, useCallback } from 'react'
import styles from './DropZone.module.css'

/**
 * DropZone — handles image upload via click or drag-and-drop.
 * Props:
 *   onFile(file: File) — called when a valid image file is selected
 */
export default function DropZone({ onFile }) {
  const inputRef  = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback((file) => {
    if (file && file.type.startsWith('image/')) onFile(file)
  }, [onFile])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
      onClick={() => inputRef.current.click()}
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current.click()}
      aria-label="Upload image"
    >
      <span className={styles.icon}>⬡</span>
      <p className={styles.primary}>Drop image here or click to upload</p>
      <p className={styles.secondary}>JPG · PNG · WEBP · GIF · any image format</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hidden}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  )
}
