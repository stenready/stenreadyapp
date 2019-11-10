<template>
    <div class="container">
      <div v-if="load"  id="spinner"></div>
      <div class="row">
        <div class="col-md-8 mx-auto">
          <h1 class="mb-4">Все посты:</h1>
            <div class="add-post d-flex">
              <input v-model="title" class="form-control form-control-sm" type="text" placeholder="введите заглавие новости">
              <input v-model="text" class="form-control form-control-sm" type="text" placeholder="текст новости">
              <button @click="createPost" class="btn btn-primary">Добавить пост</button>
            </div>
          <div class="posts">
            <div class="card" v-for="(element) of posts" :key="element._id">
              <div class="card-body">
                <div v-if="!element.edition" class="wrap-post">
                  <p class="text-secondary"><small> {{ computeDate(element) }} </small></p>
                  <h4 class="d-block">{{element.title}}</h4>
                  <p>{{element.text}}</p>
                </div>
                <div v-else class="wrap-edit">
                    <input v-model="element.title"  class="form-control form-control-sm" type="text" placeholder="введите заглавие новости">
                    <input v-model="element.text"  class="form-control form-control-sm" type="text" placeholder="текст новости"> 
                    <button @click="save(element)" class="btn btn-success btn-sm">Сохранить</button>
                    <button @click="canselEdit(element)" type="button" class="btn btn-danger btn-sm">Отмена</button>
                </div>
              </div>
              <div class="body-wrap">
                <button v-if="!element.edition" @click="deletePost(element._id)" type="button" class="btn btn-primary btn-sm">remove</button>
                <button v-if="!element.edition" @click="editFunc(element)" type="button" class="btn btn-primary btn-sm">edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PostServise from  '../PostsServise'
export default {
  name: 'PostComponent',
  data(){
    return {
      posts: [],
      text: '',
      title: '',
      load: false,
    }
  },
  async created(){
    try {
      let posts =  await PostServise.getPosts()
      this.posts = posts
    } catch (err) {
      this.err = err.message
    }
  },
  methods: {
    async save(element){
        this.load = !this.load
        if( element.title === '' || element.text === '' ) {
          element.title = element.cashe[0]
          element.text = element.cashe[1]
        }
        if(element.title === element.cashe[0] && element.text === element.cashe[1]) {
          this.load = !this.load
          element.edition = !element.edition
        } else {
          await PostServise.update(element._id, element.title, element.text)
          this.posts = await PostServise.getPosts()
          this.load = !this.load
          element.edition = !element.edition  
        }
    },
    editFunc(element){
      element.cashe[0] = element.title
      element.cashe[1]= element.text
      element.edition = !element.edition
    },
    canselEdit(element){
      element.title = element.cashe[0]
      element.text = element.cashe[1]
      element.edition = !element.edition 
    },
    computeDate(date){
      let myDate = date.createdAt.getDate()
      let myMonth = date.createdAt.getMonth() + 1
      let myYears = date.createdAt.getFullYear()
      let myHours = date.createdAt.getHours()
      let minutes = date.createdAt.getMinutes()
      myHours = ('0' + myHours).slice(-2)
      minutes = ('0' + minutes).slice(-2)
      return `Время публикации: ${myDate}.${myMonth}.${myYears} в ${myHours}.${minutes}`
    },
     async createPost(){
      if( this.title && this.text ) {
        this.load = !this.load
        await PostServise.insertOne(this.title, this.text)
        PostServise.getPosts()
        .then( data => {
          this.load = !this.load
          this.posts = data
          this.title = ''
          this.text = ''
        } )
      }
    },
     async deletePost(id){
      this.load = !this.load
      await PostServise.deletePost(id)
      PostServise.getPosts()
        .then( data => {
          this.load = !this.load
          this.posts = data
        } )
      
    }
  }
  
}
</script>


<style scoped>
.card{
  margin-bottom: 10px;
}
.add-post{
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}
.form-control{
  width: 49%;
  margin-bottom: 10px;
}
.btn-sm{
  max-width: 100px;
  margin: 0 0 15px 20px;
}
#spinner:not([hidden]) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: #000000;
  opacity: 0.3;
  z-index: 1000000;
  align-items: center;
}

#spinner::after {
  content: "";
  width: 80px;
  height: 80px;
  border: 2px solid #f3f3f3;
  border-top: 3px solid #f25a41;
  border-radius: 100%;
  will-change: transform;
  animation: spin 1s infinite linear
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
