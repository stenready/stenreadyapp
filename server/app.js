const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

/**api */
const apiPosts = require('./routes/api/posts')

const app = express()


/**middlewars */
app.use(bodyParser.json())
app.use(cors())


/**routes start */
app.use('/api/posts', apiPosts)


  app.use( express.static(__dirname + '/public/'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))



/**start server */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})


