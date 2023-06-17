import Image from 'next/image'
import Link from 'next/link'
import styles from './ModalContacts.module.scss'
import phoneIcon from '../public/icons/phone.svg'
import viberIcon from '../public/icons/viber.svg'
import whatsAppIcon from '../public/icons/whatsapp.svg'
import telegramIcon from '../public/icons/telegram.svg'
import timeIcon from '../public/icons/time.svg'

export default function ModalCargoContacts({ transportInfo }) {
  const authorInfo = transportInfo.author.node
  let phone
  if (transportInfo.acfTransportContacts.customPhone) {
    phone = transportInfo.acfTransportContacts.customPhone
  } else {
    phone = authorInfo.customField.phone
  }

  return (
    <div className={styles.inner}>
      <div className={styles.avatar}>
        <Image src={authorInfo.avatar.url} alt="Аватар" width={80} height={80} />
      </div>
      <div className={styles.name}>
        {authorInfo.lastName} {authorInfo.firstName} {authorInfo.customField.fatherName}
      </div>
      <div className={styles.additional}>
        <p>
          Место в рейтинге: {authorInfo.firstName} из {authorInfo.firstName}
        </p>
        <p>Техники в парке: {authorInfo.registeredDate} ед.</p>
      </div>
      <div>
        <Link className={styles.phone} href={`tel:${phone}`}>
          <Image src={phoneIcon} alt="Звонок" width={16} height={16} />
          {phone}
        </Link>
      </div>
      {transportInfo.acfTransportContacts.viber ||
      transportInfo.acfTransportContacts.whatsapp ||
      transportInfo.acfTransportContacts.telegram ? (
        <div className={styles.messengers}>
          {transportInfo.acfTransportContacts.viber && (
            <Link href={`viber://chat?number=%2B${phone.replace(/\D/g, '')}`}>
              <Image src={viberIcon} alt="Аватар" width={33} height={33} />
            </Link>
          )}
          {transportInfo.acfTransportContacts.whatsapp && (
            <Link href={`https://api.whatsapp.com/send?phone=${phone.replace(/\D/g, '')}`}>
              <Image src={whatsAppIcon} alt="Аватар" width={33} height={33} />
            </Link>
          )}
          {transportInfo.acfTransportContacts.telegram && (
            <Link href={`https://t.me/${phone}`}>
              <Image src={telegramIcon} alt="Аватар" width={33} height={33} />
            </Link>
          )}
        </div>
      ) : null}
      <div className={styles.workTime}>
        <Image src={timeIcon} alt="Звонок" width={25} height={25} />
        Режим работы: {authorInfo.firstName}
      </div>
    </div>
  )
}
