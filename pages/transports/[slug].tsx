import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetStaticPaths } from 'next'
import { initializeApollo } from '../../lib/apollo'
import { GET_TRANSPORT_CATEGORY, GET_ALL_TRANSPORT_CATEGORIES } from '../../lib/api'
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
    <>
      <Container>
        <button onClick={goBack} className="go-back-button">
          <i className="arrow" />
        </button>
        <div className="page-title-block">
          <h1 className="page-title">
            {transportCategory.name}
            <span className="text-yellow"> в РБ</span>
            <button className="add-order">Оставить заказ</button>
            <button className="add-transport">Добавить свой транспорт</button>
          </h1>
          <Image
            src={`/images/${transportCategory.slug}-big.png`}
            alt="Биржа грузов и транспорта"
            width={973}
            height={504}
          />
          <Image className="bg-image" src="/images/bg-cargo.jpg" alt="Фон" width={100} height={100} />
        </div>
      </Container>
      <Container>
        <TransportFilter active={activeRegion} regions={regionsWithCounts} onClickRegion={setActiveRegion} />
        <div className="transport-list">
          <TransportItem active={regionsWithCounts[activeRegion]} transports={transportCategory.transports} />
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
