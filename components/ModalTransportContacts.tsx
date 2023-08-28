import Image from 'next/image'
import Link from 'next/link'
import styles from './ModalContacts.module.scss'
import PhoneSVG from './PhoneSVG'
import viberIcon from '../public/icons/viber.svg'
import whatsAppIcon from '../public/icons/whatsapp.svg'
import telegramIcon from '../public/icons/telegram.svg'
import timeIcon from '../public/icons/time.svg'

export default function ModalCargoContacts({ transportInfo }) {
  const authorInfo = transportInfo.author.node
  const transport = transportInfo.acfTransportContacts
  let phone
  if (transport.customPhone) {
    phone = transport.customPhone
  } else {
    phone = authorInfo.customField.phone
  }

  return (
    <div className={styles.inner}>
      <div className={styles.avatar}>
        <Image
          src={transportInfo.acfTransportPhotos.photoDriver?.mediaItemUrl || authorInfo.avatar.url}
          alt="Аватар"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.name}>{transport.customName}</div>
      {authorInfo.customField.transportInPark && (
        <div className={styles.additional}>
          {/* <p>
          Место в рейтинге: {authorInfo.firstName} из {authorInfo.firstName}
        </p> */}
          <p>Техники в парке: {authorInfo.customField.transportInPark} ед.</p>
        </div>
      )}
      {phone && (
        <div>
          <Link className={styles.phone} href={`tel:${phone}`}>
            <PhoneSVG fill={'#4caf50'} />
            {phone}
          </Link>
        </div>
      )}
      {transport.viber || transport.whatsapp || transport.telegram ? (
        <div className={styles.messengers}>
          {transport.viber && (
            <Link href={`viber://chat?number=%2B${phone.replace(/\D/g, '')}`}>
              <Image src={viberIcon} alt="Аватар" width={33} height={33} />
            </Link>
          )}
          {transport.whatsapp && (
            <Link href={`https://api.whatsapp.com/send?phone=${phone.replace(/\D/g, '')}`}>
              <Image src={whatsAppIcon} alt="Аватар" width={33} height={33} />
            </Link>
          )}
          {transport.telegram && (
            <Link href={`https://t.me/${phone}`}>
              <Image src={telegramIcon} alt="Аватар" width={33} height={33} />
            </Link>
          )}
        </div>
      ) : null}
      {transport.modeOperation && (
        <div className={styles.workTime}>
          <Image src={timeIcon} alt="Звонок" width={25} height={25} />
          Режим работы: {transport.modeOperation}
        </div>
      )}
    </div>
  )
}
