<template>
    <NuxtLayout name="base">
      <GlobalDelete :id="id" :pesan="hapusPesan" url="monitors" @deleteInEmitter="deleteInEmitter" :popup="popupDelete" @toggleClose="switchClose"/>
      <div id="myModal" class="modal" v-if="editModalOn">
          <div class="modal-content-col">
            <div class="d-flex justify-content-end">
              <button @click="switchCloseEdit" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
              <div v-if="this.modalMessage"  class="d-flex justify-content-center">
              <span :class="[this.modalMessage=='Sukses!'?'btn btn-success':'btn btn-danger text-white']">
                {{this.modalMessage}}
                </span>
              </div>
              <form @submit.prevent="editUser">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Name</label>
                  <input v-model="this.editForm['name']"  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="this.editForm['errors']['name']"  class="text-danger text-small">{{ this.editForm['errors']['name'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Username</label>
                  <input v-model="this.editForm['username']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="this.editForm['errors']['username']"  class="text-danger text-small">{{ this.editForm['errors']['username'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Password Baru</label>
                  <input v-model="this.editForm['password']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="this.editForm['errors']['password']"  class="text-danger text-small">{{ this.editForm['errors']['password'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Role</label>
                  <select class="form-select" aria-label="Default select example" @change="changeRole($event,'update')" >
                    <option disabled >Pilih role</option>
                    <option value="1" :selected="admin_edit_selected">Admin</option>
                    <option value="2" :selected="user_edit_selected">User</option>
                  </select>
                  <small v-if="this.editForm['errors']['roles']"  class="text-danger text-small">{{ this.editForm['errors']['roles'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
  
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      <div id="myModal" class="modal" v-if="addModalOn">
          <div class="modal-content-col">
            <div class="d-flex justify-content-end">
              <button @click="switchCloseCreate" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
              <div v-if="this.modalMessage"  class="d-flex justify-content-center">
              <span :class="[this.modalMessage=='Sukses!'?'btn btn-success':'btn btn-danger text-white']">
                {{this.modalMessage}}
                </span>
              </div>
              <form @submit.prevent="createUser">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Name</label>
                  <input v-model="this.addForm['name']"  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="this.addForm['errors']['name']"  class="text-danger text-small">{{ this.addForm['errors']['name'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Username</label>
                  <input v-model="this.addForm['username']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small  v-if="this.addForm['errors']['name']"  class="text-danger text-small">{{ this.addForm['errors']['username'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Password</label>
                  <input v-model="this.addForm['password']" type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small  v-if="this.addForm['errors']['password']"  class="text-danger text-small">{{ this.addForm['errors']['password'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Role</label>
                  <select class="form-select" aria-label="Default select example"  @change="changeRole($event,'create')">
                    <option disabled selected>Pilih role</option>
                    <option value="1">Admin</option>
                    <option value="1">User</option>
                  </select>
                  <small  v-if="this.addForm['errors']['roles']" class="text-danger text-small">{{ this.addForm['errors']['roles'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
  
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      <div class="container-fluid text-white mt-4 p-4">
        <ul class="d-flex justify-content-start bd-highlight mb-3">
         <NuxtLink to="/home-admin" class="p-2">
            <font-awesome-icon :icon="['fas', 'house']" class="me-3" />
            Home
          </NuxtLink>
          <li class="p-2">/</li>
          <NuxtLink to="/users?page=1" class="p-2">
            <font-awesome-icon :icon="['fas', 'desktop']" class="me-3" />
            Projects
          </NuxtLink>
        </ul>
        <div class="d-flex justify-content-between bd-highlight mb-3">
        <h2>Project Management</h2>
      </div>
        <div class="d-flex justify-content-between bd-highlight mb-3">
          <div class="text-white">
            <div class="d-flex justify-content-between">
            <div>
              <input v-model="this.search" type="text" class="form-control" aria-label="Text input with segmented dropdown button">
            </div>
              <div class=" input-group-append">
                <button @click="searchUser()" type="button" class="btn btn-outline-secondary">Cari</button>
              </div>
            </div>          
          </div>
          <div class=" text-white">
            <NuxtLink to="/new-project" class="btn-lg btn btn-primary">
              <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />
              New Project
            </NuxtLink>
          </div>
        </div>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">ProjectID</th>
              <th scope="col">Lokasi (Koordinat)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in monitors">
              <th scope="row">{{ ++index }}</th>
              <td>{{ item.deskripsi }}</td>
              <td><NuxtLink :to="`/dashboard-${item.project_id}`">{{ item.project_id }}</NuxtLink></td>
              <td>{{ item.lokasi }}</td>
              <td>{{ item.camera_url }}</td>
              <td>{{ item.lokasi }}</td>
              <td>
                <div class="d-flex justify-content-start bd-highlight mb-3">
                  <div class="p-2 bd-highlight">
                    <button   type="submit" class="w-100 btn btn-lg btn btn-primary">
                      <NuxtLink :to="`/edit-project-${item.id}`">
                        Edit
                      </NuxtLink>
                    </button>
                  </div>
                  <div class="p-2 bd-highlight">
                    <button @click="deleteMonitorToggle(item.id)" type="submit" class="w-100 text-white btn btn-lg btn btn-danger"> 
                      Hapus
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item" v-if="pagination.prev">
              <span class="page-link" @click="nextPage(pagination.prev)">Previous</span>
            </li>
            <li class="page-item" :class="[route.query['page'] == index ? 'active' : '']" v-for="index in pagination.nums" aria-current="page">
              <span class="page-link" @click="nextPage(index)">{{ index }}</span>
            </li>
            <li class="page-item" v-if="pagination.next">
              <span class="page-link" @click="nextPage(pagination.next)">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </NuxtLayout>
  </template>
  
      <script >
      import { messageStore }  from "~/stores/message";
      import { userStore }  from "~/stores/user";
      import { windowStore }  from "~/stores/window";
      import GlobalDelete from "../components/GlobalDelete.vue"
      export default{
        data(){
          return{
            id:"",
            hapusPesan:"Anda yakin ingin hapus project ini ?",
            addModalOn:false,
            admin_edit_selected:false,
            user_edit_selected:false,
            popupDelete:false,
            editModalOn:false,
            router:useRouter(),
            addForm:{"name":"","username":"","password":"","roles":[],"errors":{}},
            editForm:{"id":"","name":"","username":"","password":"","roles":[],"errors":{}},
            monitors:[],
            modalMessage:"",
            route:useRoute(),
            pagination:[],
            certname:null,
            search:"",
            test:"FU",
            user:userStore(),
            window:windowStore()
          }
        },
        async updated(){
        await this.user.getUserData()
        await this.fetchMonitors()
        },
        async created(){
          definePageMeta({
            middleware: ['auth']
          })
          await this.fetchMonitors()
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
          async editUser(){
            const data = {'id':this.editForm['id'],'name':this.editForm['name'],"password":this.editForm['password'],'username':this.editForm['username'],'roles':this.editForm['roles']}
              await $fetch(`${useRuntimeConfig().public.backendURL}/api/users`, {
                headers: {
                        Accept:"application/json"
  
                },
                method: 'put',
                body:JSON.stringify(data)
              })
                .then(async()=> {
                  this.editForm['errors']={}
                  this.modalMessage="Sukses!"
                  await this.fetchUser()
                })
  
                .catch(error => {
                  this.modalMessage="Gagal!"
                  this.editForm['errors']=error
                })
          },
          async fetchUser(){
            const page=this.route.query['page']
            this.search=this.route.query['search']
            var query = '?page=1'
            if (page){
              query = `?page=${page}`
            }
            if(this.search){
              query+=`&search=${this.search}`
            }
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors/${query}`, {
                headers: {
                        Accept:"application/json",
                        "Authorization":`Bearer ${this.user.token}`,
                },
                method: 'GET'
              })
                .then(response => {
                  this.monitors = response.data
                  this.pagination = response.pagination
                  this.window.loading=false
                })
  
                .catch(error => {
                  return navigateTo('/login')
                })
          },
          changeRole(event,operation){
            if(operation=="create"){
              this.addForm['roles']=[]
              this.addForm['roles'].push(event.target.value)
            }
            else{
              this.editForm['roles']=[]
              this.editForm['roles'].push(event.target.value)           
            }
  
          },
          addModalToggle(){
            this.addModalOn=true
          },
          switchCloseCreate(){
            this.messageModal=""
            this.addModalOn=false
          },
          editModalToggle(id,name,username,roles){
            this.editForm['id']=id
            this.editForm['name']=name
            this.editForm['username']=username
            this.editForm['roles']=roles
            if(roles==[1]){
              this.admin_edit_selected=true
              this.user_edit_selected=false
            }
            else{
              this.admin_edit_selected=false
              this.user_edit_selected=true
            }
            this.editModalOn=true
          },
          switchCloseEdit(){
            this.editModalOn=false
          },
          async fetchMonitors(){

            const page=this.route.query['page']
            this.search=this.route.query['search']
            var query = '?page=1'
            if (page){
                query = `?page=${page}`
            }
            if(this.search){
                query+=`&search=${this.search}`
            }
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/admin_monitors/${query}`, {
                headers: {
                        Accept:"application/json",
                        "Authorization":`Bearer ${this.user.token}`,
                },
                method: 'GET'
                })
                .then(response => {
                    console.log(response.data)
                    this.monitors = response.data
                    this.pagination = response.pagination
                    this.window.loading=false
                })

                .catch(error => {
                    return navigateTo('/login')
                })

            },
          searchUser(){
            this.route.query['search']
            console.log(this.search)
            return navigateTo({
                path: '/projects',
                query: { page: this.route.query['page'],search: this.search},
              })
          },
          nextPage(page){
            if(this.route.query['search']){
              return navigateTo({
                path: '/projects',
                query: { page: page,search:this.route.query['search']},
              })
            }
            else{
              return navigateTo({
                path: '/projects',
                query: { page: page},
              })
            }
          },
            switchClose(){
              this.popupDelete=false
              this.id=''
            },
            
            deleteMonitorToggle(id){
              this.popupDelete=true
              this.id=id
            },
            async deleteInEmitter(){
              this.popupDelete=false
              window.scrollTo(0,0)
              await this.fetchMonitors()
            }
        },
        components:{
            GlobalDelete
        }
  
      }
      </script>
      <style scoped>
          .modal {
            position: fixed; /* Stay in place */
            padding-top: 5px; /* Location of the box */
            left: 0;
            display: block;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
          }
          #map { 
            width: 750px;
            height: 150px; 
          }
          /* Modal Content */
          .input-group-append{
            padding-left: 4px;
          }    
          .modal-content {
            background-color: #fefefe;
            margin-top: 3rem;
            margin-left: 35rem;
            padding: 20px;
            border-radius: 25px;
            width: 500px;
            height:250px;
            text-align: center;
          }
          .close{
            background-color: transparent;
            border:none;
          }
          
          .modal-content-col {
            background-color: #fefefe;
            margin-top: 1rem;
            margin-left: 25rem;
            padding: 20px;
            border-radius: 25px;
            width: 500px;
            height:550px;
            overflow-y: scroll;
            text-align: start;
          }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      li{
        cursor:pointer;
      }
      </style>