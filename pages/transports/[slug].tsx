import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../../lib/apollo'
import { GET_TRANSPORT_CATEGORY, GET_CATEGORY_INFO } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../../components/Container'
import TransportItem from '../../components/TransportItem'
import Benefits from '../../components/Benefits'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from '../../components/Loader'

const ITEMS_PER_PAGE = 10
const apolloClient = initializeApollo()

export default function Transport1t({ transportCategory }) {
  const router = useRouter()
  const { data, fetchMore } = useQuery(GET_TRANSPORT_CATEGORY, {
    variables: { id: router.query.slug, first: ITEMS_PER_PAGE, after: null },
    notifyOnNetworkStatusChange: true,
  })
  const transports = data?.transportCategory?.transports
  const haveMorePosts = Boolean(data?.transportCategory.transports.pageInfo.hasNextPage)
  const pageInfo = transports?.pageInfo || {}
  const fetchMorePost = () => {
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult
        console.log(fetchMoreResult.transportCategory.transports.pageInfo)

        return {
          transportCategory: {
            transports: {
              edges: [
                ...prevResult.transportCategory.transports.edges,
                ...fetchMoreResult.transportCategory.transports.edges,
              ],
              pageInfo: fetchMoreResult.transportCategory.transports.pageInfo,
              __typename: 'TransportConnection',
            },
          },
        }
      },
    })
  }

  const [activeRegion, setActiveRegion] = useState(0)
  const regions = transports?.edges?.map((e) => e.node.acfTransportAddress.regionTransport)

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
          {transports ? (
            <>
              {/* <TransportFilter active={activeRegion} regions={regionsWithCounts} onClickRegion={setActiveRegion} /> */}
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
