import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { initializeApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/client'
import { ADD_NEW_TRANSPORT, GET_CATEGORY_INFO, GET_USER_INFO, GET_ALL_TRANSPORT_CATEGORIES } from '../../../lib/api'
import Image from 'next/image'
import Container from '../../../components/Container'
import TitleInput from '../../../components/Form/TitleInput'
import PhoneMaskInput from '../../../components/PhoneMaskInput'
import Select from 'react-select'
import address from '../../../lib/city.json'
import { paymentMethod, paymentProcedure } from '../../../lib/options'
import { FeaturesInput } from '../../../components/Form/FeaturesInput'
import Cookies from 'js-cookie'
import DeleteSVG from '../../../components/DeleteSVG'

const apolloClient = initializeApollo()

enum FIELDS {
  TITLE = 'title',
  REGION_TRANSPORT = 'regionTransport',
  CITY = 'city',
  CUSTOM_NAME = 'customName',
  CUSTOM_PHONE = 'customPhone',
  VIBER = 'viber',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  MODE_OPERATION = 'modeOperation',
  PAYMENT_METHOD = 'paymentMethod',
  PAYMENT_PROCEDURE = 'paymentProcedure',
  VEHICLE_BODY_TYPE = 'vehicleBodyType',
  TYPE_TRANSPORTATION = 'typeTransportation',
  VEHICLE_BRAND = 'vehicleBrand',
  WORK_EXPERIENCE = 'workExperience',
  LEASE_TERM = 'leaseTerm',
  NUMBER_SEATS = 'numberSeats',
  NUMBER_SEATS_WITHOUT_LUGGAGE = 'numberSeatsWithoutLuggage',
  SERVICE_SPECIALIZATION = 'serviceSpecialization',
  OPTIONS = 'options',
  AMENITIES = 'amenities',
  VEHICLE_CLASS = 'vehicleClass',
  COLOR = 'color',
  VEHICLES_IN_PARK = 'vehiclesInPark',
  MINIMUM_ORDER_TIME = 'minimumOrderTime',
  PRICE_1_HOUR = 'price1Hour',
  PRICE_PER_SHIFT = 'pricePerShift',
  PRICE_1_KM = 'price1Km',
  CARRYING_CAPACITY = 'carryingCapacity',
  BODY_LENGTH = 'bodyLength',
  BODY_HEIGHT = 'bodyHeight',
  BODY_WIDTH = 'bodyWidth',
  BODY_VOLUME = 'bodyVolume',
  PHOTO_TRUCK = 'photoTruck',
  PHOTO_DRIVER = 'photoDriver',
  FULL_DESCRIPTION = 'fullDescription',
}

export default function Transport1t({ transportCategory }) {
  const { data } = useQuery(GET_USER_INFO)
  const inputPhotoDriverRef = useRef(null)
  const [consentToPosting, setConsentToPosting] = useState(false)
  const inputPhotoTruckRef = useRef(null)
  const [form, setForm] = useState({
    [FIELDS.TITLE]: '',
    [FIELDS.REGION_TRANSPORT]: '',
    [FIELDS.CITY]: '',
    [FIELDS.CUSTOM_NAME]: '',
    [FIELDS.CUSTOM_PHONE]: null,
    [FIELDS.VIBER]: false,
    [FIELDS.WHATSAPP]: false,
    [FIELDS.TELEGRAM]: false,
    [FIELDS.MODE_OPERATION]: '',
    [FIELDS.PAYMENT_METHOD]: '',
    [FIELDS.PAYMENT_PROCEDURE]: '',
    [FIELDS.VEHICLE_BODY_TYPE]: '',
    [FIELDS.TYPE_TRANSPORTATION]: '',
    [FIELDS.VEHICLE_BRAND]: '',
    [FIELDS.WORK_EXPERIENCE]: '',
    [FIELDS.LEASE_TERM]: '',
    [FIELDS.NUMBER_SEATS]: '',
    [FIELDS.NUMBER_SEATS_WITHOUT_LUGGAGE]: '',
    [FIELDS.SERVICE_SPECIALIZATION]: '',
    [FIELDS.OPTIONS]: '',
    [FIELDS.AMENITIES]: '',
    [FIELDS.VEHICLE_CLASS]: '',
    [FIELDS.COLOR]: '',
    [FIELDS.VEHICLES_IN_PARK]: '',
    [FIELDS.MINIMUM_ORDER_TIME]: '',
    [FIELDS.PRICE_1_HOUR]: null,
    [FIELDS.PRICE_PER_SHIFT]: null,
    [FIELDS.PRICE_1_KM]: null,
    [FIELDS.CARRYING_CAPACITY]: null,
    [FIELDS.BODY_LENGTH]: null,
    [FIELDS.BODY_HEIGHT]: null,
    [FIELDS.BODY_WIDTH]: null,
    [FIELDS.BODY_VOLUME]: null,
    [FIELDS.PHOTO_TRUCK]: [],
    [FIELDS.PHOTO_DRIVER]: null,
    [FIELDS.FULL_DESCRIPTION]: null,
  })
  const router = useRouter()

  useEffect(() => {
    data?.viewer &&
      setForm((prevValue) => ({
        ...prevValue,
        [FIELDS.CUSTOM_NAME]: data.viewer.firstName || '',
        [FIELDS.CUSTOM_PHONE]: data.viewer.customField.phone || '',
      }))
  }, [data])

  const handleChangeForm = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget
    const name = target?.name
    const value = target?.value

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }
  const handleChangeFormSelect = (event, actionMeta) => {
    const name = actionMeta?.name
    const value = event?.value || event?.name

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const handleChangeFormCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    const name = target?.name
    const checked = target.checked ? true : false

    setForm((prevValue) => ({
      ...prevValue,
      [name]: checked,
    }))
  }

  const handleChangeFormImage = async (event) => {
    const name = event?.currentTarget?.name
    const images = event?.target.files
    let value = []
    const formData = new FormData()
    for (let image in images) {
      if (typeof images[image] === 'object') {
        formData.append('file', images[image])
        value.push(await uploadImage(formData))
      }
    }
    if (name === 'photoDriver') value = value[0]

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const uploadImage = async (formData) => {
    return new Promise((resolve) => {
      // fetch('http://autobiznes.local/wp-json/wp/v2/media', {
      fetch('https://server.autobiznes.by/wp-json/wp/v2/media', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${Cookies.get('authToken')}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => resolve(data.source_url))
        .catch((err) => {
          console.error(err)
          return null
        })
    })
  }

  const handleAddPhotoClick = (ref) => {
    if (ref.current) {
      ref.current.click()
    }
  }

  const handleAddPhotoDrop = async (e, name) => {
    e.preventDefault()
    const images = e?.dataTransfer?.files
    let value = []
    const formData = new FormData()
    for (let image in images) {
      if (typeof images[image] === 'object') {
        formData.append('file', images[image])
        value.push(await uploadImage(formData))
      }
    }
    if (name === 'photoDriver') value = value[0]

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const removeImageTruck = (key) => {
    const newArray = form[FIELDS.PHOTO_TRUCK].filter((_, index) => index !== key)
    setForm((prevValue) => ({
      ...prevValue,
      [FIELDS.PHOTO_TRUCK]: newArray,
    }))
  }

  const removeImageDriver = () => {
    setForm((prevValue) => ({
      ...prevValue,
      [FIELDS.PHOTO_DRIVER]: null,
    }))
  }

  const createNewTransport = async (e) => {
    e.preventDefault()
    if (consentToPosting) {
      apolloClient
        .mutate({
          mutation: ADD_NEW_TRANSPORT,
          variables: {
            category: transportCategory.slug,
            title: form[FIELDS.TITLE],
            regionTransport: form[FIELDS.REGION_TRANSPORT],
            city: form[FIELDS.CITY],
            customName: form[FIELDS.CUSTOM_NAME],
            customPhone: form[FIELDS.CUSTOM_PHONE],
            viber: form[FIELDS.VIBER],
            whatsapp: form[FIELDS.WHATSAPP],
            telegram: form[FIELDS.TELEGRAM],
            modeOperation: form[FIELDS.MODE_OPERATION],
            paymentMethod: form[FIELDS.PAYMENT_METHOD],
            paymentProcedure: form[FIELDS.PAYMENT_PROCEDURE],
            vehicleBodyType: form[FIELDS.VEHICLE_BODY_TYPE],
            typeTransportation: form[FIELDS.TYPE_TRANSPORTATION],
            vehicleBrand: form[FIELDS.VEHICLE_BRAND],
            workExperience: form[FIELDS.WORK_EXPERIENCE],
            leaseTerm: form[FIELDS.LEASE_TERM],
            numberSeats: form[FIELDS.NUMBER_SEATS],
            numberSeatsWithoutLuggage: form[FIELDS.NUMBER_SEATS_WITHOUT_LUGGAGE],
            serviceSpecialization: form[FIELDS.SERVICE_SPECIALIZATION],
            options: form[FIELDS.OPTIONS],
            amenities: form[FIELDS.AMENITIES],
            vehicleClass: form[FIELDS.VEHICLE_CLASS],
            color: form[FIELDS.COLOR],
            vehiclesInPark: parseInt(form[FIELDS.VEHICLES_IN_PARK]),
            minimumOrderTime: parseInt(form[FIELDS.MINIMUM_ORDER_TIME]),
            price1Hour: parseInt(form[FIELDS.PRICE_1_HOUR]),
            pricePerShift: parseInt(form[FIELDS.PRICE_PER_SHIFT]),
            price1Km: parseInt(form[FIELDS.PRICE_1_KM]),
            carryingCapacity: parseInt(form[FIELDS.CARRYING_CAPACITY]),
            bodyLength: parseInt(form[FIELDS.BODY_LENGTH]),
            bodyHeight: parseInt(form[FIELDS.BODY_HEIGHT]),
            bodyWidth: parseInt(form[FIELDS.BODY_WIDTH]),
            bodyVolume: parseInt(form[FIELDS.BODY_VOLUME]),
            photoTruck: form[FIELDS.PHOTO_TRUCK],
            photoDriver: form[FIELDS.PHOTO_DRIVER],
            fullDescription: form[FIELDS.FULL_DESCRIPTION],
          },
        })
        .then((result) => {
          console.log(result)
          router.push('/account')
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('Подтвердите, что Вы ознакомились с правилами сервиса!')
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className="add-form">
      <Container>
        <button onClick={goBack} className="go-back-button">
          <i className="arrow" />
          <span>Назад</span>
        </button>
        <span className="form-page-title">{transportCategory.name}</span>
        <form onSubmit={createNewTransport} autoComplete="on">
          <TitleInput name={FIELDS.TITLE} value={form[FIELDS.TITLE]} onChange={handleChangeForm} />

          <div className="white-background">
            <span className="form-block-title">Адрес</span>
            <div className="input-list">
              <label>
                <span>Регион</span>
                <Select
                  name={FIELDS.REGION_TRANSPORT}
                  onChange={handleChangeFormSelect}
                  options={address.find((e) => e.name === 'Беларусь').regions}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                  placeholder="Выберите регион"
                />
              </label>
              <label>
                <span>Город</span>
                <Select
                  name={FIELDS.CITY}
                  onChange={handleChangeFormSelect}
                  options={
                    address
                      .find((e) => e.name === 'Беларусь')
                      .regions.find((e) => e.name === form[FIELDS.REGION_TRANSPORT])?.cities
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                  placeholder="Выберите город"
                />
              </label>
            </div>
          </div>

          <div className="white-background">
            <span className="form-block-title">Контактные данные</span>
            <div className="input-list">
              <label>
                <span>Имя исполнителя</span>
                <input
                  name={FIELDS.CUSTOM_NAME}
                  type="text"
                  placeholder="Алексей"
                  value={form[FIELDS.CUSTOM_NAME]}
                  onChange={handleChangeForm}
                />
              </label>
              <label>
                <span>Номер телефона</span>
                <PhoneMaskInput
                  name={FIELDS.CUSTOM_PHONE}
                  value={form[FIELDS.CUSTOM_PHONE]}
                  onChange={handleChangeForm}
                />
              </label>
              <div className="messenger-contacts">
                <label className={`label-checkbox ${form[FIELDS.WHATSAPP] ? 'checked' : ''}`}>
                  <input
                    name={FIELDS.WHATSAPP}
                    type="checkbox"
                    checked={form[FIELDS.WHATSAPP]}
                    onChange={handleChangeFormCheckbox}
                  />
                  <span>WhatsApp</span>
                </label>
                <label className={`label-checkbox ${form[FIELDS.TELEGRAM] ? 'checked' : ''}`}>
                  <input
                    name={FIELDS.TELEGRAM}
                    type="checkbox"
                    checked={form[FIELDS.TELEGRAM]}
                    onChange={handleChangeFormCheckbox}
                  />
                  <span>Telegram</span>
                </label>
                <label className={`label-checkbox ${form[FIELDS.VIBER] ? 'checked' : ''}`}>
                  <input
                    name={FIELDS.VIBER}
                    type="checkbox"
                    checked={form[FIELDS.VIBER]}
                    onChange={handleChangeFormCheckbox}
                  />
                  <span>Viber</span>
                </label>
              </div>
              <label>
                <span>Режим работы</span>
                <input
                  name={FIELDS.MODE_OPERATION}
                  type="text"
                  placeholder="Пн-Пт с 9.00-18.00"
                  value={form[FIELDS.MODE_OPERATION]}
                  onChange={handleChangeForm}
                />
              </label>
              <label>
                <span>Способ оплаты</span>
                <Select
                  name={FIELDS.PAYMENT_METHOD}
                  onChange={handleChangeFormSelect}
                  options={paymentMethod}
                  placeholder="Выбрать"
                />
              </label>
              <label>
                <span>Порядок оплаты</span>
                <Select
                  name={FIELDS.PAYMENT_PROCEDURE}
                  onChange={handleChangeFormSelect}
                  options={paymentProcedure}
                  placeholder="Выбрать"
                />
              </label>
            </div>
          </div>

          <FeaturesInput
            type={transportCategory.slug}
            form={form}
            FIELDS={FIELDS}
            handleChangeFormSelect={handleChangeFormSelect}
            handleChangeForm={handleChangeForm}
          />

          <div className="white-background">
            <span className="form-block-title">Дополнительная информация</span>
            <label>
              <span>Полное описание</span>
              <textarea
                name={FIELDS.FULL_DESCRIPTION}
                placeholder="Введите описание до 200 символов"
                value={form[FIELDS.FULL_DESCRIPTION]}
                onChange={handleChangeForm}
              />
            </label>
          </div>

          <div className="white-background">
            <span className="form-block-title">Фото грузовика</span>
            <div
              className={`form-file-block`}
              onClick={() => handleAddPhotoClick(inputPhotoTruckRef)}
              onDrop={(e) => handleAddPhotoDrop(e, FIELDS.PHOTO_TRUCK)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
            >
              <Image src="/icons/add-image.svg" width={52} height={48} alt="Добавить фото" />
              <p>Используйте только свои снимки и не размещайте рекламу. Иначе модератор отклонит ваше объявление.</p>
              <p>JPG, JPEG или PNG размером до 2 МБ.</p>
            </div>
            <input
              ref={inputPhotoTruckRef}
              className="visuallyhidden"
              name={FIELDS.PHOTO_TRUCK}
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={handleChangeFormImage}
            />
            {form[FIELDS.PHOTO_TRUCK] && (
              <div className="form-file-images">
                {form[FIELDS.PHOTO_TRUCK].map((link, key) => (
                  <div className="images-item">
                    <div className="delete-button" onClick={() => removeImageTruck(key)}>
                      <DeleteSVG />
                    </div>
                    <Image className="form-image" src={link} alt="Фото техники" width={200} height={200} />
                  </div>
                ))}
              </div>
            )}
            <div className="form-file-control">
              <button type="button" onClick={() => handleAddPhotoClick(inputPhotoTruckRef)}>
                {form[FIELDS.PHOTO_TRUCK]?.length === 4 ? 'Изменить фото' : 'Добавить фото'}
              </button>
              <span>до 4 фото</span>
            </div>
          </div>

          <div className="white-background">
            <span className="form-block-title">Фото водителя</span>
            <div
              className={`form-file-block`}
              onClick={() => handleAddPhotoClick(inputPhotoDriverRef)}
              onDrop={(e) => handleAddPhotoDrop(e, FIELDS.PHOTO_DRIVER)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
            >
              <Image src="/icons/add-image.svg" width={52} height={48} alt="Добавить фото" />
              <p>Используйте только свои снимки и не размещайте рекламу. Иначе модератор отклонит ваше объявление.</p>
              <p>JPG, JPEG или PNG размером до 2 МБ.</p>
            </div>
            <input
              ref={inputPhotoDriverRef}
              className="visuallyhidden"
              name={FIELDS.PHOTO_DRIVER}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleChangeFormImage}
            />
            {form[FIELDS.PHOTO_DRIVER] && (
              <div className="form-file-images">
                <div className="images-item">
                  <div className="delete-button" onClick={removeImageDriver}>
                    <DeleteSVG />
                  </div>
                  <Image
                    className="form-image"
                    src={form[FIELDS.PHOTO_DRIVER]}
                    alt="Фото водителя"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            )}
            <div className="form-file-control">
              <button type="button" onClick={() => handleAddPhotoClick(inputPhotoDriverRef)}>
                {form[FIELDS.PHOTO_DRIVER] ? 'Изменить фото' : 'Добавить фото'}
              </button>
              <span>до 1 фото</span>
            </div>
          </div>

          <div className="white-background">
            <label className={`label-checkbox user-agreement ${consentToPosting ? 'checked' : ''}`}>
              <input type="checkbox" onChange={() => setConsentToPosting(!consentToPosting)} />
              Ознакомлен с правилами сервиса. Согласен на размещение рекламного логотипа autobiznes на загруженные мной
              фотографии.
            </label>
            <button type="submit">Добавить объявление</button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const responseCategory = await apolloClient.query({
    query: GET_ALL_TRANSPORT_CATEGORIES,
  })

  console.log(responseCategory)

  const slugs = responseCategory?.data?.transportCategories.edges.map((item) => item.node.slug) || []

  const paths = slugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
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
