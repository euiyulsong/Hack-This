/*
LOCAL STORAGE
This is synced to the Redux store
Changes to Redux data are directly reflected by local storage
This allows app data to persist through multiple sessions
*/
function saveState (state) {
  chrome.storage.local.set({ state: JSON.stringify(state) })
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState)
    store.subscribe(() => {
      const state = store.getState()
      saveState(state)
    })
    return store
  }
}
