import styles from './TransportItem.module.scss'
import Image from 'next/image'

const TransportItem = () => {
  return (
    <div key={1} className={styles.transportItem}>
      <div className={styles.image}>{/* <Image src={} width={330} height={166} alt="Главное изображение" /> */}</div>
      <div className={styles.transportNumber}>№6565</div>
      <div className={styles.title}>Грузоперевозки РБ и область</div>
      <div className={styles.address}>Минская область, Пуховичский район, Марьина Горка</div>
      <div className={styles.experience}>5 лет в сервисе</div>
      <div className={styles.features}>
        Характеристики <i className={styles.arrow} />
      </div>
      <div className={styles.priceBlock}>
        <div className={styles.item}>
          <div className={styles.price}>15</div>
          <div className={styles.metering}>руб./час</div>
        </div>
        <div className={styles.item}>
          <div className={styles.price}>3</div>
          <div className={styles.metering}>руб./км</div>
        </div>
        <div className={styles.item}>
          <div className={styles.price}>150</div>
          <div className={styles.metering}>руб./смена</div>
        </div>
      </div>
      <button className={styles.buttonContacts}>Контакты</button>
    </div>
  )
}

export default TransportItem
