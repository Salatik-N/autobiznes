import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './CargoFilter.module.scss'
import searchIcon from '../public/icons/search.svg'
import Select, { components } from 'react-select'
import { filterWeight, orderBy, filterVehicleBodyType } from '../lib/options'
import address from '../lib/city.json'

enum FIELDS {
  SHIPPING_REGION = 'shippingRegion',
  SHIPPING_CITY = 'shippingCity',
  UNLOADING_COUNTRY = 'unloadingCountry',
  UNLOADING_REGION = 'unloadingRegion',
  UNLOADING_CITY = 'unloadingCity',
  WEIGHT = 'weight',
  VEHICLE_BODY_TYPE = 'vehicleBodyType',
  ORDER_BY = 'orederBy',
}

export default function CargoFilter({ onUseFilter }) {
  const [form, setForm] = useState({
    [FIELDS.SHIPPING_REGION]: null,
    [FIELDS.SHIPPING_CITY]: null,
    [FIELDS.UNLOADING_COUNTRY]: null,
    [FIELDS.UNLOADING_REGION]: null,
    [FIELDS.UNLOADING_CITY]: null,
    [FIELDS.WEIGHT]: null,
    [FIELDS.VEHICLE_BODY_TYPE]: null,
    [FIELDS.ORDER_BY]: null,
  })

  const handleChangeFormSelect = (event, actionMeta) => {
    const name = actionMeta?.name
    const value = event?.value || event?.name

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const handleUseFilter = (e) => {
    e.preventDefault()
    onUseFilter(form)
  }

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Выберите предыдущий параметр</span>
      </components.NoOptionsMessage>
    )
  }

  return (
    <form onSubmit={handleUseFilter} autoComplete="on">
      <div className={`${styles.filterBlock} white-background`}>
        <div className={styles.filterList}>
          {/* <label>
            <span>Страна отправки</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
            />
          </label> */}
          <label>
            <span>Регион отправки</span>
            <Select
              name={FIELDS.SHIPPING_REGION}
              onChange={handleChangeFormSelect}
              options={address.find((e) => e.name === 'Беларусь').regions}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Город</span>
            <Select
              name={FIELDS.SHIPPING_CITY}
              onChange={handleChangeFormSelect}
              options={
                address.find((e) => e.name === 'Беларусь').regions.find((e) => e.name === form[FIELDS.SHIPPING_REGION])
                  ?.cities
              }
              components={{ NoOptionsMessage }}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Выберите город"
            />
          </label>
          <label>
            <span>Страна прибытия</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={address}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Регион прибытия</span>
            <Select
              name={FIELDS.UNLOADING_REGION}
              onChange={handleChangeFormSelect}
              options={address.find((e) => e.name === form[FIELDS.UNLOADING_COUNTRY])?.regions}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              components={{ NoOptionsMessage }}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Город прибытия</span>
            <Select
              name={FIELDS.UNLOADING_CITY}
              onChange={handleChangeFormSelect}
              options={
                address
                  .find((e) => e.name === form[FIELDS.UNLOADING_COUNTRY])
                  ?.regions.find((e) => e.name === form[FIELDS.UNLOADING_REGION])?.cities
              }
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Выберите город"
            />
          </label>
          <label>
            <span>Вес груза</span>
            <Select
              name={FIELDS.WEIGHT}
              onChange={handleChangeFormSelect}
              options={filterWeight}
              defaultValue={filterWeight[0]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Тип кузова</span>
            <Select
              name={FIELDS.VEHICLE_BODY_TYPE}
              onChange={handleChangeFormSelect}
              options={filterVehicleBodyType}
              defaultValue={filterVehicleBodyType[0]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Сначала</span>
            <Select
              name={FIELDS.ORDER_BY}
              onChange={handleChangeFormSelect}
              options={orderBy}
              defaultValue={orderBy[2]}
              placeholder="Новые"
            />
          </label>
        </div>
        <button type="submit" className={styles.filterButton}>
          <Image src={searchIcon} alt="Поиск" />
        </button>
      </div>
    </form>
  )
}
