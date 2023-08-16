import styles from './TransportItem.module.scss'
import Image from 'next/image'
import verifiedUser from '../public/icons/verified-user.svg'
import { useState } from 'react'
import { initializeApollo } from '../lib/apollo'
import { GET_TRANSPORT_INFO, UPDATE_VIEWS_COUNT } from '../lib/api'
import Modal from './Modal'
import AdminTools from './AdminTools'
import { Loader } from './Loader'
import ModalTransprotContacts from '../components/ModalTransportContacts'
import TransportFeatures from './TransportFeatures'
import ImagesGallery from './ImagesGallery'

type TransportItemProps = {
  active: {
    id: number
    region: string
  }
  transports: any
  isActiveAdminTools?: boolean
}

const TransportItem: React.FC<TransportItemProps> = ({ active, transports, isActiveAdminTools = false }) => {
  const [transportInfo, setTransportInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isModalActive, setModalActive] = useState(false)
  const [isFeaturesActive, setFeaturesActive] = useState(false)
  const [isDescriptionActive, setDescriptionActive] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)
  const apolloClient = initializeApollo()

  const handleModalOpen = (idTransport) => {
    setModalActive(true)
    getTransportInfo(idTransport)
  }
  const getTransportInfo = async (idTransport) => {
    setLoading(true)
    const responseTransport = await apolloClient.query({
      query: GET_TRANSPORT_INFO,
      variables: {
        id: idTransport,
      },
    })
    setTransportInfo(responseTransport?.data?.transport)
    setLoading(false)
    apolloClient.mutate({
      mutation: UPDATE_VIEWS_COUNT,
      variables: { postId: idTransport },
    })
  }

  const handleFeaturesOpen = (idTransport) => {
    if (idTransport !== expandedItem) {
      setExpandedItem(idTransport)
      setDescriptionActive(false)
      setFeaturesActive(true)
      return
    }
    setFeaturesActive(!isFeaturesActive)
  }

  const handleDescriptionOpen = (idTransport) => {
    if (idTransport !== expandedItem) {
      setExpandedItem(idTransport)
      setFeaturesActive(false)
      setDescriptionActive(true)
      return
    }
    setDescriptionActive(!isDescriptionActive)
  }

  const truncateDescription = (text) => {
    const halfLength = Math.ceil(text?.length / 2)
    return text?.slice(0, halfLength)
  }
  return (
    <>
      {transports.edges
        .filter((item) =>
          active === null || active.id === 0
            ? item.node.acfTransportAddress.regionTransport
            : item.node.acfTransportAddress.regionTransport === active.region
        )
        .map((item) => (
          <div key={item.node.databaseId} className={styles.transportItem}>
            {isActiveAdminTools && <AdminTools item={item.node} type="transport" />}
            <ImagesGallery photos={item.node.acfTransportPhotos.photoTruck} />
            <div className={styles.transportNumber}>№{item.node.databaseId}</div>
            <div className={styles.title}>
              {item.node.author.node.customField.verifiedUser && (
                <Image src={verifiedUser} width={16} height={16} alt="Подтвержденный пользователь" />
              )}
              {item.node.title}
            </div>
            <div
              className={styles.address}
            >{`${item.node.acfTransportAddress.regionTransport}, ${item.node.acfTransportAddress.city}`}</div>
            {/* <div className={styles.experience}>{item.node.author.node.registeredDate} лет в сервисе</div> */}
            <div
              className={`${styles.features} ${
                expandedItem === item.node.databaseId && isFeaturesActive && styles.active
              }`}
            >
              <div className={styles.button} onClick={() => handleFeaturesOpen(item.node.databaseId)}>
                Характеристики <i className={styles.arrow} />
              </div>
              <TransportFeatures
                active={expandedItem === item.node.databaseId && isFeaturesActive}
                features={item.node.acfTransportFeatures}
              />
            </div>
            <div className={styles.priceBlock}>
              <div className={styles.item}>
                <div className={styles.price}>{item.node.acfTransportFeatures.price1Hour}</div>
                <div className={styles.metering}>BYN/час</div>
              </div>
              <div className={styles.item}>
                <div className={styles.price}>{item.node.acfTransportFeatures.price1Km}</div>
                <div className={styles.metering}>BYN/км</div>
              </div>
              <div className={styles.item}>
                <div className={styles.price}>{item.node.acfTransportFeatures.pricePerShift}</div>
                <div className={styles.metering}>BYN/смена</div>
              </div>
            </div>
            <button className={styles.buttonContacts} onClick={() => handleModalOpen(item.node.databaseId)}>
              Контакты
            </button>
            <div className={styles.description}>
              <div className={styles.label}>Описание:</div>
              <div className={styles.text}>
                {expandedItem === item.node.databaseId && isDescriptionActive ? (
                  item.node.acfTransportDescription.fullDescription
                ) : (
                  <>
                    {truncateDescription(item.node.acfTransportDescription.fullDescription)}
                    <span className={styles.readMore} onClick={() => handleDescriptionOpen(item.node.databaseId)}>
                      Читать больше
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      <Modal active={isModalActive} setModalActive={setModalActive}>
        {!isLoading && transportInfo ? <ModalTransprotContacts transportInfo={transportInfo} /> : <Loader />}
      </Modal>
    </>
  )
}

export default TransportItem
