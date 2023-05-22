import { useState } from 'react'
import Container from './Container'
import styles from './FAQ.module.scss'

export default function FAQ() {
  const faqs = [
    {
      title: 'test',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      title: 'test2',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
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
