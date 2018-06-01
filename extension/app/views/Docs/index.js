import React, { Component, PropTypes } from 'react'

//  UI
import '../../styles/Docs.css'

import { Card, CardTitle, CardText } from 'material-ui/Card'

/*
DOCS VIEW:
Allows users to change app settings, editors, etc.
*/
class Docs extends Component {
  static propTypes = {}
  static defaultProps = {}
  render () {
    return (
      <section id='docs'>
        <Card style={{ marginBottom: 16 }}>
          <CardTitle title='Overview' style={{ paddingBottom: 0 }} />
          <CardText>
            <p>
              Hack This features three panels:
            </p>
            <ul>
              <li><b>Dashboard:</b> View page information</li>
              <li><b>Scripts:</b> Run premade / saved scripts</li>
              <li><b>IDE:</b> Develop and run custom scripts</li>
            </ul>
            <p>
              For the average user, we recommend that you run premade scripts in the Script tab, then inspect the output in Dashboard. Experienced users will find the IDE beneficial, as it allows them to write JavaScript with autocompletion, linting and save functionality.
            </p>
          </CardText>
        </Card>
        <Card style={{ marginBottom: 16 }}>
          <CardTitle title='Writing Scripts' style={{ paddingBottom: 0 }} />
          <CardText>
            <p>
              Scripts are written in JavaScript and execute asynchronously by default, meaning you can make API calls and operations taking significant amounts of time without suffering from race conditions.
            </p>
            <p>
              Hack This's API exposes two global functions: RETURN and ERROR. These functions consume a JSON object and record the resultant output. This could be a payload including page data, an analysis of vulnerabilities found, or a simple success indicator as a boolean.
            </p>
            <p>
              Every script must include RETURN and a JSON object to return, otherwise the script will not run.
            </p>
            <p>
              Scripts will save automatically, even if you close the tab or browser itself.
            </p>
          </CardText>
        </Card>
      </section>
    )
  }
}
export default Docs
