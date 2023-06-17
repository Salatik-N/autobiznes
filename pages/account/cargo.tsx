import Container from '../../components/Container'
import ListNavigation from '../../components/ListNavigation'
import CargoItem from '../../components/CargoItem'
import { client } from '../../lib/apollo'
import { GET_USER_INFO } from '../../lib/api'
import { useEffect, useState } from 'react'

export default function Cargo() {
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
      <h2>Личный кабинет</h2>
      <button>Меню кабинета</button>
      <div className="white-background">Мои заказы/грузы</div>
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
