import { GetStaticProps } from 'next'
import Image from 'next/image'
import CategoryItem from '../../components/CategoryItem'
import { GET_CATEGORIES_CARGO_TRANSPORT, GET_CATEGORIES_PASSENGER_TRANSPORT } from '../../lib/api'
import { client } from '../../lib/apollo'
import Benefits from '../../components/Benefits'
import Container from '../../components/Container'
import boxesImage from '../../public/images/boxes.png'
import bagsImage from '../../public/images/bags.png'
import bgImage from '../../public/images/bg-cargo.jpg'

export default function Transport({ cargoTransport, passengerTransport }) {
  return (
    <div className="transport-page">
      <Container>
        <div className="page-title-block">
          <h1 className="page-title">
            Грузовые и пассажирские <span className="text-yellow">перевозки в РБ</span>
            <button className="add-order">Оставить заказ</button>
            <button className="add-transport">Добавить свой транспорт</button>
          </h1>
          <Image src={bagsImage} alt="Грузы" />
          <Image src={boxesImage} alt="Грузы" />
          <Image className="bg-image" src={bgImage} alt="Фон" />
        </div>
      </Container>
      <Container>
        <div className="category-transport-block white-background">
          <h3>Нужен транспорт?</h3>
          <p>Выберите подходящую категорию:</p>
          <CategoryItem category={cargoTransport} />
          <CategoryItem category={passengerTransport} />
        </div>
      </Container>
      <div className="separator-white">
        <hr />
      </div>
      <Benefits />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const responseCargoTransport = await client.query({
    query: GET_CATEGORIES_CARGO_TRANSPORT,
  })
  const cargoTransport = responseCargoTransport?.data?.transportCategory

  const responsePassengerTransport = await client.query({
    query: GET_CATEGORIES_PASSENGER_TRANSPORT,
  })
  const passengerTransport = responsePassengerTransport?.data?.transportCategory
  return {
    props: { cargoTransport, passengerTransport },
  }
}
