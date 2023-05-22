import styles from './ModalCargoMoreInfo.module.scss'
import adressIcon from '../public/icons/modal-adress.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function ModalCargoMoreInfo({ cargoInfo }) {
  return (
    <div className={styles.inner}>
      {cargoInfo.acfCargoDiscription.description && <div>{cargoInfo.acfCargoDiscription.description}</div>}
      <div>
        <b>Тип перевозки: </b>
        {cargoInfo.acfCargoFeatures.typeTransportation}
      </div>
      <div>
        <b>Тип загрузки: </b>
        {cargoInfo.acfCargoFeatures.typeLoading}
      </div>
      <div>
        <b>Грузчики: </b>
        {cargoInfo.acfCargoFeatures.movers}
      </div>
      <div>
        <b>Маршрут: </b>
        <div className={styles.route}>
          <div className={styles.pickupPoint}>
            <Image src={adressIcon} alt="Адрес" />
            <div>
              {cargoInfo.acfCargoPickupPoint.shippingCity}{' '}
              <span className={styles.adress}>({cargoInfo.acfCargoPickupPoint.shippingAddress})</span>
            </div>
          </div>
          <div className={styles.arrow}>↓</div>
          <div className={styles.deliverPoint}>
            <Image src={adressIcon} alt="Адрес" />
            <div>
              {cargoInfo.acfCargoDeliverPoint.unloadingCity}{' '}
              <span className={styles.adress}>({cargoInfo.acfCargoDeliverPoint.unloadingAdress})</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <Link href="/">Перейти на карту</Link>
      </div>
    </div>
  )
}
