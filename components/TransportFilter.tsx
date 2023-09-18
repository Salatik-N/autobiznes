import styles from './TransportFilter.module.scss'

const TransportFilter = ({ activeRegion, regions, onClickRegion, activeCity, cities, onClickCity }) => {
  return (
    <div className={`${styles.filterBlock} white-background`}>
      <div className={styles.filterTitle}>Выберите {activeRegion === 0 ? 'регион' : 'город'} для поиска</div>
      <div className={styles.filterContent}>
        {activeRegion === 0 ? (
          regions.map((item, i) => (
            <button
              key={i}
              className={`${activeRegion === i ? styles.active : ''} ${styles.filterButton}`}
              onClick={() => onClickRegion(i)}
            >
              {item.name}
            </button>
          ))
        ) : (
          <>
            <button className={styles.filterButton} onClick={() => onClickRegion(0)}>
              <i className={styles.filterButtonArrow}></i>
              <span>Регионы</span>
            </button>
            <div className={styles.filterCity}>
              {cities.map((item, i) => (
                <button
                  key={i}
                  className={`${activeCity === i ? styles.active : ''} ${styles.filterButton}`}
                  onClick={() => onClickCity(i)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default TransportFilter
