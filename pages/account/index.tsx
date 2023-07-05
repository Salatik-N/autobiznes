import { useState } from 'react'
import Link from 'next/link'
import Container from '../../components/Container'
import AccountHeader from '../../components/AccountHeader'
import { useProvideAuth } from '../../lib/use-authorization'
import LoginFrom from '../../components/LoginForm'
import Modal from '../../components/Modal'

export default function Account() {
  const [modalActive, setModalActive] = useState(false)
  const { isSignedIn } = useProvideAuth()
  return (
    <>
      {isSignedIn() ? (
        <Container>
          <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
          <div className="white-background">
            <div>— Если вы заказчик</div>
            <ul>
              <li>
                <Link href="/account/add-cargo">Оставьте свой заказ</Link> и ждите предложений от владельцев техники.
              </li>
              <li>
                <Link href="/transports">Найдите объявления</Link> и напрямую свяжитесь по указанным телефонам.
              </li>
            </ul>
            <div>— Если вы исполнитель</div>
            <ul>
              <li>
                <Link href="/account/add-transport">Добавьте объявление</Link> и заказчики смогут связаться с вами
                напрямую.
              </li>
              <li>
                <Link href="/cargos">Найдите грузы</Link> и сделайте предложение по указанным контактам.
              </li>
            </ul>
          </div>
        </Container>
      ) : (
        'net'
      )}
    </>
  )
}
