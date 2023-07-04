import Meta from './Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      {children}
      <Footer />
    </>
  )
}
