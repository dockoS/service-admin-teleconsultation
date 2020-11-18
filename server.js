const app = require('./app');
const config = require('config')

const port = process.env.PORT || 3000

const server = app.listen(port, () => {if(config.get('tag') !=='test') console.log(`Listening on port ${port} in ${config.get('tag')} environment...`)})

module.exports = server