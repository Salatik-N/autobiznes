import styles from './TransportFilter.module.scss'

const TransportFilter = ({ active, regions, onClickRegion }) => {
  return (
    <div className={`${styles.filterBlock} white-background`}>
      {regions.map((item, i) => (
        <button
          key={i}
          className={`${active === i ? styles.active : ''} ${styles.filterButton}`}
          onClick={() => onClickRegion(i)}
        >
          {item.region} - {item.count}
        </button>
      ))}
    </div>
  )
}
export default TransportFilter
