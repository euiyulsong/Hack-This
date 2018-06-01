import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import get from 'lodash/get'

import Inspector from 'react-json-view'

@connect(
  (state, props) => {
    // Connect to the page reducer, which contains page analysis.
    // Failing that, use raw page/tab data instead - this is scraped onAppStart
    const tabRecord = get(state, ['pages', props.tab, 'analysis'], [])
    const analysis = Object.keys(tabRecord).map(scriptID => tabRecord[scriptID])
    return {
      analysis,
      inspectorConfig: state.config.inspector,
      activeSection: state.config.view === 'dashboard'
    }
  }
)
class Report extends Component {
  static propTypes = {
    analysis: PropTypes.array
  }
  static defaultProps = {
    analysis: []
  }
  render (
    { analysis, activeSection, inspectorConfig } = this.props
  ) {
    console.log('ACTIVE:', activeSection)
    return (
      <div>
        {analysis && analysis.map(script => (
          <Card key={script.id} style={{ marginBottom: 8 }}>
            <CardHeader
              title={`${script.name} | Version ${script.version || 1} by ${script.author || 'you!'}`}
              subtitle='Subtitle'
              actAsExpander
              showExpandableButton
            />
            <CardText expandable style={{ paddingTop: 0 }}>
              <pre><code>{script.code}</code></pre>
            </CardText>
            {activeSection &&
              <Inspector
                style={{ paddingTop: 0 }}
                src={script.output}
                name={null}
                collapsed={Object.keys(script.output).length >= 20}
                iconStyle='square'
                {...inspectorConfig}
              />
            }
          </Card>
        ))}
      </div>
    )
  }
}
export default Report
