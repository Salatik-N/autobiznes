import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { GET_ALL_CARGO } from '../lib/api'
import Link from 'next/link'
import CargoItem from '../components/CargoItem'
import CargoFilter from '../components/CargoFilter'
import Benefits from '../components/Benefits'
import Container from '../components/Container'
import { Loader } from '../components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const ITEMS_PER_PAGE = 10

export default function Cargo() {
  const { data, fetchMore } = useQuery(GET_ALL_CARGO, {
    variables: { first: ITEMS_PER_PAGE, after: null },
    notifyOnNetworkStatusChange: true,
  })

  const haveMorePosts = Boolean(data?.cargos?.pageInfo?.hasNextPage)
  const pageInfo = data?.cargos?.pageInfo || {}
  const fetchMorePost = () => {
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult

        return {
          cargos: {
            edges: [...prevResult.cargos.edges, ...fetchMoreResult.cargos.edges],
            pageInfo: fetchMoreResult.cargos.pageInfo,
            __typename: 'CargosConnection',
          },
        }
      },
    })
  }

  return (
    <div className="cargos-page">
      <section className="header-section">
        <Container>
          <div className="page-title-block">
            <h1 className="page-title">
              Диспетчерский <span className="text-yellow">онлайн-центр</span>
            </h1>
            <Image
              className="content-image"
              src="/images/cargo.png"
              alt="Биржа грузов и транспорта"
              width={839}
              height={583}
              priority={true}
            />
          </div>
        </Container>
        <Image className="bg-image" src="/images/bg-cargo.jpg" alt="Фон" width={100} height={100} />
      </section>
      <hr className="separator-black"></hr>
      <section className="first-section">
        <Container>
          {data?.cargos ? (
            <>
              {data?.cargos.edges.length === 0 ? (
                <div className="white-background">Упс.. Похоже грузы закончились, попробуйте зайти позже.</div>
              ) : (
                <>
                  <CargoFilter cargoList={data.cargos} />
                  <div className="cargo-list">
                    <span className="title">Все грузы для перевозки по Беларуси</span>
                    {/* <p>
                  По вашему запросу поиск грузов для перевозки найдено&nbsp;
                  <span className="text-green">
                    <Declension count={cargoTotal} words={['предложение', 'предложения', 'предложений']} />
                  </span>
                </p> */}
                    <div className="cargo-list-button">
                      <span>У вас есть груз?</span>
                      <Link href="/account/add-cargo" className="add-order">
                        Добавить заказ
                      </Link>
                    </div>
                    <InfiniteScroll
                      dataLength={pageInfo.total}
                      next={fetchMorePost}
                      hasMore={haveMorePosts}
                      loader={''}
                      scrollThreshold={0.4}
                      style={{ overflow: 'initial' }}
                    >
                      <CargoItem cargos={data.cargos} />
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
