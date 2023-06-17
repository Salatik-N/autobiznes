import { useEffect, useState } from 'react'
import { client } from '../../lib/apollo'
import Container from '../../components/Container'
import { GET_USER_INFO } from '../../lib/api'

export default function Account() {
  const [user, setUser] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordCheck, setNewPasswordCheck] = useState('')
  const [passwordСorrect, setPasswordСorrect] = useState(false)

  const getTransportInfo = async () => {
    const responseUser = await client.query({
      query: GET_USER_INFO,
    })
    setUser(responseUser?.data?.viewer)
  }
  useEffect(() => {
    if (newPasswordCheck === '') return
    newPassword === newPasswordCheck ? setPasswordСorrect(true) : setPasswordСorrect(false)
  }, [newPassword, newPasswordCheck])

  const changePassword = () => {}

  return (
    <Container>
      <h2>Личный кабинет</h2>
      <button onClick={() => getTransportInfo()}>Меню кабинета</button>
      <div className="white-background">
        <span>Изменение пароля</span>
        <form onSubmit={changePassword} autoComplete="on">
          <div>
            <label>Текущий пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Введите текущий пароль"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Новый пароль </label>
            <input
              type="password"
              name="password"
              placeholder="Пароль минимум из 8 символов"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Повторите новый пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Пароль минимум из 8 символов"
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
            />
            {!passwordСorrect && 'Пароли не совпадают'}
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </Container>
  )
}
