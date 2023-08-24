import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetStaticPaths } from 'next'
import { initializeApollo } from '../../lib/apollo'
import { GET_TRANSPORT_CATEGORY, GET_ALL_TRANSPORT_CATEGORIES } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../../components/Container'
import TransportFilter from '../../components/TransportFilter'
import TransportItem from '../../components/TransportItem'
import ListNavigation from '../../components/ListNavigation'
import Benefits from '../../components/Benefits'

export default function Transport1t({ transportCategory }) {
  const [activeRegion, setActiveRegion] = useState(0)
  const regions = transportCategory.transports.edges.map((e) => e.node.acfTransportAddress.regionTransport)

  const counts = {}

  regions.forEach((region) => {
    if (counts.hasOwnProperty(region)) {
      counts[region] += 1
    } else {
      counts[region] = 1
    }
  })

  const regionsWithCounts = [
    { id: 0, region: 'Все', count: regions.length },
    ...Object.entries(counts).map(([region, count], index) => ({ id: index + 1, region, count })),
  ]

  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="transport-category-page">
      <section className="header-section">
        <Container>
          <button onClick={goBack} className="go-back-button">
            <i className="arrow" />
            <span>Назад</span>
          </button>
          <div className="page-title-block">
            <h1 className="page-title">
              {transportCategory.name}
              <span className="text-yellow"> в РБ</span>
              <div className="page-header-buttons">
                <Link href="/account/add-cargo" className="add-order">
                  Оставить заказ
                </Link>
                <Link href="/account/add-transport" className="add-transport">
                  Добавить свой транспорт
                </Link>
              </div>
            </h1>
            <Image
              className="content-image"
              src={`/images/${transportCategory.slug}-big.png`}
              alt="Биржа грузов и транспорта"
              width={973}
              height={504}
            />
          </div>
        </Container>
        <Image className="bg-image" src="/images/bg-cargo.jpg" alt="Фон" width={100} height={100} />
      </section>
      <hr className="separator-black"></hr>
      <section className="first-section">
        <Container>
          <TransportFilter active={activeRegion} regions={regionsWithCounts} onClickRegion={setActiveRegion} />
          <div className="transport-list">
            <TransportItem active={regionsWithCounts[activeRegion]} transports={transportCategory.transports} />
          </div>
          <ListNavigation />
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const responseCategory = await apolloClient.query({
    query: GET_TRANSPORT_CATEGORY,
    variables: {
      id: context.params.slug,
    },
  })
  const transportCategory = responseCategory?.data?.transportCategory
  if (!responseCategory) {
    return {
      notFound: true,
    }
  }
  return {
    props: { transportCategory },
  }
}
