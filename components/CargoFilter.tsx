import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './CargoFilter.module.scss'
import searchIcon from '../public/icons/search.svg'
import Select from 'react-select'

enum FIELDS {
  UNLOADING_COUNTRY = 'unloadingCountry',
}

export default function CargoFilter({ cargoList }) {
  const [form, setForm] = useState({
    [FIELDS.UNLOADING_COUNTRY]: null,
  })

  useEffect(() => {
    getOptionsCargo()
  }, [])

  const getOptionsCargo = () => {
    const countries = []
    const response = []
    cargoList.edges.map((item) =>
      countries.includes(item.node.acfCargoDeliverPoint[FIELDS.UNLOADING_COUNTRY])
        ? null
        : countries.push(item.node.acfCargoDeliverPoint[FIELDS.UNLOADING_COUNTRY])
    )
    countries.map((item) => response.push({ value: item, label: item }))

    setForm((prevValue) => ({
      ...prevValue,
      [FIELDS.UNLOADING_COUNTRY]: response,
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

  const handleUseFilter = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleUseFilter} autoComplete="on">
      <div className={`${styles.filterBlock} white-background`}>
        <div className={styles.filterList}>
          <label>
            <span>Страна прибытия</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Регион отправки</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Регион прибытия</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Вес груза</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Тип кузова</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
            />
          </label>
          <label>
            <span>Упорядочить по</span>
            <Select
              name={FIELDS.UNLOADING_COUNTRY}
              onChange={handleChangeFormSelect}
              options={form[FIELDS.UNLOADING_COUNTRY]}
              placeholder="Все"
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
