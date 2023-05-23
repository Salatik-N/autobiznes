import styles from './TransportFilter.module.scss'

const TransportFilter = () => {
  return (
    <div className={`${styles.filterBlock} white-background`}>
      <button className={styles.filterButton}>Все</button>
      <button className={styles.filterButton}>Брестская область</button>
      <button className={styles.filterButton}>Витебская область</button>
      <button className={styles.filterButton}>Гомельская область</button>
    </div>
  )
}
export default TransportFilter
