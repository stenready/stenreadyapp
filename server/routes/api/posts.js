const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

/**GET   получаем все посты*/   
router.get('/', async (req, res)=>{ 
    const posts = await load('express_app', 'posts')
    res.send( await posts.find({}).toArray())
})
/**POST    отправляем пост*/
router.post('/', async (req, res)=>{ 
    const posts = await load('express_app', 'posts')
    await posts.insertOne({
        title: req.body.title,
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})
/**DELETE   удаляем пост*/
router.delete('/:id', async (req, res) => {
    const posts = await load('express_app', 'posts')
    await posts.deleteOne({ _id:  mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

/**GET BY ID    получаем один пост по id*/
router.get('/:id', async (req, res) => {
    const posts = await load('express_app', 'posts')
    res.status(200).send(await posts.findOne({ _id: mongodb.ObjectID(req.params.id) }))
})

router.post('/update/:id', async (req, res) =>{
    const posts = await load('express_app', 'posts')
    await posts.updateOne({ _id:  mongodb.ObjectID(req.params.id)}, { $set: {title: req.body.title, text: req.body.text, createdAt: new Date()} })
    res.status(200).send()
})



async function load(db, table){

    try {
      /**подключение к базе данных */
      const password = 'mpsfDANDcAVVNaLC'
      const  url = `mongodb+srv://sten_ready:${password}@cluster0-xmheq.mongodb.net/`
      const client = await mongodb.connect(url, {useNewUrlParser: true})
      return client.db(db).collection(table)
  
    } catch (e) {
      console.log(e)
    }
}


module.exports = router