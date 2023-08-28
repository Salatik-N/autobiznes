import { useEffect, useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../../lib/apollo'
import { GET_TRANSPORT_CATEGORY, GET_CATEGORY_INFO } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../../components/Container'
import TransportItem from '../../components/TransportItem'
import TransportFilter from '../../components/TransportFilter'
import Benefits from '../../components/Benefits'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from '../../components/Loader'

const ITEMS_PER_PAGE = 10
const apolloClient = initializeApollo()

export default function Transports({ transportCategory }) {
  const router = useRouter()
  const [transports, setTransports] = useState(null)
  const [regions, setRegions] = useState(null)
  const [cities, setCities] = useState(null)
  const [activeRegion, setActiveRegion] = useState(0)
  const [activeCity, setActiveCity] = useState(0)
  const [queryDataLoaded, setQueryDataLoaded] = useState(false)

  const { data, loading, fetchMore } = useQuery(GET_TRANSPORT_CATEGORY, {
    variables: { categoryTransport: router.query.slug, first: ITEMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (data && !queryDataLoaded) {
      setQueryDataLoaded(true)
      const regions = data?.transports?.edges?.map((e) => e.node.acfTransportAddress.regionTransport) || []
      setRegions(regions)
      const cities = data?.transports?.edges?.map((e) => e.node.acfTransportAddress.city) || []
      setCities(cities)
    }
  }, [data, queryDataLoaded])

  useEffect(() => {
    setTransports(data?.transports)
  }, [data, loading])

  const haveMorePosts = Boolean(transports?.pageInfo.hasNextPage)
  const pageInfo = transports?.pageInfo || {}

  const regionsWithCounts = handleFilterPlaceTransport(regions)
  const citiesWithCounts = handleFilterPlaceTransport(cities)

  function handleFilterPlaceTransport(items) {
    const countItems = {}
    items?.forEach((item) => {
      if (countItems.hasOwnProperty(item)) {
        countItems[item] += 1
      } else {
        countItems[item] = 1
      }
    })

    const res = [
      { id: 0, name: 'Все' },
      ...Object.entries(countItems).map(([name], index) => ({ id: index + 1, name })),
    ]

    return res
  }

  const fetchFilterPost = async (activeIndex, item) => {
    let variables
    if (item === 'region') {
      setActiveRegion(activeIndex)
      setActiveCity(0)
      variables = {
        regionTransport: activeIndex !== 0 ? regionsWithCounts[activeIndex].name : null,
      }
    }
    if (item === 'city') {
      setActiveCity(activeIndex)
      variables = {
        regionTransport: regionsWithCounts[activeRegion].name,
        city: activeIndex !== 0 ? citiesWithCounts[activeIndex].name : null,
      }
    }

    fetchMore({
      variables,
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult

        return {
          transports: {
            edges: fetchMoreResult.transports.edges,
            pageInfo: fetchMoreResult.transports.pageInfo,
            __typename: 'TransportConnection',
          },
        }
      },
    })
  }
  const fetchMorePost = () => {
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult
        console.log(fetchMoreResult.transports.pageInfo)

        return {
          transports: {
            edges: [...prevResult.transports.edges, ...fetchMoreResult.transports.edges],
            pageInfo: fetchMoreResult.transports.pageInfo,
            __typename: 'TransportConnection',
          },
        }
      },
    })
  }

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
          {!loading && transports ? (
            <>
              <TransportFilter
                activeRegion={activeRegion}
                regions={regionsWithCounts}
                onClickRegion={(e) => fetchFilterPost(e, 'region')}
                activeCity={activeCity}
                cities={citiesWithCounts}
                onClickCity={(e) => fetchFilterPost(e, 'city')}
              />
              <div className="transport-list">
                <InfiniteScroll
                  dataLength={pageInfo.total}
                  next={fetchMorePost}
                  hasMore={haveMorePosts}
                  loader={'Загрузка...'}
                  scrollThreshold={0.4}
                  style={{ overflow: 'initial' }}
                >
                  <TransportItem transports={transports} />
                </InfiniteScroll>
              </div>
            </>
          ) : (
            <div className="white-background">
              <Loader />
            </div>
          )}
        </Container>
      </section>
      <div className="separator-white">
        <hr />
      </div>
      <Benefits />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const responseCategory = await apolloClient.query({
    query: GET_CATEGORY_INFO,
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
