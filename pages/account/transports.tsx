import Container from '../../components/Container'
import ListNavigation from '../../components/ListNavigation'
import TransportItem from '../../components/TransportItem'
import { initializeApollo } from '../../lib/apollo'
import { GET_USER_INFO } from '../../lib/api'
import { useEffect, useState } from 'react'
import AccountHeader from '../../components/AccountHeader'

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
    <Container>
      <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
      <div className="white-background">Мой транспорт</div>
      {transportList ? (
        <>
          <div className="cargo-list">
            <TransportItem active={{ id: 0 }} transports={transportList} />
          </div>
          <ListNavigation />
        </>
      ) : null}
    </Container>
  )
}
