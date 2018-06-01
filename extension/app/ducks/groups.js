/*
GROUPS DUCK:
Keeps track of groups of scripts that can be run as batch jobs
*/

/*
CONSTANTS
*/
const ADD_GROUP = 'ADD_GROUP'
const DELETE_GROUP = 'DELETE_GROUP'
const EDIT_GROUP = 'EDIT_GROUP'

/*
ACTIONS
*/
export const addGroup = (text) => ({ type: ADD_GROUP, text })
export const deleteGroup = (id) => ({ type: DELETE_GROUP, id })
export const editGroup = (id, text) => ({ type: EDIT_GROUP, id, text })

/*
REDUCER
*/
const initialState = [{
  text: 'Redux',
  id: 0
}]

const actionsMap = {
  [ADD_GROUP] (state, action) {
    return [{
      id: state.reduce((maxId, group) => Math.max(group.id, maxId), -1) + 1,
      text: action.text
    }, ...state]
  },
  [DELETE_GROUP] (state, action) {
    return state.filter(group =>
      group.id !== action.id
    )
  },
  [EDIT_GROUP] (state, action) {
    return state.map(group =>
      (group.id === action.id
        ? Object.assign({}, group, { ...action })
        : group
      )
    )
  }
}

export default function groups (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
