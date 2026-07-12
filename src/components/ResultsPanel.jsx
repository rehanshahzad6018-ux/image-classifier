import styles from './ResultsPanel.module.css'

/**
 * ResultsPanel — displays the structured AI classification output.
 * Props:
 *   result {Object} — parsed response from classifier.js
 */
export default function ResultsPanel({ result }) {
  const {
    primaryObject, category, confidence,
    description, tags, color, mood, setting, details,
  } = result

  return (
    <div className={styles.panel}>

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerLabel}>Analysis Results</span>
        <span className={styles.badge}>{category}</span>
      </div>

      {/* Primary subject */}
      <div className={styles.primary}>
        <div className={styles.primaryLabel}>Primary Subject</div>
        <div className={styles.primaryName}>{primaryObject}</div>

        <div className={styles.confRow}>
          <div className={styles.confTrack}>
            <div
              className={styles.confFill}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className={styles.confPct}>{confidence}%</span>
        </div>

        <p className={styles.desc}>{description}</p>

        <div className={styles.tags}>
          {tags?.map((tag, i) => (
            <span key={i} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Attribute grid */}
      <div className={styles.grid}>
        <div className={styles.attrCard}>
          <div className={styles.attrLabel}>Mood</div>
          <div className={styles.attrValue}>{mood}</div>
        </div>
        <div className={styles.attrCard}>
          <div className={styles.attrLabel}>Setting</div>
          <div className={styles.attrValue}>{setting}</div>
        </div>
        <div className={`${styles.attrCard} ${styles.full}`}>
          <div className={styles.attrLabel}>Dominant Colors</div>
          <div className={styles.attrValue}>{color}</div>
        </div>
      </div>

      {/* Detail rows */}
      {details?.length > 0 && (
        <div className={styles.detailRows}>
          {details.map((d, i) => (
            <div key={i} className={styles.detailRow}>
              <span className={styles.detailKey}>{d.key}</span>
              <span className={styles.detailVal}>{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
