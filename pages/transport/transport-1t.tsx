import { useRouter } from 'next/router'
import Image from 'next/image'
import Container from '../../components/Container'
import TransportFilter from '../../components/TransportFilter'
import TransportItem from '../../components/TransportItem'
import ListNavigation from '../../components/ListNavigation'
import Benefits from '../../components/Benefits'
import bgImage from '../../public/images/bg-cargo.jpg'
import mainImage from '../../public/images/transport-1t-big.png'

export default function Transport1t() {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <Container>
        <button onClick={goBack} className="go-back-button">
          <i className="arrow" />
        </button>
        <div className="page-title-block">
          <h1 className="page-title">
            Грузовые и пассажирские <span className="text-yellow">перевозки в РБ</span>
            <button className="add-order">Оставить заказ</button>
            <button className="add-transport">Добавить свой транспорт</button>
          </h1>
          <Image src={mainImage} alt="Грузы" />
          <Image className="bg-image" src={bgImage} alt="Фон" />
        </div>
      </Container>
      <Container>
        <TransportFilter />
        <div className="transport-list">
          <TransportItem />
        </div>
        <ListNavigation />
      </Container>
      <div className="separator-white">
        <hr />
      </div>
      <Benefits />
    </>
  )
}
