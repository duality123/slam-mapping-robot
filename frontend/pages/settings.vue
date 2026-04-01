<template>
    <NuxtLayout name="base">
    
            <div class="container-fluid text-white mt-4  p-4">
                  <ul class="d-flex justify-content-start bd-highlight mb-3">
                    <li class="p-2"><NuxtLink :to="`/home-admin`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" class="me-3"/>Home</NuxtLink></li>
                    <li class="p-2">/</li>
                    <li class="p-2"><NuxtLink :to="`/settings`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gears']" class="me-3"/>Settings</NuxtLink></li>
                    </ul>
                <h3>MQTT Connection</h3>
<form  @submit.prevent="submit">
    <div class="mb-3 mt-3">
      <label for="text" class="form-label">Hostname:</label>
      <input type="text" class="form-control" id="host" v-model="this.creds.host" placeholder="Masukkan host" >
      <small v-if="this.creds['errors']['host']" class="text-danger text-small">{{ this.creds['errors']['host']}}</small>
    </div>
    <div class="mb-3">
      <label for="pwd" class="form-label">Port:</label>
      <input type="number" class="form-control" id="port" v-model="this.creds.port" placeholder="Masukkan port">
      <small v-if="this.creds['errors']['port']" class="text-danger text-small">{{ this.creds['errors']['port']}}</small>
    </div>
    <div class="mb-3">
        <label for="pwd" class="form-label">Username:</label>
        <input type="text" class="form-control" id="username" v-model="this.creds.username" placeholder="Masukkan username">
        <small v-if="this.creds['errors']['username']" class="text-danger text-small">{{ this.creds['errors']['username']}}</small>
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Password:</label>
        <input type="password"  class="form-control" id="password" v-model="this.creds.password" placeholder="Masukkan password" >
        <small v-if="this.creds['errors']['password']" class="text-danger text-small">{{ this.creds['errors']['password']}}</small>
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Topic:</label>
        <input type="text"  class="form-control" id="password" v-model="this.creds.topic" placeholder="Masukkan password" >
        <small v-if="this.creds['errors']['topic']" class="text-danger text-small">{{ this.creds['errors']['topic']}}</small>
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">TLS Cert:</label>
        <p id="ssl">{{ this.certname }}</p>
        <input type="file" @change="this.changeTLS($event)"  class="mt-2" id="input">
        <small v-if="this.creds['errors']['tls']" class="text-danger text-small">{{ this.creds['errors']['tls']}}</small>
      </div>
      <div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" v-model="this.creds.no_tls" id="flexCheckIndeterminate">
  <label class="form-check-label" for="flexCheckIndeterminate">
    Tanpa TLS
  </label>
</div>
    <button type="submit" class="btn btn-primary" >Submit</button>
  </form>
  <div class="mt-4 mb-3">
    <button @click="reset_con()" class="btn btn-danger" >Reset Connection</button>
</div>
        </div>
    </NuxtLayout>
    </template>
    <script >
    import { messageStore }  from "~/stores/message";
    import { userStore }  from "~/stores/user";
    import { windowStore }  from "~/stores/window";
    export default{
      data(){
        return{
          creds:{host:"",port:"",username:"",password:'',tls:"",topic:"",no_tls:false,errors:{}},
          certname:null,
          test:"FU",
          user:userStore(),
          message:messageStore()
        }
      },
      setup(){
      },
      async mounted(){
        definePageMeta({
          middleware: ['auth']
        })
        await this.fetchCon()
        },
      watch:{
        'creds.no_tls': {
          handler: function (after, before) {
              if(after){
                this.creds.tls=""
                this.certname = ""
              }
          },
          deep: true
        }
      },
        methods:{
          async fetchCon(){
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/settings`, {
              headers: {
                      "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'GET'
            })
              .then(response => {
                var data = response
                windowStore().loading=false
                this.creds.host=data.host
                this.creds.port=data.port
                this.creds.username=data.username
                this.creds.password=data.password
                this.certname=data.tls
                this.creds.topic=data.topic
                if(this.certname == ""){
                  this.creds.no_tls= true
                }
              })

              .catch(error => {
                if(error.status==403){
                    if(this.user.userData.roles==[1]){
                      return navigateTo("/home-admin")
                    }
                    else if(this.user.userData.roles==[2]){
                      return navigateTo("/home")
                    }
                    else{
                      return navigateTo("/login")
                    }
                  }
              })
          },
          async reset_con(){
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/reset_con`, {
              headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'POST',
            })
              .then(response => {
                this.message.base_flash('success',"Setting berhasil direset!")
                window.scrollTo(0,0)
              })

              .catch(error => {
                console.log(error.data)
                this.creds['errors'] = error.data
                this.message.base_flash('error',"Ada kesalahan, pastikan kredensial anda benar!")
                window.scrollTo(0,0)
              })
          },
          async submit(){
            const data = new FormData();
            data.append('host',this.creds.host)
            data.append('port',this.creds.port)
            data.append('username',this.creds.username)
            data.append('password',this.creds.password)
            data.append('tls',this.creds.tls)
            data.append('topic',this.creds.topic)
            data.append('no_tls',this.creds.no_tls)
            console.log(this.creds.no_tls)
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/settings`, {
              headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'POST',
              body:data
            })
              .then(response => {
                this.message.base_flash('success',"Setting berhasil direset!")
                this.creds['errors']={}
                var data = response
                this.creds.host=data.host
                this.creds.port=data.port
                this.creds.username=data.username
                this.creds.password=data.password
                this.certname=data.tls
                this.creds.topic=data.topic
                if(this.certname == ""){
                  this.creds.no_tls= true
                }
                this.message.base_flash('success',"Setting berhasil diubah!")
                window.scrollTo(0,0)
              })

              .catch(error => {
                console.log(error)
                this.creds['errors'] = error
                this.message.base_flash('error',"Ada kesalahan, pastikan kredensial anda benar!")
                window.scrollTo(0,0)
              })
          },
        changeTLS(event){
          this.certname= event.target.files[0].name
          this.creds.tls= event.target.files[0];
          this.creds.no_tls= false
          console.log(this.creds.tls)
        }
      },

    }
    </script>
    <style scoped>
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    li{
      cursor:pointer;
    }
    </style>