import Container from '../../components/Container'
import ListNavigation from '../../components/ListNavigation'
import TransportItem from '../../components/TransportItem'
import { initializeApollo } from '../../lib/apollo'
import { GET_USER_INFO } from '../../lib/api'
import { useEffect, useState } from 'react'
import AccountHeader from '../../components/AccountHeader'
import AccountMenu from '../../components/AccountMenu'

export default function Transports() {
  const [modalActive, setModalActive] = useState(false)
  const [transportList, setTransportList] = useState(null)
  const apolloClient = initializeApollo()

  useEffect(() => {
    async function getUser() {
      const responseTransport = await apolloClient.query({
        query: GET_USER_INFO,
      })
      setTransportList(responseTransport?.data?.viewer?.transports)
    }
    getUser()
  }, [])

  return (
    <div className="account-page">
      <Container>
        <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
        <div className="wrapper">
          <div className="menu-big">
            <AccountMenu />
          </div>
          <div className="content">
            <div className="white-background">Мой транспорт</div>
            {transportList && (
              <>
                <div className="transport-list">
                  <TransportItem transports={transportList} isActiveAdminTools />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
