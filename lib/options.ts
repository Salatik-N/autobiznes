interface Option {
  value: string
  label: string
}

export const movers: Option[] = [
  { value: 'Без грузчиков', label: 'Без грузчиков' },
  { value: 'Помощь одного грузчика', label: 'Помощь одного грузчика' },
  { value: 'Помощь двух грузчиков', label: 'Помощь двух грузчиков' },
  { value: 'Помощь трех грузчиков', label: 'Помощь трех грузчиков' },
]

export const vehicleBodyType: Option[] = [
  { value: 'Не знаю', label: 'Не знаю' },
  { value: 'Автопоезд', label: 'Автопоезд' },
  { value: 'Балковоз', label: 'Балковоз' },
  { value: 'Гидроборт', label: 'Гидроборт' },
]

export const typeTransportation: Option[] = [
  { value: 'Не знаю', label: 'Не знаю' },
  { value: 'Полная загрузка', label: 'Полная загрузка' },
  { value: 'Частичная загрузка', label: 'Частичная загрузка' },
  { value: 'Негабаритная', label: 'Негабаритная' },
]

export const typeLoading: Option[] = [
  { value: 'Не знаю', label: 'Не знаю' },
  { value: 'Верхняя', label: 'Верхняя' },
  { value: 'Задняя', label: 'Задняя' },
  { value: 'Боковая', label: 'Боковая' },
]

export const paymentMethod: Option[] = [
  { value: 'Наличный расчет', label: 'Наличный расчет' },
  { value: 'Безналичный расчет', label: 'Безналичный расчет' },
  { value: 'Оплата картой', label: 'Оплата картой' },
]

export const paymentProcedure: Option[] = [
  { value: 'Предоплата', label: 'Предоплата' },
  { value: 'Оплата по факту', label: 'Оплата по факту' },
  { value: 'Поэтапная оплата', label: 'Поэтапная оплата' },
]

export const workExperience: Option[] = [
  { value: 'Менее года', label: 'Менее года' },
  { value: '1 год', label: '1 год' },
  { value: '2 года', label: '2 года' },
]

export const leaseTerm: Option[] = [
  { value: 'На час', label: 'На час' },
  { value: 'На день', label: 'На день' },
]

export const serviceSpecialization: Option[] = [
  { value: 'Заказные перевозки', label: 'Заказные перевозки' },
  { value: 'Перевозка детей', label: 'Перевозка детей' },
]

export const options: Option[] = [
  { value: 'Аудио система и микрофон', label: 'Аудио система и микрофон' },
  { value: 'Кондиционер', label: 'Кондиционер' },
]

export const amenities: Option[] = [
  { value: 'Эконом класса', label: 'Эконом класса' },
  { value: 'Стандартный', label: 'Стандартный' },
  { value: 'Комфортабельный', label: 'Комфортабельный' },
]

export const vehicleClass: Option[] = [
  { value: 'Минивэн (до 10)', label: 'Минивэн (до 10)' },
  { value: 'Малый (12-18)', label: 'Малый (12-18)' },
  { value: 'Средний (20-25)', label: 'Средний (20-25)' },
]

export const minimumOrderTime: Option[] = []
