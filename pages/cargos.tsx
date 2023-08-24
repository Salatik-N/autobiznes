import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { GET_ALL_CARGO } from '../lib/api'
import Link from 'next/link'
import ListNavigation from '../components/ListNavigation'
import CargoItem from '../components/CargoItem'
import CargoFilter from '../components/CargoFilter'
import Benefits from '../components/Benefits'
import Container from '../components/Container'
import Declension from '../components/Declension'
import { Loader } from '../components/Loader'

const ITEMS_PER_PAGE = 10

export default function Cargo() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageTotal, setPageTotal] = useState(0)
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_CARGO, {
    variables: { perPage: ITEMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  })
  useEffect(() => {
    setPageTotal(data?.cargos?.pageInfo?.total)
  }, [data])
  const haveMorePosts = Boolean(data?.cargos?.pageInfo?.hasNextPage)
  const pageInfo = data?.cargos?.pageInfo || {}

  const handleLoadMore = () => {
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: { after: pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult

          return {
            cargos: {
              edges: [...prevResult.cargos.edges, ...fetchMoreResult.cargos.edges],
              pageInfo: fetchMoreResult.cargos.pageInfo,
              __typename: 'CargosConnection', // Make sure to update the typename
            },
          }
        },
      })
    }
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
              <CargoFilter cargoList={data.cargos} />
              <div className="cargo-list">
                <span className="title">Все грузы для перевозки по Беларуси</span>
                <p>
                  По вашему запросу поиск грузов для перевозки найдено&nbsp;
                  <span className="text-green">
                    <Declension count={pageTotal} words={['предложение', 'предложения', 'предложений']} />
                  </span>
                </p>
                <div className="cargo-list-button">
                  <span>У вас есть груз?</span>
                  <Link href="/account/add-cargo" className="add-order">
                    Добавить заказ
                  </Link>
                </div>
                <CargoItem cargos={data.cargos} />
              </div>
              {haveMorePosts && <button onClick={handleLoadMore}>{loading ? 'Loading...' : 'Load More'}</button>}
              <ListNavigation />
            </>
          ) : (
            <Loader />
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
