import { useEffect, useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../../lib/apollo'
import { GET_TRANSPORT_CATEGORY, GET_CATEGORY_INFO, REGIONS_TRANSPORT, CITIES_TRANSPORT } from '../../lib/api'
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
  const [regions, setRegions] = useState(null)
  const [cities, setCities] = useState(null)
  const [activeRegion, setActiveRegion] = useState(0)
  const [activeCity, setActiveCity] = useState(0)
  const [isTransportaLoaded, setTransportaLoaded] = useState(true)
  const [isRegionsLoaded, setRegionsLoaded] = useState(false)

  const { data, fetchMore } = useQuery(GET_TRANSPORT_CATEGORY, {
    variables: { categoryTransport: transportCategory.slug, first: ITEMS_PER_PAGE, after: null },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    getRegions()
  }, [])

  const getRegions = async () => {
    setRegionsLoaded(false)
    const responseRegions = await apolloClient.query({
      query: REGIONS_TRANSPORT,
      variables: {
        categoryTransport: transportCategory.slug,
      },
    })
    const regions = responseRegions?.data.regionsTransport.map((e) => e) || []
    setRegions(handleFilterPlaceTransport(regions))
    setRegionsLoaded(true)
  }

  const haveMorePosts = Boolean(data?.transports?.pageInfo.hasNextPage)
  const pageInfo = data?.transports?.pageInfo || {}

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
    setTransportaLoaded(false)
    setRegionsLoaded(false)
    let variables
    if (item === 'region') {
      setActiveRegion(activeIndex)
      const responseCities = await apolloClient.query({
        query: CITIES_TRANSPORT,
        variables: {
          categoryTransport: transportCategory.slug,
          regionTransport: regions[activeIndex].name,
        },
      })
      const cities = responseCities?.data.citiesTransport.map((e) => e) || []
      setCities(handleFilterPlaceTransport(cities))
      setActiveCity(0)
      variables = {
        regionTransport: activeIndex !== 0 ? regions[activeIndex].name : null,
      }
      setRegionsLoaded(true)
    }
    if (item === 'city') {
      setActiveCity(activeIndex)
      variables = {
        regionTransport: regions[activeRegion].name,
        city: activeIndex !== 0 ? cities[activeIndex].name : null,
      }
      setRegionsLoaded(true)
    }

    await fetchMore({
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
    setTransportaLoaded(true)
  }

  const fetchMorePost = () => {
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult

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
          {data?.transports ? (
            <>
              {data?.transports.edges.length === 0 ? (
                <div className="white-background">
                  Упс.. Похоже еще нет подходящего транспорта, попробуйте зайти позже.
                </div>
              ) : (
                <>
                  {isRegionsLoaded ? (
                    <TransportFilter
                      activeRegion={activeRegion}
                      regions={regions}
                      onClickRegion={(e) => fetchFilterPost(e, 'region')}
                      activeCity={activeCity}
                      cities={cities}
                      onClickCity={(e) => fetchFilterPost(e, 'city')}
                    />
                  ) : (
                    <div className="white-background">
                      <Loader />
                    </div>
                  )}
                  <div className="transport-list">
                    <InfiniteScroll
                      dataLength={pageInfo.total}
                      next={fetchMorePost}
                      hasMore={haveMorePosts}
                      loader={''}
                      scrollThreshold={0.4}
                      style={{ overflow: 'initial' }}
                    >
                      {isTransportaLoaded ? (
                        <TransportItem transports={data.transports} />
                      ) : (
                        <div className="white-background">
                          <Loader />
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
                </>
              )}
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
