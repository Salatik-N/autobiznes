import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { EDIT_CARGO, GET_CARGO_INFO } from '../../lib/api'
import { initializeApollo } from '../../lib/apollo'
import { movers, vehicleBodyType, typeTransportation, typeLoading, paymentMethod } from '../../lib/options'
import Select from 'react-select'
import Container from '../../components/Container'
import address from '../../lib/city.json'
import { useState } from 'react'
import PhoneMaskInput from '../../components/PhoneMaskInput'
import TitleInput from '../../components/Form/TitleInput'

enum FIELDS {
  TITLE = 'title',
  SHIPPING_REGION = 'shippingRegion',
  SHIPPING_CITY = 'shippingCity',
  SHIPPING_ADDRESS = 'shippingAddress',
  DATE_LOADING = 'dateLoading',
  UNLOADING_COUNTRY = 'unloadingCountry',
  UNLOADING_REGION = 'unloadingRegion',
  UNLOADING_CITY = 'unloadingCity',
  UNLOADING_ADDRESS = 'unloadingAdress',
  DATE_UNLOADING = 'dateUnloading',
  WEIGHT = 'weight',
  MOVERS = 'movers',
  VEHICLE_BODY_TYPE = 'vehicleBodyType',
  TYPE_LOADING = 'typeLoading',
  TYPE_TRANSPORTATION = 'typeTransportation',
  CUSTOM_NAME = 'customName',
  CUSTOM_PHONE = 'customPhone',
  VIBER = 'viber',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  PAYMENT_METHOD = 'paymentMethod',
  BUDGET_TO = 'budgetTo',
  FULL_DESCRIPTION = 'fullDescription',
}

