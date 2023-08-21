import { useState } from 'react'
import Container from './Container'
import styles from './FAQ.module.scss'

export default function FAQ() {
  const faqs = [
    {
      title: 'Забыл пароль',
      text: 'Для восстановления пароля нажмите на кнопку «Вход» и кликните «Забыли пароль?». На адрес электронной почты, указанной при регистрации, придет уведомление о успешной регистрации.',
    },
    {
      title: 'Не пришел пароль для входа на email',
      text: 'Проверьте папки «Спам» и «Рассылки».',
    },
    {
      title: 'Как зарегистрироваться на сайте?',
      text: `1. Для регистрации на сайте необходимо нажать на кнопку «Регистрация» и ввести имя, адрес электронной почты и свой уникальный пароль. 2. После успешной регистрации, необходимо нажать на кнопку «Войти», ввести свой адрес электронной почты и пароль.`,
    },
    {
      title: 'Стоимость услуг сайта Autobiznes.by',
      text: 'Сайт является полностью бесплатным как для грузоотправителей, так и для грузоперевозчиков.',
    },
    {
      title: 'Как разместить груз / транспорт на сайте?',
      text: ' 1.	Для размещения груза нажмите на вкладку «Добавить заказ/груз» в личном кабинете и заполните необходимую информацию о грузе. 2. Для размещения транспорта нажмите на вкладку «Добавить технику» в личном кабинете и заполните необходимую информацию о транспорте. 3. При необходимости отредактируйте опубликованные заявки в разделах «Ваш заказ/груз» и «Ваша техника»',
    },
    {
      title: 'Как найти груз / транспорт?',
      text: 'Осуществлять поиск грузов или транспорта можно несколькими способами: 1.	Для поиска грузов необходимо перейти во вкладку «Грузы» и введите необходимые параметры поиска груза 2.	Для поиска транспорта необходимо перейти во вкладку «Транспорт» и введите необходимые параметры поиска техники.',
    },
  ]
  const [activeIndex, setActiveIndex] = useState(null)

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className={styles.faqBlock}>
      <Container>
        <h3>Часто задаваемые вопросы</h3>
        <div className={styles.inner}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.item} white-background ${activeIndex === index ? `${styles.active}` : ''}`}
              onClick={() => handleClick(index)}
            >
              <div className={styles.title}>
                {faq.title}
                <div className={styles.icon}></div>
              </div>
              {activeIndex === index && <p className={styles.text}>{faq.text}</p>}
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
