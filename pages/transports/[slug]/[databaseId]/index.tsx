import Head from 'next/head'
import parse from "html-react-parser";
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { initializeApollo } from '../../../../lib/apollo'
import { GET_TRANSPORT_INFO, GET_ALL_TRANSPORTS } from '../../../../lib/api'
import Container from '../../../../components/Container'
import { Loader } from '../../../../components/Loader'
import ImagesGallery from '../../../../components/ImagesGallery'
import verifiedUser from '/public/icons/verified-user.svg'
import viberIcon from '/public/icons/viber.svg'
import whatsAppIcon from '/public/icons/whatsapp.svg'
import telegramIcon from '/public/icons/telegram.svg'
import timeIcon from '/public/icons/time.svg'
import PhoneSVG from '../../../../components/PhoneSVG'
import TransportFeatures from '../../../../components/TransportFeatures'

const apolloClient = initializeApollo()

export default function TransportPage({ transportItem, isActiveAdminTools = false }) {
  const router = useRouter()
  const generateGoogleMapsLink = (startRegion, startCity) => {
    const encodedStartCity = encodeURIComponent(startCity)
    const encodedStartRegion = encodeURIComponent(`${startRegion}`)
    const googleMapsLink = `https://www.google.com/maps?q=${encodedStartCity},+${encodedStartRegion}`
    return googleMapsLink
  }

  const goBack = () => {
    router.back()
  }

  const fullHead = transportItem && parse(transportItem?.seo.fullHead)

  return (
    <>
      <Head>
        <title>{transportItem.seo?.title || "Грузовые и пассажирские перевозки в РБ"}</title>
        <meta name="description" content={transportItem.seo?.metaDesc || "Грузовые и пассажирские перевозки в РБ"} />
        <meta name="robots" content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
        <meta name="keywords" content={transportItem.seo?.focuskw || "Грузовые и пассажирские перевозки в РБ"} />
        {fullHead}
      </Head>
      {transportItem ? (
        <div className="transport-item-page">
          <section>
            <Container>
              <div className="go-back-button-block">
                <button onClick={goBack} className="go-back-button">
                  <i className="arrow" />
                  <span>Назад</span>
                </button>
              </div>
              <div className="transport-item">
                <div className="title">
                  {transportItem.author?.node.customField.verifiedUser && (
                    <Image src={verifiedUser} width={16} height={16} alt="Подтвержденный пользователь" />
                  )}
                  <h1>{transportItem.title}</h1>
                </div>
                <div className="main-info">
                  <div className="image">
                    <ImagesGallery
                      photos={transportItem.acfTransportPhotos.photoTruck}
                      isActiveAdminTools={isActiveAdminTools}
                    />
                  </div>
                  <div className="info">
                    <Image
                      className="avatar"
                      src={
                        transportItem.acfTransportPhotos.photoDriver?.mediaItemUrl ||
                        transportItem.author.node.avatar.url
                      }
                      alt="Аватар"
                      width={200}
                      height={200}
                    />
                    <span className="name">{transportItem.acfTransportContacts.customName}</span>
                    <p className="transport-in-park">
                      Техники в парке: {transportItem.author.node.customField.transportInPark} ед.
                    </p>
                    <Link className="phone" href={`tel:${transportItem.acfTransportContacts.customPhone}`}>
                      <PhoneSVG fill={'#4caf50'} />
                      {transportItem.acfTransportContacts.customPhone}
                    </Link>
                    {transportItem.acfTransportContacts.viber ||
                    transportItem.acfTransportContacts.whatsapp ||
                    transportItem.acfTransportContacts.telegram ? (
                      <div className="messengers">
                        {transportItem.acfTransportContacts.viber && (
                          <Link
                            href={`viber://chat?number=%2B${transportItem.acfTransportContacts.customPhone?.replace(
                              /\D/g,
                              ''
                            )}`}
                          >
                            <Image src={viberIcon} alt="Аватар" width={33} height={33} />
                          </Link>
                        )}
                        {transportItem.acfTransportContacts.whatsapp && (
                          <Link
                            href={`https://api.whatsapp.com/send?phone=${transportItem.acfTransportContacts.customPhone?.replace(
                              /\D/g,
                              ''
                            )}`}
                          >
                            <Image src={whatsAppIcon} alt="Аватар" width={33} height={33} />
                          </Link>
                        )}
                        {transportItem.acfTransportContacts.telegram && (
                          <Link href={`https://t.me/${transportItem.acfTransportContacts?.customPhone}`}>
                            <Image src={telegramIcon} alt="Аватар" width={33} height={33} />
                          </Link>
                        )}
                      </div>
                    ) : null}
                    {transportItem.acfTransportContacts.modeOperation && (
                      <div className="work-time">
                        <Image src={timeIcon} alt="Звонок" width={25} height={25} />
                        Режим работы: {transportItem.acfTransportContacts.modeOperation}
                      </div>
                    )}
                    {!transportItem.acfTransportFeatures.price1Hour &&
                    !transportItem.acfTransportFeatures.price1Km &&
                    !transportItem.acfTransportFeatures.pricePerShift ? (
                      <div className="price-block">
                        <div className="price-item">
                          <div className="price">договорная</div>
                          <div className="metering">цена</div>
                        </div>
                      </div>
                    ) : (
                      <div className="price-block">
                        <div className="price-item">
                          <div className="price">
                            {transportItem.acfTransportFeatures.price1Hour
                              ? transportItem.acfTransportFeatures.price1Hour
                              : '—'}
                          </div>
                          <div className="metering">BYN/час</div>
                        </div>
                        <div className="price-item">
                          <div className="price">
                            {transportItem.acfTransportFeatures.price1Km
                              ? transportItem.acfTransportFeatures.price1Km
                              : '—'}
                          </div>
                          <div className="metering">BYN/км</div>
                        </div>
                        <div className="price-item">
                          <div className="price">
                            {transportItem.acfTransportFeatures.pricePerShift
                              ? transportItem.acfTransportFeatures.pricePerShift
                              : '—'}
                          </div>
                          <div className="metering">BYN/смена</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="transport-features">
                  <h2 className="features-title">Характеристики</h2>
                  <TransportFeatures
                    active={true}
                    features={transportItem.acfTransportFeatures}
                    payment={transportItem.acfTransportContacts}
                  />
                </div>
                <div className="transport-map">
                  <Image
                    className="transport-map-image"
                    src="/images/bg-map.jpg"
                    width={1250}
                    height={250}
                    alt="Карта"
                  />
                  <Link
                    href={generateGoogleMapsLink(
                      transportItem.acfTransportAddress.regionTransport,
                      transportItem.acfTransportAddress.city
                    )}
                    target="_blank"
                  >
                    Перейти на карту
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const responseCategory = await apolloClient.query({
    query: GET_ALL_TRANSPORTS,
  })

  const paths =
    responseCategory?.data?.transports.edges.map(({ node }) => ({
      params: { slug: node.transportCategories.edges[0].node.slug, databaseId: String(node.databaseId) },
    })) || []

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const responseTransport = await apolloClient.query({
    query: GET_TRANSPORT_INFO,
    variables: {
      id: context.params.databaseId,
    },
  })
  const transportItem = responseTransport?.data?.transport
  console.log(transportItem)
  if (!transportItem) {
    return {
      notFound: true,
    }
  }

  return {
    props: { transportItem },
  }
}
