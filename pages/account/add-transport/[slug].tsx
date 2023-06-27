import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { client } from '../../../lib/apollo'
import { useQuery } from '@apollo/client'
import { ADD_NEW_TRANSPORT, GET_TRANSPORT_CATEGORY, GET_USER_INFO } from '../../../lib/api'
import Image from 'next/image'
import Container from '../../../components/Container'
import TitleInput from '../../../components/Form/TitleInput'
import PhoneMaskInput from '../../../components/PhoneMaskInput'
import Select from 'react-select'
import address from '../../../lib/city.json'
import { vehicleBodyType, typeTransportation, paymentMethod, paymentProcedure } from '../../../lib/options'

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
  PRICE_1_HOUR = 'price1Hour',
  PRICE_PER_SHIFT = 'pricePerShift',
  PRICE_1_KM = 'price1Km',
  CARRYING_CAPACITY = 'carryingCapacity',
  BODY_LENGTH = 'bodyLength',
  BODY_HEIGHT = 'bodyHeight',
  BODY_WIDTH = 'bodyWidth',
  BODY_VOLUME = 'bodyVolume',
  FULL_DESCRIPTION = 'fullDescription',
}

export default function Transport1t({ transportCategory }) {
  const { data } = useQuery(GET_USER_INFO)
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
    [FIELDS.PRICE_1_HOUR]: null,
    [FIELDS.PRICE_PER_SHIFT]: null,
    [FIELDS.PRICE_1_KM]: null,
    [FIELDS.CARRYING_CAPACITY]: null,
    [FIELDS.BODY_LENGTH]: null,
    [FIELDS.BODY_HEIGHT]: null,
    [FIELDS.BODY_WIDTH]: null,
    [FIELDS.BODY_VOLUME]: null,
    [FIELDS.FULL_DESCRIPTION]: '',
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

  const createNewCargo = async (e) => {
    console.log(transportCategory.slug)
    e.preventDefault()
    client
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
          price1Hour: form[FIELDS.PRICE_1_HOUR],
          pricePerShift: form[FIELDS.PRICE_PER_SHIFT],
          price1Km: form[FIELDS.PRICE_1_KM],
          carryingCapacity: form[FIELDS.CARRYING_CAPACITY],
          bodyLength: form[FIELDS.BODY_LENGTH],
          bodyHeight: form[FIELDS.BODY_HEIGHT],
          bodyWidth: form[FIELDS.BODY_WIDTH],
          bodyVolume: form[FIELDS.BODY_VOLUME],
          fullDescription: form[FIELDS.FULL_DESCRIPTION],
        },
      })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <Container>
        <button onClick={goBack} className="go-back-button">
          <i className="arrow" />
        </button>
        <span className="form-page-title">{transportCategory.name}</span>
        <form onSubmit={createNewCargo} autoComplete="on">
          <TitleInput name={FIELDS.TITLE} value={form[FIELDS.TITLE]} onChange={handleChangeForm} />

          <div className="white-background">
            <span className="form-block-title">Адрес</span>
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

          <div className="white-background">
            <span className="form-block-title">Контактные данные</span>
            <label>
              <span>ФИО исполнителя</span>
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
              <label className="label-checkbox">
                <input
                  name={FIELDS.WHATSAPP}
                  type="checkbox"
                  checked={form[FIELDS.WHATSAPP]}
                  onChange={handleChangeFormCheckbox}
                />
                <span>WhatsApp</span>
              </label>
              <label className="label-checkbox">
                <input
                  name={FIELDS.TELEGRAM}
                  type="checkbox"
                  checked={form[FIELDS.TELEGRAM]}
                  onChange={handleChangeFormCheckbox}
                />
                <span>Telegram</span>
              </label>
              <label className="label-checkbox">
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

          <div className="white-background">
            <span className="form-block-title">Характеристики грузовика</span>
            <label>
              <span>Тип кузова</span>
              <Select
                name={FIELDS.VEHICLE_BODY_TYPE}
                onChange={handleChangeFormSelect}
                options={vehicleBodyType}
                defaultValue={vehicleBodyType[0]}
              />
            </label>
            <label>
              <span>Тип перевозки</span>
              <Select
                name={FIELDS.TYPE_TRANSPORTATION}
                onChange={handleChangeFormSelect}
                options={typeTransportation}
                defaultValue={typeTransportation[0]}
              />
            </label>
            <label>
              <span>Цена за 1 час, BYN</span>
              <input
                name={FIELDS.PRICE_1_HOUR}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.PRICE_1_HOUR]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Цена за смену (7+1 часов), BYN</span>
              <input
                name={FIELDS.PRICE_PER_SHIFT}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.PRICE_PER_SHIFT]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Цена за 1 км, BYN</span>
              <input
                name={FIELDS.PRICE_1_KM}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.PRICE_1_KM]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Грузоподъемность кузова, кг</span>
              <input
                name={FIELDS.CARRYING_CAPACITY}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.CARRYING_CAPACITY]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Длина кузова, м</span>
              <input
                name={FIELDS.BODY_LENGTH}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.BODY_LENGTH]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Высота кузова, м</span>
              <input
                name={FIELDS.BODY_HEIGHT}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.BODY_HEIGHT]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Ширина кузова, м</span>
              <input
                name={FIELDS.BODY_WIDTH}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.BODY_WIDTH]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Объем кузова, м/куб</span>
              <input
                name={FIELDS.BODY_VOLUME}
                type="number"
                placeholder="Введите число"
                value={form[FIELDS.BODY_VOLUME]}
                onChange={handleChangeForm}
              />
            </label>
          </div>

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
            <label className="label-checkbox user-agreement">
              <input type="checkbox" />
              Ознакомлен с правилами сервиса. Согласен на размещение рекламного логотипа autobiznes на загруженные мной
              фотографии.
            </label>
            <button type="submit">Добавить объявление</button>
          </div>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const responseCategory = await client.query({
    query: GET_TRANSPORT_CATEGORY,
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
