import { GetStaticProps } from 'next'
import Image from 'next/image'
import { GET_ALL_CARGO } from '../lib/api'
import { client } from '../lib/apollo'
import CargoItem from '../components/CargoItem'
import CargoFilter from '../components/CargoFilter'
import Benefits from '../components/Benefits'
import Container from '../components/Container'
import Declension from '../components/Declension'
import mainImage from '../public/images/cargo.png'
import bgImage from '../public/images/bg-cargo.jpg'

export default function Cargo({ cargoList }) {
  return (
    <>
      <Container>
        <div className="page-title-block">
          <h1 className="page-title">
            Диспетчерский <span className="text-yellow">онлайн-центр</span>
          </h1>
          <Image src={mainImage} alt="Грузы" />
          <Image className="bg-image" src={bgImage} alt="Фон" />
        </div>
        {cargoList ? (
          <>
            <CargoFilter />
            <div className="cargo-list">
              <span className="title">Все грузы для перевозки по Беларуси</span>
              <p>
                По вашему запросу поиск грузов для перевозки найдено{' '}
                <span className="text-green">
                  <Declension count={cargoList.edges.length} words={['предложение', 'предложения', 'предложений']} />
                </span>
              </p>
              <CargoItem cargos={cargoList} />{' '}
            </div>
            <div className="show-more-cargo">
              <p>Хотите увидеть больше грузов?</p>
              <button className="filter-button">Открыть все грузы</button>
            </div>
          </>
        ) : null}
      </Container>
      <div className="separator-white">
        <hr />
      </div>
      <Benefits />
    </>
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
