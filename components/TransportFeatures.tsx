import styles from './TransportItem.module.scss'

const TransportFeatures = ({ active, features }) => {
  return (
    <>
      {active && (
        <div className={styles.content}>
          {features.typeTranspor && (
            <div className={styles.item}>
              <div className={styles.label}>Вид транспорта</div>
              <div className={styles.value}>{features.typeTranspor}</div>
            </div>
          )}
          {features.typeTransportation && (
            <div className={styles.item}>
              <div className={styles.label}>Тип перевозки</div>
              <div className={styles.value}>{features.typeTransportation}</div>
            </div>
          )}
          {features.carryingCapacity && (
            <div className={styles.item}>
              <div className={styles.label}>Грузоподъемность кузова</div>
              <div className={styles.value}>
                {features.carryingCapacity < 1000
                  ? `${features.carryingCapacity} кг.`
                  : `${features.carryingCapacity / 1000} т.`}
              </div>
            </div>
          )}
          {features.bodyVolume && (
            <div className={styles.item}>
              <div className={styles.label}>Объём кузова</div>
              <div className={styles.value}>{features.bodyVolume} м/куб.</div>
            </div>
          )}
          {features.bodyHeight && (
            <div className={styles.item}>
              <div className={styles.label}>Высота кузова</div>
              <div className={styles.value}>{features.bodyHeight} м.</div>
            </div>
          )}
          {features.bodyLength && (
            <div className={styles.item}>
              <div className={styles.label}>Длина кузова</div>
              <div className={styles.value}>{features.bodyLength} м.</div>
            </div>
          )}
          {features.bodyWidth && (
            <div className={styles.item}>
              <div className={styles.label}>Ширина кузова</div>
              <div className={styles.value}>{features.bodyWidth} м.</div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default TransportFeatures
