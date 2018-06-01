/*
MATERIAL-UI THEME:
Allows you to use JSS to override base styles for ALL components
These styles are accessed by children via React Context.

https://www.material-ui.com/#/customization/themes
*/
//  Run getMuiTheme here to prevent unnecessary rerenders in App.js
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

//  Single instance created then exported
const Theme = getMuiTheme(
  Object.assign({}, lightBaseTheme, {})
)
export default Theme
