import Select from 'react-select'
import {
  vehicleBodyType,
  typeTransportation,
  workExperience,
  leaseTerm,
  serviceSpecialization,
  options,
  amenities,
  vehicleClass,
  minimumOrderTime,
} from '../../lib/options'

export const FeaturesInput = ({ type, form, FIELDS, handleChangeFormSelect, handleChangeForm }) => {
  const isCargo = type === 'transport-1t'
  const isBus = type === 'buses'
  const isWeddingCars = type === 'wedding-cars-and-limousines'
  const isMinivans = type === 'minivans-and-minibuses'
  const isTaxi = type === 'taxi'

  return (
    <div className="white-background">
      <span className="form-block-title">Характеристики грузовика</span>
      {isCargo && (
        <label>
          <span>Тип кузова</span>
          <Select
            name={FIELDS.VEHICLE_BODY_TYPE}
            onChange={handleChangeFormSelect}
            options={vehicleBodyType}
            defaultValue={vehicleBodyType[0]}
          />
        </label>
      )}
      {isCargo && (
        <label>
          <span>Тип перевозки</span>
          <Select
            name={FIELDS.TYPE_TRANSPORTATION}
            onChange={handleChangeFormSelect}
            options={typeTransportation}
            defaultValue={typeTransportation[0]}
          />
        </label>
      )}
      {isBus || isTaxi || isMinivans || isWeddingCars ? (
        <label>
          <span>Марка автомобиля</span>
          <input
            name={FIELDS.VEHICLE_BRAND}
            type="text"
            placeholder="Мерседес"
            value={form[FIELDS.VEHICLE_BRAND]}
            onChange={handleChangeForm}
          />
        </label>
      ) : null}
      {isBus || isTaxi || isMinivans || isWeddingCars ? (
        <label>
          <span>Опыт работы</span>
          <Select name={FIELDS.WORK_EXPERIENCE} onChange={handleChangeFormSelect} options={workExperience} />
        </label>
      ) : null}
      {isBus || isMinivans || isWeddingCars ? (
        <label>
          <span>Срок аренды</span>
          <Select name={FIELDS.LEASE_TERM} onChange={handleChangeFormSelect} options={leaseTerm} />
        </label>
      ) : null}
      {isBus || isMinivans ? (
        <label>
          <span>Удобства</span>
          <Select name={FIELDS.AMENITIES} onChange={handleChangeFormSelect} options={amenities} />
        </label>
      ) : null}
      {isBus || isMinivans || isWeddingCars || isTaxi ? (
        <label>
          <span>Количество мест (с багажом)</span>
          <input
            name={FIELDS.NUMBER_SEATS}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.NUMBER_SEATS]}
            onChange={handleChangeForm}
          />
        </label>
      ) : null}
      {isBus && (
        <label>
          <span>Количество мест (без багажа)</span>
          <input
            name={FIELDS.NUMBER_SEATS_WITHOUT_LUGGAGE}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.NUMBER_SEATS_WITHOUT_LUGGAGE]}
            onChange={handleChangeForm}
          />
        </label>
      )}
      {isBus || isMinivans || isTaxi ? (
        <label>
          <span>Специализация услуг</span>
          <Select
            name={FIELDS.SERVICE_SPECIALIZATION}
            onChange={handleChangeFormSelect}
            options={serviceSpecialization}
          />
        </label>
      ) : null}
      {isBus || isTaxi || isMinivans || isWeddingCars ? (
        <label>
          <span>Опции</span>
          <Select name={FIELDS.OPTIONS} onChange={handleChangeFormSelect} options={options} />
        </label>
      ) : null}
      {isBus || isMinivans ? (
        <label>
          <span>Класс автомобиля</span>
          <Select name={FIELDS.VEHICLE_CLASS} onChange={handleChangeFormSelect} options={vehicleClass} />
        </label>
      ) : null}
      {isBus || isTaxi || isMinivans || isWeddingCars ? (
        <label>
          <span>Цвет</span>
          <input name={FIELDS.COLOR} type="text" value={form[FIELDS.COLOR]} onChange={handleChangeForm} />
        </label>
      ) : null}
      {isBus || isTaxi || isMinivans || isWeddingCars ? (
        <label>
          <span>Транспорта в парке, ед.</span>
          <input
            name={FIELDS.VEHICLES_IN_PARK}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.VEHICLES_IN_PARK]}
            onChange={handleChangeForm}
          />
        </label>
      ) : null}
      {isBus || isMinivans || isWeddingCars || isTaxi ? (
        <label>
          <span>Минимальное время заказа</span>
          <Select name={FIELDS.MINIMUM_ORDER_TIME} onChange={handleChangeFormSelect} options={minimumOrderTime} />
        </label>
      ) : null}
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
        <span>Цена за 1 км., BYN</span>
        <input
          name={FIELDS.PRICE_1_KM}
          type="number"
          placeholder="Введите число"
          value={form[FIELDS.PRICE_1_KM]}
          onChange={handleChangeForm}
        />
      </label>
      {isCargo && (
        <label>
          <span>Грузоподъемность кузова, кг.</span>
          <input
            name={FIELDS.CARRYING_CAPACITY}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.CARRYING_CAPACITY]}
            onChange={handleChangeForm}
          />
        </label>
      )}
      {isCargo || isBus ? (
        <label>
          <span>Длина кузова, м.</span>
          <input
            name={FIELDS.BODY_LENGTH}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.BODY_LENGTH]}
            onChange={handleChangeForm}
          />
        </label>
      ) : null}
      {isCargo || isBus ? (
        <label>
          <span>Высота кузова, м.</span>
          <input
            name={FIELDS.BODY_HEIGHT}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.BODY_HEIGHT]}
            onChange={handleChangeForm}
          />
        </label>
      ) : null}
      {isCargo || isBus ? (
        <label>
          <span>Ширина кузова, м.</span>
          <input
            name={FIELDS.BODY_WIDTH}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.BODY_WIDTH]}
            onChange={handleChangeForm}
          />
        </label>
      ) : null}
      {isCargo && (
        <label>
          <span>Объем кузова, м./куб.</span>
          <input
            name={FIELDS.BODY_VOLUME}
            type="number"
            placeholder="Введите число"
            value={form[FIELDS.BODY_VOLUME]}
            onChange={handleChangeForm}
          />
        </label>
      )}
    </div>
  )
}
