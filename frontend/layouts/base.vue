<template>
<head>
    <meta charset="utf-8">
    <title>SAMBA</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
</head>
<header >
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav" aria-label="Ninth navbar example">
    
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><h1 class="log">Coba2 {{workspace}}</h1></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dropdown" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="dropdown">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 navmobile">
          <li v-if="this.userInstance.userData">
            <NuxtLink @click="logout()" class="nav-link text-white "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'right-to-bracket']" class="me-3" />Log out</NuxtLink>
          </li>
        </ul>
        
      </div>
     <button v-if="this.userInstance.userData" @click="logout()" class="nav-link text-white log "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'right-to-bracket']" class="me-3" />Log out</button>
    </div>
  </nav>

  </header>
    <body>
      <div v-if="this.window.loading" class="d-flex container-fluid mt-4 bd-highlight mb-3 justify-content-center">
        <div class=" justify-content-center">
          <div class="spinner-border text-secondary justify-content-center" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        </div>

            <div v-else class="d-flex row  bd-highlight mb-3">
              <div v-if="message.base_status.success||message.base_status.warning||message.base_status.error" class=" container-fluid mt-4 p-4">
              <div v-if="message.base_status.success" class="d-flex p-4 bd-highlight alert alert-success">
            <div class="p-2 flex-grow-1 bd-highlight">{{message.base_status.success}}</div>
            <div class="p-2 bd-highlight"><span @click="close_base()" aria-hidden="true">&times;</span></div>
          </div>
          <div v-if="message.base_status.warning" class="d-flex p-4 bd-highlight alert alert-warning">
            <div class="p-2 flex-grow-1 bd-highlight">{{message.base_status.warning}}</div>
            <div class="p-2 bd-highlight"><span @click="close_base()" aria-hidden="true">&times;</span></div>
          </div>
          <div v-if="message.base_status.error" class="d-flex p-4 bd-highlight alert alert-danger">
            <div class="p-2 flex-grow-1 bd-highlight">{{message.base_status.error}}</div>
            <div class="p-2 bd-highlight"><span @click="close_base()" aria-hidden="true">&times;</span></div>
          </div>
        </div>
            <slot/>
            </div>
<!-- Content End -->
</body>
</template>
<script>
  import { storeToRefs }  from "pinia";
  import { userStore } from "~/stores/user";
  import { windowStore } from "~/stores/window";
  import { messageStore } from "~/stores/message";
  import Sidebar from "../components/Sidebar"
  import Navbar from "../components/Navbar"

export default{
  data(){
      return{
        userInstance:userStore(),
        message: messageStore(),
        route:useRoute(),
        fixed:false,
        window:windowStore()
      }
  },
    async created() {
      window.addEventListener("scroll", this.onScroll)
      
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll)
    },
  methods:{
      switchMinimize(){
        this.window.minimize=!this.window.minimize
        if(this.window.width=='35vh'){
          this.window.width='10vh'
          
        }
        else{
          this.window.width='35vh'
        }
      },
      logout(){
        userStore().logout()
        navigateTo('/login')
      },
      onScroll(e) {
        let windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
        console.log(windowTop)
        if(windowTop > 0){
          var element = document.getElementById("nav");
          element.classList.add("fixed-top");
        }
        else{
          var element = document.getElementById("nav");
          element.classList.remove("fixed-top");
        }
      },
      logout(){
        this.userInstance.logout()
        return navigateTo("/login")
      },
      close_base(){
        this.message.base_reset()
      }
    },
    components:{
      Sidebar,
      Navbar
    },
    props:{
      workspace:String
    }
}

</script>
<style scoped>
a{
  color: #f1f1f1!important;
}
.active{
  background-color:royalblue!important;
  color: #f1f1f1!important;
  width: 500px;
}
</style>
<style >
a{
  color: #f1f1f1!important;
  list-style: none;
  border: none;
  text-decoration: none;
}
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
  margin-top: 5rem;
}

.sidenav a {
  text-decoration: none;
  font-size: 15px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}
a{
            
            cursor:pointer;
          }
.navmobile{
  display: none;
}
#sidebar{
  display: block;
 }
@media (max-width: 600px) {
 #sidebar{
  display: none!important;
 }
 .log{
  display: none;
}
 .navmobile {
  display: block;
}
}
</style>