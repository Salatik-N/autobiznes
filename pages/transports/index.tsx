import Head from 'next/head'
import parse from "html-react-parser";
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CategoryItem from '../../components/CategoryItem'
import { GET_CATEGORIES_CARGO_TRANSPORT, GET_CATEGORIES_PASSENGER_TRANSPORT } from '../../lib/api'
import { initializeApollo } from '../../lib/apollo'
import Benefits from '../../components/Benefits'
import Container from '../../components/Container'

export default function Transport({ cargoTransport, passengerTransport }) {
  const fullHead = cargoTransport && parse(cargoTransport?.seo.fullHead)

  return (
    <div className="transport-page">
      <Head>
        <title>{cargoTransport.seo?.title || "Грузовые и пассажирские перевозки в РБ"}</title>
        <meta name="description" content={cargoTransport.seo?.metaDesc || "Грузовые и пассажирские перевозки в РБ"} />
        <meta name="robots" content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
        <meta name="keywords" content={cargoTransport.seo?.focuskw || "Грузовые и пассажирские перевозки в РБ"} />
        {fullHead}
      </Head>
      <section className="header-section">
        <Container>
          <div className="page-title-block">
            <h1 className="page-title">
              Грузовые и пассажирские <span className="text-yellow">перевозки в РБ</span>
              <div className="page-header-buttons">
                <Link href="/account/add-cargo" className="add-order">
                  Оставить заказ
                </Link>
                <Link href="/account/add-transport" className="add-transport">
                  Добавить свой транспорт
                </Link>
              </div>
            </h1>
            <div className="content-image">
              <Image src="/images/bags.png" alt="Биржа грузов и транспорта" width={839} height={583} />
              <Image src="/images/boxes.png" alt="Биржа грузов и транспорта" width={870} height={533} />
            </div>
          </div>
        </Container>
        <div className="header-section-bg">
          <Image className="bg-image" src="/images/bg-transport.jpg" alt="Фон" width={1920} height={746} />
        </div>
      </section>
      <hr className="separator-black"></hr>
      <section className="first-section">
        <Container>
          <div className="category-transport-block white-background">
            <h3>Нужен транспорт?</h3>
            <p>Выберите подходящую категорию:</p>
            <CategoryItem category={cargoTransport} />
            <CategoryItem category={passengerTransport} />
          </div>
        </Container>
      </section>
      <div className="separator-white">
        <hr />
      </div>
      <Benefits />
    </div>
  )
}

const apolloClient = initializeApollo()

export const getStaticProps: GetStaticProps = async () => {
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
