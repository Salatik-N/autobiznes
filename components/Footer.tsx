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
              <span className={styles.copyrightText}>2016–2024 © Белорусский интернет-портал «Автобизнес.бай»</span>
              <div className={styles.copyrightLinks}>
                <Link href="/">Пользовательское соглашение</Link> | <Link href="/">Политика конфиденциальности</Link>
              </div>
            </div>
            <div className={styles.metricsBlock}>
              <div>
                <a href="https://metrika.yandex.ru/stat/?id=94709793&amp;from=informer" target="_blank" rel="nofollow">
                  <img
                    src="https://informer.yandex.ru/informer/94709793/3_1_EFEFEFFF_EFEFEFFF_0_pageviews"
                    alt="Яндекс.Метрика"
                    title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                    className="ym-advanced-informer"
                    data-cid="94709793"
                    data-lang="ru"
                  />
                  <style jsx>{`
                    width: '88px';
                    height: '31px';
                    border: 0;
                  `}</style>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(94709793, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
        }}
      ></script>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/94709793" style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  )
}
