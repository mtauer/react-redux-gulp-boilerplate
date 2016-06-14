import { combineReducers } from 'redux'

const initialTickState = { tick: 1 }
const rootReducer = combineReducers({
  tickState
})

function tickState(state = initialTickState, action) {
  switch (action.type) {
    case 'INCREMENT_TICK':
      return {
        ...state,
        tick: state.tick + 1,
      }
    default:
      return state
  }
}

export default rootReducer
