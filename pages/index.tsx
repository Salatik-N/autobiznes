import Container from '../components/Container'
import Benefits from '../components/Benefits'
import FAQ from '../components/FAQ'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GET_FIVE_FIRST_CARGO, GET_CATEGORIES_CARGO_TRANSPORT, GET_CATEGORIES_PASSENGER_TRANSPORT } from '../lib/api'
import { initializeApollo } from '../lib/apollo'
import CategoryItem from '../components/CategoryItem'
import CargoItem from '../components/CargoItem'
import SignUp from '../components/SignUp'

export default function Index({ cargoList, cargoTransport, passengerTransport }) {
  return (
    <div className="home-page">
      <section className="header-section">
        <Container>
          <div className="page-title-block">
            <div className="page-title-content">
              <h1 className="page-title">
                Биржа <span className="text-yellow">грузов</span> и <span className="text-yellow">транспорта</span>
              </h1>
              <p className="page-sub-title">Диспетчерский онлайн-центр</p>
              <div className="page-header-buttons">
                <Link href="/account/add-cargo" className="add-order">
                  Оставить заказ
                </Link>
                <Link href="/account/add-transport" className="add-transport">
                  Добавить свой транспорт
                </Link>
              </div>
            </div>
            <Image
              className="content-image"
              src="/images/index.png"
              alt="Биржа грузов и транспорта"
              width={839}
              height={583}
            />
          </div>
        </Container>
        <div className="header-section-bg">
          <Image className="bg-image" src="/images/bg-home.jpg" alt="Фон" width={1920} height={668} />
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
      <Container>
        {cargoList ? (
          <>
            <div className="cargo-list">
              <h3>Ищете груз для перевозки?</h3>
              <p>Выберите подходящий заказ:</p>
              <div className="cargo-list-button">
                <span>У вас есть груз?</span>
                <Link href="/account/add-cargo" className="add-order">
                  Добавить заказ
                </Link>
              </div>
              <CargoItem cargos={cargoList} />
            </div>
            <div className="show-more-cargo">
              <p>Хотите увидеть больше грузов?</p>
              <Link href="/cargos" className="filter-button">
                Открыть все грузы
              </Link>
            </div>
          </>
        ) : null}
      </Container>
      <section className="benefits-section">
        <Benefits />
      </section>
      <div className="separator-white">
        <hr />
      </div>
      <div className="main-categories-block">
        <Container>
          <h3>Основные категории объявлений</h3>
          <p className="block-subtitile">
            Биржа грузов и транспорта “АВТОБИЗНЕС.БАЙ” призвана стать Вашим надежным помощником в организации внутренних
            и международных грузо-пассажиро-перевозок. Зарегистрируйтесь на нашем сайте, чтобы не пропустить подходящее
            предложение. Владелец груза получает доступ к каталогу транспортных компаний, а владелец транспорта – к базе
            грузоотправителей. Планируйте свой маршрут на нашем сайте, и выполняйте каждую сделку четко и в срок!
          </p>
          <div className="items-block">
            <div className="item white-background">
              <span className="number">01</span>
              <span className="h3">Грузовой транспорт</span>
              <Image src="/icons/truck-vector.svg" alt="Грузовой транспорт" width={170} height={170} />
              <p>
                Регистрируйтесь на Autobiznes.by и находите грузы для вашего транспорта. Хотите разместить объявление о
                ваших услугах и получать больше звонков?Мы вам в это поможем!
              </p>
            </div>
            <div className="item white-background">
              <span className="number">02</span>
              <span className="h3">Пассажирский транспорт</span>
              <Image src="/icons/bus-vector.svg" alt="Пассажирский транспорт" width={170} height={170} />
              <p>
                Занимаетесь перевозкой пассажиров и хотите привлечь больше клиентов ?Разместите объявление на
                Autobiznes.by и ждите звонков!
              </p>
            </div>
            <div className="item white-background">
              <span className="number">03</span>
              <span className="h3">Биржа грузов</span>
              <Image src="/icons/cargo-vector.svg" alt="Биржа грузов" width={170} height={170} />
              <p>
                Регистрируйтесь на Autobiznes.by и перевозите свои крупногабаритные грузы с помощью грузовых
                автомобилей. Избавьте себя от хлопот с логистикой и ненадежных перевозчиков!
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div className="cta-block">
        <Container>
          <h3>Максимум эффективности для перевозчиков, грузоотправителей и экспедиторов грузов</h3>
          <p>
            Биржа грузов и транспорта “Автобизнес.бай” призвана стать Вашим надежным помощником в организации внутренних
            и международных грузо-пассажиро-перевозок. Зарегистрируйтесь на нашем сайте, чтобы не пропустить подходящее
            предложение. Владелец груза получает доступ к каталогу транспортных компаний, а владелец транспорта – к базе
            грузоотправителей. Планируйте свой маршрут на нашем сайте, и выполняйте каждую сделку четко и в срок!
          </p>
          <div className="inner-block">
            <div className="item сustomer white-background">
              <span className="title">Вы заказчик?</span>
              <ul>
                <li>Бесплатное размещение объявления</li>
                <li>Качественный сервис</li>
                <li>Большая база исполнителей</li>
                <li>Простота работы через личный кабинет</li>
              </ul>
              <SignUp style={'button'}>Регистрация</SignUp>
            </div>
            <div className="item performer white-background">
              <span className="title">Вы исполнитель?</span>
              <ul>
                <li>Сокращение “простоя” техники</li>
                <li>Доступ к базе грузов</li>
                <li>Постоянные звонки</li>
                <li>Бесплатное размещение объявления</li>
              </ul>
              <SignUp style={'button'}>Регистрация</SignUp>
            </div>
          </div>
        </Container>
      </div>
      <div className="separator-white">
        <hr />
      </div>
      <FAQ />
    </div>
  )
}

const apolloClient = initializeApollo()

export const getStaticProps: GetStaticProps = async () => {
  const response = await apolloClient.query({
    query: GET_FIVE_FIRST_CARGO,
  })
  const cargoList = response?.data?.cargos

  const responseCargoTransport = await apolloClient.query({
    query: GET_CATEGORIES_CARGO_TRANSPORT,
  })
  const cargoTransport = responseCargoTransport?.data?.transportCategory

  const responsePassengerTransport = await apolloClient.query({
    query: GET_CATEGORIES_PASSENGER_TRANSPORT,
  })
  const passengerTransport = responsePassengerTransport?.data?.transportCategory
  return { props: { cargoList, cargoTransport, passengerTransport } }
}
