/*
REDUX REDUCERS
Each reducer is a node in state that can be altered
*/
import { combineReducers } from 'redux'
import { firebaseReducer as db } from 'react-redux-firebase'
import tab from '../ducks/tab'
import pages from '../ducks/pages'
import groups from '../ducks/groups'
import editor from '../ducks/editor'
import config from '../ducks/config'

export default combineReducers({
  db,
  tab,
  pages,
  groups,
  editor,
  config
})
