import { createStore } from 'redux'

const initialState = {
  firstName: '',
  email: '',
  phone: '',
  password: '',
}

function formReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PHONE':
      return { ...state, phone: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    default:
      return state
  }
}

const store = createStore(formReducer)

export default store
