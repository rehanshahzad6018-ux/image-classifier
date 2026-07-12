import styles from './LoadingBar.module.css'

/** Animated indeterminate loading bar. Shown while AI is processing. */
export default function LoadingBar() {
  return (
    <div className={styles.track} role="progressbar" aria-label="Analyzing image…">
      <div className={styles.fill} />
    </div>
  )
}
