/*
REDUX STORE
The store is dynamically configured based on the app mode
*/
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod')
} else {
  module.exports = require('./dev')
}
