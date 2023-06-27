import Container from '../../components/Container'
import ListNavigation from '../../components/ListNavigation'
import CargoItem from '../../components/CargoItem'
import { client } from '../../lib/apollo'
import { GET_USER_INFO } from '../../lib/api'
import { useEffect, useState } from 'react'
import AccountHeader from '../../components/AccountHeader'

export default function Cargos() {
  const [modalActive, setModalActive] = useState(false)
  const [cargoList, setCargoList] = useState(null)
  useEffect(() => {
    async function getUser() {
      const responseUser = await client.query({
        query: GET_USER_INFO,
      })
      setCargoList(responseUser?.data?.viewer?.cargos)
    }
    getUser()
  }, [])

  return (
    <Container>
      <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
      <div className="white-background">Мои грузы</div>
      {cargoList ? (
        <>
          <div className="cargo-list">
            <CargoItem cargos={cargoList} />
          </div>
          <ListNavigation />
        </>
      ) : null}
    </Container>
  )
}
