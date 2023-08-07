import { useEffect, useState } from 'react'

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

const CargoForm = () => {
  const [form, setForm] = useState({
    [FIELDS.TITLE]: '',
    [FIELDS.SHIPPING_REGION]: '',
    [FIELDS.SHIPPING_CITY]: '',
    [FIELDS.SHIPPING_ADDRESS]: '',
    [FIELDS.DATE_LOADING]: null,
    [FIELDS.UNLOADING_COUNTRY]: '',
    [FIELDS.UNLOADING_REGION]: '',
    [FIELDS.UNLOADING_CITY]: '',
    [FIELDS.UNLOADING_ADDRESS]: '',
    [FIELDS.DATE_UNLOADING]: null,
    [FIELDS.WEIGHT]: null,
    [FIELDS.MOVERS]: '',
    [FIELDS.VEHICLE_BODY_TYPE]: '',
    [FIELDS.TYPE_LOADING]: '',
    [FIELDS.TYPE_TRANSPORTATION]: '',
    [FIELDS.CUSTOM_NAME]: '',
    [FIELDS.CUSTOM_PHONE]: null,
    [FIELDS.VIBER]: false,
    [FIELDS.WHATSAPP]: false,
    [FIELDS.TELEGRAM]: false,
    [FIELDS.PAYMENT_METHOD]: '',
    [FIELDS.BUDGET_TO]: null,
    [FIELDS.FULL_DESCRIPTION]: '',
  })
}

export default CargoForm
