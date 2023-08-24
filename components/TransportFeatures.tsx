import styles from './TransportItem.module.scss'

const TransportFeatures = ({ active, features, payment = null }) => {
  console.log(payment)
  return (
    <>
      {active && (
        <div className={styles.content}>
          {payment.paymentMethod && (
            <div className={styles.item}>
              <div className={styles.label}>Способ оплаты</div>
              <div className={styles.value}>{payment.paymentMethod}</div>
            </div>
          )}
          {payment.paymentProcedure && (
            <div className={styles.item}>
              <div className={styles.label}>Порядок оплаты</div>
              <div className={styles.value}>{payment.paymentProcedure}</div>
            </div>
          )}
          {features.vehicleBodyType && (
            <div className={styles.item}>
              <div className={styles.label}>Тип транспорта</div>
              <div className={styles.value}>{features.vehicleBodyType}</div>
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
          {features.vehicleBrand && (
            <div className={styles.item}>
              <div className={styles.label}>Марка автомобиля</div>
              <div className={styles.value}>{features.vehicleBrand}</div>
            </div>
          )}
          {features.workExperience && (
            <div className={styles.item}>
              <div className={styles.label}>Опыт работы</div>
              <div className={styles.value}>{features.workExperience}</div>
            </div>
          )}
          {features.leaseTerm && (
            <div className={styles.item}>
              <div className={styles.label}>Срок аренды</div>
              <div className={styles.value}>{features.leaseTerm}</div>
            </div>
          )}
          {features.numberSeats && (
            <div className={styles.item}>
              <div className={styles.label}>Количество мест (с багажом)</div>
              <div className={styles.value}>{features.numberSeats}</div>
            </div>
          )}
          {features.numberSeatsWithoutLuggage && (
            <div className={styles.item}>
              <div className={styles.label}>Количество мест (без багажа)</div>
              <div className={styles.value}>{features.numberSeatsWithoutLuggage}</div>
            </div>
          )}
          {features.serviceSpecialization && (
            <div className={styles.item}>
              <div className={styles.label}>Специализация услуг</div>
              <div className={styles.value}>{features.serviceSpecialization}</div>
            </div>
          )}
          {features.options && (
            <div className={styles.item}>
              <div className={styles.label}>Опции</div>
              <div className={styles.value}>{features.options}</div>
            </div>
          )}
          {features.amenities && (
            <div className={styles.item}>
              <div className={styles.label}>Удобства</div>
              <div className={styles.value}>{features.amenities}</div>
            </div>
          )}
          {features.vehicleClass && (
            <div className={styles.item}>
              <div className={styles.label}>Класс автомобиля</div>
              <div className={styles.value}>{features.vehicleClass}</div>
            </div>
          )}
          {features.color && (
            <div className={styles.item}>
              <div className={styles.label}>Цвет</div>
              <div className={styles.value}>{features.color}</div>
            </div>
          )}
          {features.vehiclesInPark && (
            <div className={styles.item}>
              <div className={styles.label}>Транспорта в парке</div>
              <div className={styles.value}>{features.vehiclesInPark}</div>
            </div>
          )}
          {features.minimumOrderTime && (
            <div className={styles.item}>
              <div className={styles.label}>Минимальное время заказа</div>
              <div className={styles.value}>{features.minimumOrderTime}</div>
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
          {features.bodyVolume && (
            <div className={styles.item}>
              <div className={styles.label}>Объем кузова</div>
              <div className={styles.value}>{features.bodyVolume} м./куб.</div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default TransportFeatures
