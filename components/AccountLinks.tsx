import Link from 'next/link'
import Image from 'next/image'
import boxIcon from '../public/icons/cargo-vector.svg'
import transportIcon from '../public/icons/truck-vector.svg'

const AccountLinks = () => {
  return (
    <>
      <div className="account-text-title">
        <Image src={boxIcon} width={66} height={66} alt="Груз" />— Если вы заказчик
      </div>
      <ul>
        <li>
          <Link href="/account/add-cargo">Оставьте свой заказ</Link> и ждите предложений от владельцев техники.
        </li>
        <li>
          <Link href="/transports">Найдите объявления</Link> и напрямую свяжитесь по указанным телефонам.
        </li>
      </ul>
      <div className="account-text-title">
        <Image src={transportIcon} width={66} height={66} alt="Груз" />— Если вы исполнитель
      </div>
      <ul>
        <li>
          <Link href="/account/add-transport">Добавьте объявление</Link> и заказчики смогут связаться с вами напрямую.
        </li>
        <li>
          <Link href="/cargos">Найдите грузы</Link> и сделайте предложение по указанным контактам.
        </li>
      </ul>
    </>
  )
}

export default AccountLinks
