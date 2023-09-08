import Container from '../../components/Container'
import ListNavigation from '../../components/ListNavigation'
import CargoItem from '../../components/CargoItem'
import { initializeApollo } from '../../lib/apollo'
import { GET_USER_INFO } from '../../lib/api'
import { useEffect, useState } from 'react'
import AccountHeader from '../../components/AccountHeader'
import AccountMenu from '../../components/AccountMenu'

export default function Cargos() {
  const [modalActive, setModalActive] = useState(false)
  const [cargoList, setCargoList] = useState(null)
  const apolloClient = initializeApollo()

  useEffect(() => {
    async function getUser() {
      const responseUser = await apolloClient.query({
        query: GET_USER_INFO,
      })
      setCargoList(responseUser?.data?.viewer?.cargos)
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
            <div className="white-background">Мои грузы</div>
            {cargoList ? (
              <>
                <div className="cargo-list">
                  <CargoItem cargos={cargoList} isActiveAdminTools />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  )
}
