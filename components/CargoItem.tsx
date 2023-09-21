import Image from 'next/image'
import { useState } from 'react'
import styles from './CargoItem.module.scss'
import belarusIcon from '../public/icons/belarus-flag.svg'
import moreButtonIcon from '../public/icons/more-button.svg'
import logisticsIcon from '../public/icons/logistics.svg'
import boxesIcon from '../public/icons/boxes.svg'
import truckIcon from '../public/icons/truck.svg'
import walletIcon from '../public/icons/wallet.svg'
import PhoneSVG from './PhoneSVG'
import Declension from '../components/Declension'
import Modal from './Modal'
import AdminTools from './AdminTools'
import ModalCargoContacts from './ModalCargoContacts'
import ModalCargoMoreInfo from './ModalCargoMoreInfo'
import { GET_CARGO_INFO, UPDATE_VIEWS_COUNT } from '../lib/api'
import { initializeApollo } from '../lib/apollo'
import { useQuery } from '@apollo/client'
import { Loader } from './Loader'

export default function CargoItem({ cargos, isActiveAdminTools = false }) {
  const [activeModalName, setActiveModalName] = useState(null)
  const [cargoInfo, setCargoInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const apolloClient = initializeApollo()

  const handleModalOpen = async (idCargo, name) => {
    setModalActive(true)
    setActiveModalName(name)
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
    apolloClient.mutate({
      mutation: UPDATE_VIEWS_COUNT,
      variables: { postId: idCargo },
    })
  }

  return (
    <>
      {cargos.edges.map((item) => (
        <div
          key={item.node.databaseId}
          className={`${styles.cargoItem} ${isActiveAdminTools ? styles.accountPage : ''}`}
        >
          <div className={`${styles.cargoAdminBlock} ${isActiveAdminTools && styles.cargoAdminBlockActive}`}>
            <div className={styles.cargoNumberPhone}>№{item.node.databaseId}</div>
            {isActiveAdminTools && <AdminTools item={item.node} type="cargo" />}
          </div>
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
            <div className={styles.infoItem}>
              <Image src={logisticsIcon} alt="Расстояние" />
              300 км
            </div>
            {item.node.acfCargoFeatures.weight && (
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
            )}
            {item.node.acfCargoFeatures.vehicleBodyType && (
              <div className={styles.infoItem}>
                <Image src={truckIcon} alt="Тип автомобиля" />
                {item.node.acfCargoFeatures.vehicleBodyType}
              </div>
            )}
            <div className={styles.infoItem}>
              <Image src={walletIcon} alt="Цена" />
              {item.node.acfCargoContacts.budgetTo == null
                ? 'Договорная'
                : `${item.node.acfCargoContacts.budgetTo} BYN`}
            </div>
          </div>
          <div className={styles.contactsBlock}>
            <div className={styles.cargoNumber}>№{item.node.databaseId}</div>
            <div className={styles.buttonsBlock}>
              <button className={styles.contacts} onClick={(e) => handleModalOpen(item.node.databaseId, 'contacts')}>
                <span>Контакты</span>
                <PhoneSVG />
              </button>
              <button className={styles.more} onClick={(e) => handleModalOpen(item.node.databaseId, 'more-info')}>
                <Image src={moreButtonIcon} alt="Больше информации" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal active={modalActive} setModalActive={setModalActive}>
        {isLoading && <Loader />}
        {!isLoading && cargoInfo && activeModalName === 'contacts' && <ModalCargoContacts cargoInfo={cargoInfo} />}
        {!isLoading && cargoInfo && activeModalName === 'more-info' && <ModalCargoMoreInfo cargoInfo={cargoInfo} />}
      </Modal>
    </>
  )
}
