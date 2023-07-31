import Image from 'next/image'
import { useState } from 'react'
import styles from './CargoItem.module.scss'
import belarusIcon from '../public/icons/belarus-flag.svg'
import moreButtonIcon from '../public/icons/more-button.svg'
import logisticsIcon from '../public/icons/logistics.svg'
import boxesIcon from '../public/icons/boxes.svg'
import truckIcon from '../public/icons/truck.svg'
import walletIcon from '../public/icons/wallet.svg'
import Declension from '../components/Declension'
import Modal from './Modal'
import AdminTools from './AdminTools'
import ModalCargoContacts from './ModalCargoContacts'
import ModalCargoMoreInfo from './ModalCargoMoreInfo'
import { GET_CARGO_INFO } from '../lib/api'
import { initializeApollo } from '../lib/apollo'
import { Loader } from './Loader'

export default function CargoItem({ cargos, isActiveAdminTools = false }) {
  const [activeModalName, setactiveModalName] = useState(null)
  const [cargoInfo, setCargoInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const apolloClient = initializeApollo()

  const handleModalOpen = (idCargo, e) => {
    setCargoInfo(null)
    setModalActive(true)
    setactiveModalName(e.target.name)
    getCargoInfo(idCargo)
  }

  const getCargoInfo = async (idCargo) => {
    setLoading(true)
    const responseCargo = await apolloClient.query({
      query: GET_CARGO_INFO,
      variables: {
        id: idCargo,
      },
    })
    setCargoInfo(responseCargo?.data?.cargo)
    setLoading(false)
  }

  return (
    <>
      {cargos.edges.map((item) => (
        <div key={item.node.databaseId} className={styles.cargoItem}>
          {isActiveAdminTools && <AdminTools item={item.node} />}
          <div className={styles.cargoNumber}>№{item.node.databaseId}</div>
          <div className={styles.deliveryPlace}>
            <div>
              <div className={styles.placeLabel}>Место погрузки</div>
              <div className={styles.placeSity}>
                <Image className={styles.flag} src={belarusIcon} alt="Беларусь" />
                Беларусь, {item.node.acfCargoPickupPoint.shippingCity}
              </div>
              <div className={styles.placeDate}>{item.node.acfCargoPickupPoint.dateLoading}</div>
            </div>
            <div>
              <div className={styles.placeLabel}>Место выгрузки</div>
              <div className={styles.placeSity}>
                <Image className={styles.flag} src={belarusIcon} alt="Беларусь" />
                {item.node.acfCargoDeliverPoint.unloadingCountry}, {item.node.acfCargoDeliverPoint.unloadingCity}
              </div>
              <div className={styles.placeDate}>{item.node.acfCargoDeliverPoint.dateUnloading}</div>
            </div>
          </div>
          <div className={styles.cargoInfo}>
            <div>
              <div className={styles.infoLabel}>Расстояние</div>
              <div className={styles.infoItem}>
                <Image src={logisticsIcon} alt="Расстояние" />
                300 км
              </div>
            </div>
            <div>
              <div className={styles.infoLabel}>Подробности</div>
              <div className={styles.infoItem}>
                <Image src={boxesIcon} alt="Масса" />
                {item.node.acfCargoFeatures.weight < 1000 ? (
                  <Declension
                    count={item.node.acfCargoFeatures.weight}
                    words={['килограмм', 'килограмма', 'килограммов']}
                  />
                ) : (
                  <Declension count={item.node.acfCargoFeatures.weight / 1000} words={['тонна', 'тонны', 'тонн']} />
                )}
              </div>
            </div>
            <div>
              <div className={styles.infoItem}>
                <Image src={truckIcon} alt="Тип автомобиля" />
                {item.node.acfCargoFeatures.vehicleBodyType}
              </div>
            </div>
            <div>
              <div className={styles.infoLabel}>Цена</div>
              <div className={styles.infoItem}>
                <Image src={walletIcon} alt="Цена" />
                {item.node.acfCargoContacts.budgetTo == null
                  ? 'Договорная'
                  : `${item.node.acfCargoContacts.budgetTo} BYN`}
              </div>
            </div>
          </div>
          <div className={styles.buttonsBlock}>
            <button
              data-name="contacts"
              name="contacts"
              className={styles.contacts}
              onClick={(e) => handleModalOpen(item.node.databaseId, e)}
            >
              Контакты
            </button>
            <button name="more-info" className={styles.more} onClick={(e) => handleModalOpen(item.node.databaseId, e)}>
              <Image src={moreButtonIcon} alt="Больше информации" />
            </button>
          </div>
        </div>
      ))}
      <Modal active={modalActive} setModalActive={setModalActive}>
        {isLoading && <Loader />}
        {cargoInfo && activeModalName === 'contacts' ? <ModalCargoContacts cargoInfo={cargoInfo} /> : null}
        {cargoInfo && activeModalName === 'more-info' ? <ModalCargoMoreInfo cargoInfo={cargoInfo} /> : null}
      </Modal>
    </>
  )
}