export default function EditCargo() {
  const router = useRouter()
  const apolloClient = initializeApollo()
  const [consentToPosting, setConsentToPosting] = useState(false)
  const [form, setForm] = useState({})
  const { data } = useQuery(GET_CARGO_INFO, { variables: { id: router.query.id } })
  useEffect(() => {
    const cargo = data?.cargo
    cargo &&
      setForm({
        [FIELDS.TITLE]: cargo[FIELDS.TITLE] || '',
        [FIELDS.SHIPPING_REGION]: cargo.acfCargoPickupPoint[FIELDS.SHIPPING_REGION] || '',
        [FIELDS.SHIPPING_CITY]: cargo.acfCargoPickupPoint[FIELDS.SHIPPING_CITY] || '',
        [FIELDS.SHIPPING_ADDRESS]: cargo.acfCargoPickupPoint[FIELDS.SHIPPING_ADDRESS] || '',
        [FIELDS.DATE_LOADING]: formattedDate(cargo.acfCargoPickupPoint[FIELDS.DATE_LOADING]) || null,
        [FIELDS.UNLOADING_COUNTRY]: cargo.acfCargoDeliverPoint[FIELDS.UNLOADING_COUNTRY] || '',
        [FIELDS.UNLOADING_REGION]: cargo.acfCargoDeliverPoint[FIELDS.UNLOADING_REGION] || '',
        [FIELDS.UNLOADING_CITY]: cargo.acfCargoDeliverPoint[FIELDS.UNLOADING_CITY] || '',
        [FIELDS.UNLOADING_ADDRESS]: cargo.acfCargoDeliverPoint[FIELDS.UNLOADING_ADDRESS] || '',
        [FIELDS.DATE_UNLOADING]: formattedDate(cargo.acfCargoDeliverPoint[FIELDS.DATE_UNLOADING]) || null,
        [FIELDS.WEIGHT]: cargo.acfCargoFeatures[FIELDS.WEIGHT] || null,
        [FIELDS.MOVERS]: cargo.acfCargoFeatures[FIELDS.MOVERS] || '',
        [FIELDS.VEHICLE_BODY_TYPE]: cargo.acfCargoFeatures[FIELDS.VEHICLE_BODY_TYPE] || '',
        [FIELDS.TYPE_LOADING]: cargo.acfCargoFeatures[FIELDS.TYPE_LOADING] || '',
        [FIELDS.TYPE_TRANSPORTATION]: cargo.acfCargoFeatures[FIELDS.TYPE_TRANSPORTATION] || '',
        [FIELDS.CUSTOM_NAME]: cargo.acfCargoContacts[FIELDS.CUSTOM_NAME] || '',
        [FIELDS.CUSTOM_PHONE]: cargo.acfCargoContacts[FIELDS.CUSTOM_PHONE] || null,
        [FIELDS.VIBER]: cargo.acfCargoContacts[FIELDS.VIBER] || false,
        [FIELDS.WHATSAPP]: cargo.acfCargoContacts[FIELDS.WHATSAPP] || false,
        [FIELDS.TELEGRAM]: cargo.acfCargoContacts[FIELDS.TELEGRAM] || false,
        [FIELDS.PAYMENT_METHOD]: cargo.acfCargoContacts[FIELDS.PAYMENT_METHOD] || '',
        [FIELDS.BUDGET_TO]: cargo.acfCargoContacts[FIELDS.BUDGET_TO] || null,
        [FIELDS.FULL_DESCRIPTION]: cargo.acfCargoDescription[FIELDS.FULL_DESCRIPTION] || '',
      })
  }, [data])

  const formattedDate = (item) => {
    const parts = item.split('.')
    return `${parts[2]}-${parts[1]}-${parts[0]}`
  }

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
    console.log(form)
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

  const editCargo = async (e) => {
    e.preventDefault()
    if (consentToPosting) {
      apolloClient
        .mutate({
          mutation: EDIT_CARGO,
          variables: {
            cargoId: router.query.id,
            title: form[FIELDS.TITLE],
            shippingRegion: form[FIELDS.SHIPPING_REGION],
            shippingCity: form[FIELDS.SHIPPING_CITY],
            shippingAddress: form[FIELDS.SHIPPING_ADDRESS],
            dateLoading: form[FIELDS.DATE_LOADING],
            unloadingCountry: form[FIELDS.UNLOADING_COUNTRY],
            unloadingRegion: form[FIELDS.UNLOADING_REGION],
            unloadingCity: form[FIELDS.UNLOADING_CITY],
            unloadingAdress: form[FIELDS.UNLOADING_ADDRESS],
            dateUnloading: form[FIELDS.DATE_UNLOADING],
            weight: parseInt(form[FIELDS.WEIGHT]),
            movers: form[FIELDS.MOVERS],
            vehicleBodyType: form[FIELDS.VEHICLE_BODY_TYPE],
            typeLoading: form[FIELDS.TYPE_LOADING],
            typeTransportation: form[FIELDS.TYPE_TRANSPORTATION],
            customName: form[FIELDS.CUSTOM_NAME],
            customPhone: form[FIELDS.CUSTOM_PHONE],
            viber: form[FIELDS.VIBER],
            whatsapp: form[FIELDS.WHATSAPP],
            telegram: form[FIELDS.TELEGRAM],
            paymentMethod: form[FIELDS.PAYMENT_METHOD],
            budgetTo: parseInt(form[FIELDS.BUDGET_TO]),
            fullDescription: form[FIELDS.FULL_DESCRIPTION],
          },
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('Подтвердите отправку')
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <Container>
      <button onClick={goBack} className="go-back-button">
        <i className="arrow" />
      </button>
      <span className="form-page-title">Редактирование груза, объявление №{router.query.id}</span>
      <form onSubmit={editCargo} autoComplete="on">
        <TitleInput name={FIELDS.TITLE} value={form[FIELDS.TITLE]} onChange={handleChangeForm} />

        <div className="white-background">
          <span className="form-block-title">Откуда забрать</span>
          <label>
            <span>Регион</span>
            <Select
              name={FIELDS.SHIPPING_REGION}
              onChange={handleChangeFormSelect}
              value={form[FIELDS.SHIPPING_REGION] && { name: form[FIELDS.SHIPPING_REGION] }}
              options={address.find((e) => e.name === 'Беларусь').regions}
              getOptionLabel={(option) => option.name || form[FIELDS.SHIPPING_REGION]}
              getOptionValue={(option) => option.name || form[FIELDS.SHIPPING_REGION]}
              placeholder="Выберите регион"
            />
          </label>
          <label>
            <span>Город</span>
            <Select
              name={FIELDS.SHIPPING_CITY}
              onChange={handleChangeFormSelect}
              value={form[FIELDS.SHIPPING_CITY] && { name: form[FIELDS.SHIPPING_CITY] }}
              options={
                address.find((e) => e.name === 'Беларусь').regions.find((e) => e.name === form[FIELDS.SHIPPING_REGION])
                  ?.cities
              }
              getOptionLabel={(option) => option.name || form[FIELDS.SHIPPING_CITY]}
              getOptionValue={(option) => option.name || form[FIELDS.SHIPPING_CITY]}
              placeholder="Выберите город"
            />
          </label>
          <label>
            <span>Адрес</span>
            <input
              name={FIELDS.SHIPPING_ADDRESS}
              type="text"
              placeholder="Ленина 30"
              value={form[FIELDS.SHIPPING_ADDRESS]}
              onChange={handleChangeForm}
            />
          </label>
          <label>
            <span>Дата</span>
            <input
              name={FIELDS.DATE_LOADING}
              type="date"
              value={form[FIELDS.DATE_LOADING]}
              onChange={handleChangeForm}
            />
          </label>
        </div>

        <div className="white-background">
          <span className="form-block-title">Куда доставить</span>
          <label>
            <span>Страна</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              value={form[FIELDS.UNLOADING_COUNTRY] && { name: form[FIELDS.UNLOADING_COUNTRY] }}
              options={address}
              getOptionLabel={(option) => option.name || form[FIELDS.UNLOADING_COUNTRY]}
              getOptionValue={(option) => option.name || form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Выберите страну"
            />
          </label>
          <label>
            <span>Регион</span>
            <Select
              name={FIELDS.UNLOADING_REGION}
              onChange={handleChangeFormSelect}
              value={form[FIELDS.UNLOADING_REGION] && { name: form[FIELDS.UNLOADING_REGION] }}
              options={address.find((e) => e.name === form[FIELDS.UNLOADING_COUNTRY])?.regions}
              getOptionLabel={(option) => option.name || form[FIELDS.UNLOADING_REGION]}
              getOptionValue={(option) => option.name || form[FIELDS.UNLOADING_REGION]}
              placeholder="Выберите регион"
            />
          </label>
          <label>
            <span>Город</span>
            <Select
              name={FIELDS.UNLOADING_CITY}
              onChange={handleChangeFormSelect}
              value={form[FIELDS.UNLOADING_CITY] && { name: form[FIELDS.UNLOADING_CITY] }}
              options={
                address
                  .find((e) => e.name === form[FIELDS.UNLOADING_COUNTRY])
                  ?.regions.find((e) => e.name === form[FIELDS.UNLOADING_REGION])?.cities
              }
              getOptionLabel={(option) => option.name || form[FIELDS.UNLOADING_CITY]}
              getOptionValue={(option) => option.name || form[FIELDS.UNLOADING_CITY]}
              placeholder="Выберите город"
            />
          </label>
          <label>
            <span>Адрес</span>
            <input
              name={FIELDS.UNLOADING_ADDRESS}
              type="text"
              placeholder="Ленина 30"
              value={form[FIELDS.UNLOADING_ADDRESS]}
              onChange={handleChangeForm}
            />
          </label>
          <label>
            <span>Дата</span>
            <input
              name={FIELDS.DATE_UNLOADING}
              type="date"
              placeholder="21.03.2023"
              value={form[FIELDS.DATE_UNLOADING]}
              onChange={handleChangeForm}
            />
          </label>
        </div>

        <div className="white-background">
          <span className="form-block-title">Информация о грузе</span>
          <label>
            <span>Масса, кг.</span>
            <input
              name={FIELDS.WEIGHT}
              type="number"
              placeholder="2700"
              value={form[FIELDS.WEIGHT]}
              onChange={handleChangeForm}
            />
          </label>
        </div>

        <div className="white-background">
          <span className="form-block-title">Характеристики грузовика</span>
          <label>
            <span>Грузчики</span>
            <Select
              name={FIELDS.MOVERS}
              onChange={handleChangeFormSelect}
              value={form[FIELDS.MOVERS] && { label: form[FIELDS.MOVERS], value: form[FIELDS.MOVERS] }}
              options={movers}
              defaultValue={movers[0]}
            />
          </label>

          <label>
            <span>Тип кузова</span>
            <Select
              name={FIELDS.VEHICLE_BODY_TYPE}
              onChange={handleChangeFormSelect}
              value={
                form[FIELDS.VEHICLE_BODY_TYPE] && {
                  label: form[FIELDS.VEHICLE_BODY_TYPE],
                  value: form[FIELDS.VEHICLE_BODY_TYPE],
                }
              }
              options={vehicleBodyType}
              defaultValue={vehicleBodyType[0]}
            />
          </label>
          <label>
            <span>Тип загрузки</span>
            <Select
              name={FIELDS.TYPE_LOADING}
              onChange={handleChangeFormSelect}
              value={
                form[FIELDS.TYPE_LOADING] && { label: form[FIELDS.TYPE_LOADING], value: form[FIELDS.TYPE_LOADING] }
              }
              options={typeLoading}
              defaultValue={typeLoading[0]}
            />
          </label>
          <label>
            <span>Тип перевозки</span>
            <Select
              name={FIELDS.TYPE_TRANSPORTATION}
              onChange={handleChangeFormSelect}
              value={
                form[FIELDS.TYPE_TRANSPORTATION] && {
                  label: form[FIELDS.TYPE_TRANSPORTATION],
                  value: form[FIELDS.TYPE_TRANSPORTATION],
                }
              }
              options={typeTransportation}
              defaultValue={typeTransportation[0]}
            />
          </label>
        </div>

        <div className="white-background">
          <span className="form-block-title">Контактные данные</span>
          <label>
            <span>Имя заказчика</span>
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
            <PhoneMaskInput name={FIELDS.CUSTOM_PHONE} value={form[FIELDS.CUSTOM_PHONE]} onChange={handleChangeForm} />
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
            <span>Способ оплаты</span>
            <Select
              name={FIELDS.PAYMENT_METHOD}
              onChange={handleChangeFormSelect}
              value={
                form[FIELDS.PAYMENT_METHOD] && {
                  label: form[FIELDS.PAYMENT_METHOD],
                  value: form[FIELDS.PAYMENT_METHOD],
                }
              }
              options={paymentMethod}
              placeholder="Наличные"
            />
          </label>
          <label>
            <span>Бюджет до, BYN</span>
            <input
              name={FIELDS.BUDGET_TO}
              type="number"
              placeholder="Введите бюджет"
              value={form[FIELDS.BUDGET_TO]}
              onChange={handleChangeForm}
            />
          </label>
        </div>

        <div className="white-background">
          <span className="form-block-title">Подробнее о заказе</span>
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
            <input type="checkbox" onChange={() => setConsentToPosting(!consentToPosting)} />
            Ознакомлен с правилами сервиса. Согласен на размещение рекламного логотипа autobiznes на загруженные мной
            фотографии.
          </label>
          <button type="submit">Сохранить изменения</button>
        </div>
      </form>
    </Container>
  )
}
