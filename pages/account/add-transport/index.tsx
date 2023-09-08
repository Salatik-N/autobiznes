import { GET_CATEGORIES_CARGO_TRANSPORT, GET_CATEGORIES_PASSENGER_TRANSPORT } from '../../../lib/api'
import { initializeApollo } from '../../../lib/apollo'
import { GetStaticProps } from 'next'
import Container from '../../../components/Container'
import Image from 'next/image'
import CategoryItem from '../../../components/CategoryItem'

export default function AddTransport({ cargoTransport, passengerTransport }) {
  return (
    <div className="transport-page">
      <section className="header-section">
        <Container>
          <div className="page-title-block">
            <h2 className="page-title">
              Грузовые и пассажирские <span className="text-yellow">перевозки в РБ</span>
            </h2>
            <div className="content-image">
              <Image src="/images/bags.png" alt="Биржа грузов и транспорта" width={839} height={583} />
              <Image src="/images/boxes.png" alt="Биржа грузов и транспорта" width={870} height={533} />
            </div>
          </div>
        </Container>
        <Image className="bg-image" src="/images/bg-cargo.jpg" alt="Фон" width={100} height={100} />
      </section>
      <hr className="separator-black"></hr>
      <section className="first-section">
        <Container>
          <div className="category-transport-block white-background">
            <h3>У вас есть транспорт?</h3>
            <p>Выберите категорию для добавления объявления:</p>
            <CategoryItem category={cargoTransport} />
            <CategoryItem category={passengerTransport} />
          </div>
        </Container>
      </section>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const responseCargoTransport = await apolloClient.query({
    query: GET_CATEGORIES_CARGO_TRANSPORT,
  })
  const cargoTransport = responseCargoTransport?.data?.transportCategory

  const responsePassengerTransport = await apolloClient.query({
    query: GET_CATEGORIES_PASSENGER_TRANSPORT,
  })
  const passengerTransport = responsePassengerTransport?.data?.transportCategory
  return {
    props: { cargoTransport, passengerTransport },
  }
}
