import axios from 'axios'


const url = 'api/posts/'

export default class PostsServise {
    
//GET
static getPosts(){
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(url)
            const data = res.data
            resolve( data.map( post => ({
                ...post,
                createdAt: new Date(post.createdAt),
                edition: false,
                cashe: []
            }) ) )
        } catch (error) {
            reject(error)
        }
    })
}


//CREATE
static insertOne(title, text) {
    return axios.post(url, {
       title,
       text
    })
}

//DELETE
static deletePost(id) {
    return axios.delete(`${url}${id}`)
}
//update
static update(id, title, text) {
    return axios.post(`${url}update/${id}`, {
        title,
        text
    })
}


}

