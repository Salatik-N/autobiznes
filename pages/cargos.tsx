import { GetStaticProps } from 'next'
import Image from 'next/image'
import { GET_ALL_CARGO } from '../lib/api'
import { client } from '../lib/apollo'
import ListNavigation from '../components/ListNavigation'
import CargoItem from '../components/CargoItem'
import CargoFilter from '../components/CargoFilter'
import Benefits from '../components/Benefits'
import Container from '../components/Container'
import Declension from '../components/Declension'

export default function Cargo({ cargoList }) {
  return (
    <div className="cargos-page">
      <Container>
        <div className="page-title-block">
          <h1 className="page-title">
            Диспетчерский <span className="text-yellow">онлайн-центр</span>
          </h1>
          <Image src="/images/cargo.png" alt="Биржа грузов и транспорта" width={100} height={100} />
          <Image className="bg-image" src="/images/bg-cargo.jpg" alt="Фон" width={100} height={100} />
        </div>
        {cargoList ? (
          <>
            <CargoFilter />
            <div className="cargo-list">
              <span className="title">Все грузы для перевозки по Беларуси</span>
              <p>
                По вашему запросу поиск грузов для перевозки найдено
                <span className="text-green">
                  <Declension count={cargoList.edges.length} words={['предложение', 'предложения', 'предложений']} />
                </span>
              </p>
              <CargoItem cargos={cargoList} />
            </div>
            <ListNavigation />
          </>
        ) : null}
      </Container>
      <div className="separator-white">
        <hr />
      </div>
      <Benefits />
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await client.query({
    query: GET_ALL_CARGO,
  })
  const cargoList = response?.data?.cargos
  return {
    props: { cargoList },
  }
}
