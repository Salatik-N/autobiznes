import styles from './ModalCargoMoreInfo.module.scss'
import adressIcon from '../public/icons/modal-adress.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function ModalCargoMoreInfo({ cargoInfo, google }) {
  const generateGoogleMapsLink = (startCity, startAddress, finishCity, finishAddress) => {
    const encodedStartCity = encodeURIComponent(startCity)
    const encodedStartAddress = encodeURIComponent(`улица ${startAddress}`)
    const encodedFinishCity = encodeURIComponent(finishCity)
    const encodedFinishAddress = encodeURIComponent(`улица ${finishAddress}`)
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodedStartAddress},+${encodedStartCity}&destination=${encodedFinishAddress},+${encodedFinishCity}`
    return googleMapsLink
  }

  return (
    <div className={styles.inner}>
      {cargoInfo.acfCargoDescription.shortDescription && (
        <div className={styles.title}>{cargoInfo.acfCargoDescription.shortDescription}</div>
      )}
      {cargoInfo.acfCargoDescription.fullDescription && (
        <div className={styles.description}>{cargoInfo.acfCargoDescription.fullDescription}</div>
      )}
      <div>
        <b>Тип перевозки: </b>
        {cargoInfo.acfCargoFeatures.typeTransportation}
      </div>
      <div>
        <b>Масса груза: </b>
        {cargoInfo.acfCargoFeatures.weight < 1000
          ? `${cargoInfo.acfCargoFeatures.weight} кг.`
          : `${cargoInfo.acfCargoFeatures.weight / 1000} т.`}
      </div>
      <div>
        <b>Тип кузова: </b>
        {cargoInfo.acfCargoFeatures.vehicleBodyType}
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
        <b>Способ оплаты: </b>
        {cargoInfo.acfCargoContacts.paymentMethod}
      </div>
      <div>
        <b>Бюджет: </b>
        {cargoInfo.acfCargoContacts.budgetTo} BYN
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
      <div>
        <b>Расстояние: </b>0
      </div>
      <div className={styles.map}>
        <Link
          href={generateGoogleMapsLink(
            cargoInfo.acfCargoPickupPoint.shippingCity,
            cargoInfo.acfCargoPickupPoint.shippingAddress,
            cargoInfo.acfCargoDeliverPoint.unloadingCity,
            cargoInfo.acfCargoDeliverPoint.unloadingAdress
          )}
          target="_blank"
        >
          Перейти на карту
        </Link>
      </div>
    </div>
  )
}
