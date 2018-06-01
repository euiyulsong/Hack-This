import React, { Component } from 'react'
import { render } from 'react-dom'
import Dock from 'react-dock'

/*
INJECT.JS
ENVIRONMENT: Background Script
Renders the button and provides the onClick events necessary to open the extension
*/
class InjectApp extends Component {
  constructor (props) {
    super(props)
    this.state = { isVisible: false }
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible })
  };

  render () {
    return (
      <div>
        <button onClick={this.buttonOnClick}>
          Open Hack This
        </button>
        <Dock
          position='right'
          dimMode='transparent'
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%'
            }}
            frameBorder={0}
            allowTransparency='true'
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    )
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div')
  injectDOM.className = 'inject-react-example'
  injectDOM.style.textAlign = 'center'
  document.body.appendChild(injectDOM)
  render(<InjectApp />, injectDOM)
})
