import React, { Component } from 'react'

import Editor from './Editor'
import Output from './Output'
import Execute from './Execute'

/*
IDE VIEW:
Provides an interactive dev environment,
complete w/ docs for users to compose their own snippets.
*/
import '../../styles/IDE.css'
class IDE extends Component {
  render () {
    return (
      <article id='IDE'>
        <Editor />
        <Output />
        <Execute />
      </article>
    )
  }
}
export default IDE
