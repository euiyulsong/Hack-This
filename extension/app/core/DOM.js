/*
DOCUMENT OBJECT MODEL (DOM) MANIPULATOR
ENVIRONMENT: Background (but it traverses environments)

DOM - Used to interact with raw pages
Serves as the interface between the popup DOM and content DOM

Usage:
  type: 'script' | 'import'
  code: the data (script code, import URLs, etc)
*/

/*
RAW_DOM_INJECTION: XSS script injection
circumvents Chrome's isolated world / content script DOM, which has limited permissions
NOTE: This may be wrapped in string literals, so don't use `these`

FLOW EXPLAINED:
- BACKGROUND (extension) creates event messages w/ the CONTENT SCRIPT (which has limited RAW DOM access)
- Background sends a script for execution

- CONTENT Define an event listener based on the script ID (conflictless)

- Initialize a script tag with injection code to run in the RAW DOM
  - Begin with an async function wrapper
  - Promisify the script code
    - Await RETURN or REJECT
  - Create and dispatch an event listener, passing the promise return value
- Inject the script, which executes immediately
- Remove the script tag to hide the evidence.

- Function executes in RAW DOM, dispatches event, then falls out of scope. Poof.

- Event listener passes a message back the the BACKGROUND, our extension.
*/
// Verified syntax and functionality 5/15/18 4:08PM
export const RAW_DOM_INJECTION = `
  function RAW_DOM_INJECTION (script = {}) {
  return new Promise((resolve, reject) => {
    try {
      /* EXECUTION ENVIRONMENT: RAW DOM -> CONTENT SCRIPT */
      window.addEventListener(script.id, (e) => {
        /* EXECUTION ENVIRONMENT: CONTENT SCRIPT -> BACKGROUND (EXTENSION) */
        const { detail } = e
        resolve(detail)
      }, { once: true })
      /* EXECUTION ENVIRONMENT: CONTENT SCRIPT -> RAW DOM */
      const element = document.createElement('script')
      element.textContent = '(async function () {' +
        'const execution = () => new Promise((RETURN, ERROR) => { ' + script.code + ' });' +
        'let response = await execution();' +
        'var event = document.createEvent("CustomEvent");' +
        'event.initCustomEvent("' + script.id + '", true, true, response);' +
        'window.dispatchEvent(event);' +
      '})();';
      /* EXECUTION ENVIRONMENT: CONTENT SCRIPT -> RAW DOM */
      (document.head || document.documentElement).appendChild(element)
      element.parentNode.removeChild(element)
    } catch (ERROR) {
      console.error(ERROR)
      resolve({ ERROR })
    }
  })
}
`
export default RAW_DOM_INJECTION
/*
//  How to do this with executeScript in case we need to:
export const executeScript = (id, code) => {
  return function (dispatch) {
    // const test = 'return document.code.innerHTML;'
    try {
      chrome.tabs.executeScript(
        { code: `(function(params) { ${code} })();` },
        (output) => {
          dispatch({ type: EXECUTE_SCRIPT, id, output: output[0] || output })
        }
      )
    } catch (err) {
      console.error(err)
    }
  }
}
*/
