import Image from 'next/image'
import styles from './Benefits.module.scss'
import Container from './Container'
import benefitsFirst from '../public/icons/benefits-first.svg'
import benefitsSecond from '../public/icons/benefits-second.svg'
import benefitsThird from '../public/icons/benefits-third.svg'

export default function Benefits() {
  return (
    <div className={styles.benefits}>
      <Container>
        <div className={styles.blockTitle}>
          <span className="h3">Автобизнес.бай - сервис поиска грузов и услуг перевозчиков</span>
          <p>
            «Автобизнес.бай» на рынке с 2016 года. С нами легко найти груз и организовать грузовую или пассажирскую
            автоперевозку. От нас поток клиентских заявок, от вас только желание зарабатывать
          </p>
        </div>
        <div className={styles.inner}>
          <div className={styles.benefitsItem}>
            <Image src={benefitsFirst} alt="Бесплатная публикация объявления" />
            <span className="h3">Бесплатная публикация объявления</span>
            <p>
              Наш сервис является полностью бесплатным для пользователей, зарегиструйтесь на сайте и пользуйтесь всеми
              преимуществами “Автобизнес.бай”!
            </p>
          </div>
          <div className={styles.benefitsItem}>
            <Image src={benefitsSecond} alt="Удобный и надёжный сервис" />
            <span className="h3">Удобный и надёжный сервис</span>
            <p>
              Нашим сервисом пользуются как физические, так и юридические лица, желанием которых является получение
              качественной услуги. Поскольку «Автобизнес.бай» работает только с проверенными перевозчиками, сервис
              полностью удовлетворяет наших клиентов
            </p>
          </div>
          <div className={styles.benefitsItem}>
            <Image src={benefitsThird} alt="Хороший выбор для тех, кто ищет качество" />
            <span className="h3">Хороший выбор для тех, кто ищет качество</span>
            <p>
              Никаких посредников – контактный телефон владельца транспорта указан в объявлении и доступен без
              регистрации на сайте. Арендовать транспорт или найти груз проще с сайтом «Автобизнес.бай»!
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
