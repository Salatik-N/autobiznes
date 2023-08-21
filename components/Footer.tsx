import Container from './Container'
import Link from 'next/link'
import Image from 'next/image'
import walletIcon from '../public/icons/wallet.svg'
import adIcon from '../public/icons/ad.svg'
import charterIcon from '../public/icons/charter.svg'
import styles from './Footer.module.scss'
import FooterNav from './FooterNav'
import SocialIcons from './SocialIcons'
import logo from '../public/icons/logo.svg'

export default function Footer() {
  return (
    <>
      <footer className={styles.siteFooter}>
        <hr className="separator-black" />
        <Container>
          <div className={styles.blockAdvantages}>
            <div className={styles.advantagesItem}>
              <Image src="/icons/truck.svg" alt="Транспорт" width={100} height={100} />
              Весь транспорт на одном сайте
            </div>
            <div className={styles.advantagesItem}>
              <Image src={walletIcon} alt="Кошелек" />
              Лучшие цены без посредников
            </div>
            <div className={styles.advantagesItem}>
              <Image src={adIcon} alt="Объявление" />
              Актуальные объявления
            </div>
            <div className={styles.advantagesItem}>
              <Image src={charterIcon} alt="Грамота" />
              Проверенные арендодатели
            </div>
          </div>
        </Container>
        <div className={styles.mainInformation}>
          <Container>
            <div className={styles.topFooter}>
              <div className={styles.logo}>
                <Link href="/">
                  <Image src={logo} alt="Логотип" />
                </Link>
              </div>
              <div className={styles.buttonsBlock}>
                <div className={styles.buttonItem}>
                  <span>Для заказчиков</span>
                  <Link href="/account/add-cargo" className={styles.madeOrder}>
                    Оставить заказ
                  </Link>
                </div>
                <div className={styles.buttonItem}>
                  <span>Для владельцев</span>
                  <Link href="/account/add-transport" className={styles.addAdvert}>
                    Добавить объявление
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.menu}>
              <FooterNav />
            </div>
            <SocialIcons />
            <div className={styles.copyright}>
              При копировании материалов установка ссылки на официальный сайт обязательна.
            </div>
          </Container>
        </div>
        <Container>
          <div className={styles.blockCopyright}>
            <div>
              <span className={styles.copyrightText}>2016–2023 © Белорусский интернет-портал «Автобизнес.бай»</span>
              <div className={styles.copyrightLinks}>
                <Link href="/">Пользовательское соглашение</Link> | <Link href="/">Политика конфиденциальности</Link>
              </div>
            </div>
            <div className={styles.metricsBlock}>
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
