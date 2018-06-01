/*
BACKGROUND > CONTEXT MENUS
ENVIRONMENT: Chrome Root
Sets event listeners using the chrome API for opening the extension onClick
*/
let windowId = 0
const CONTEXT_MENU_ID = 'security_extension_context_menu'

function closeIfExist () {
  if (windowId > 0) {
    chrome.windows.remove(windowId)
    windowId = chrome.windows.WINDOW_ID_NONE
  }
}

function popWindow (type) {
  closeIfExist()
  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 800,
    height: 475
  }
  if (type === 'open') {
    options.url = 'window.html'
    chrome.windows.create(options, (win) => {
      windowId = win.id
    })
  }
}

chrome.contextMenus.create({
  id: CONTEXT_MENU_ID,
  title: 'Hack This',
  contexts: ['all'],
  documentUrlPatterns: ['<all_urls>']
})

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === CONTEXT_MENU_ID) {
    popWindow('open')
  }
})
