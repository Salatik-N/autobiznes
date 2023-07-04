import { GetStaticProps } from 'next'
import Image from 'next/image'
import CategoryItem from '../../components/CategoryItem'
import { GET_CATEGORIES_CARGO_TRANSPORT, GET_CATEGORIES_PASSENGER_TRANSPORT } from '../../lib/api'
import { client } from '../../lib/apollo'
import Benefits from '../../components/Benefits'
import Container from '../../components/Container'

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
          <Image src="/static/images/bags.png" alt="Биржа грузов и транспорта" width={100} height={100} />
          <Image src="/static/images/boxes.png" alt="Биржа грузов и транспорта" width={100} height={100} />{' '}
          <Image className="bg-image" src="/static/images/bg-cargo.jpg" alt="Фон" width={100} height={100} />
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
