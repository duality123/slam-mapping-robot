<template>
    <NuxtLayout name="base">
      <GlobalDelete :id="id" :pesan="hapusPesan" url="monitors" @deleteInMonitors="deleteInMonitors" :popup="popup" @toggleClose="switchClose"/>
      <div class="container-fluid mt-4 p-4">
        <div id="myModal" class="modal" v-if="profilModal">
          <div class="modal-content-col">
            <div class="d-flex justify-content-end">
              <button @click="openCreateProjectModal" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
              <form @submit.prevent="postProject">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Username</label>
                  <input v-model="newProfil['username']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="newProfil['errors']['username']" class="text-danger text-small">{{ newProfil['errors']['username'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Name</label>
                  <input v-model="newProfil['name']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="newProfil['errors']['name']" class="text-danger text-small">{{ newProfil['errors']['name'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Password Baru</label>
                  <input v-model="newProfil['password']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="newProfil['errors']['password']" class="text-danger text-small">{{ newProfil['errors']['password'] }}</small>
                  <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label text-dark">Password Lama</label>
                  <input v-model="newProfil['old_password']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small v-if="newProfil['errors']['old_password']" class="text-danger text-small">{{ newProfil['errors']['old_password'] }}</small>
                  <div id="emailHelp" class="form-text">Wajib jika anda mau ubah profil anda.</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="row justify-content-start">
                    <div class="col-sm-4 text-white">
                        <div class="bg-dark-secondary rounded d-flex align-items-center p-4">
                            <div class="d-flex flex-column bd-highlight mb-3">
                                <div class="p-2 bd-highlight"><NuxtLink to="/settings" class="p-2"><font-awesome-icon :icon="['fas', 'gears']" class="me-3" />Connections Settings</NuxtLink></div>
                                <div class="p-2 bd-highlight"><NuxtLink to="/users?page=1" class="p-2"><font-awesome-icon :icon="['fas', 'users']" class="me-3" />Users</NuxtLink></div>
                                <div class="p-2 bd-highlight"><NuxtLink to="/projects?page=1" class="p-2"><font-awesome-icon :icon="['fas', 'desktop']" class="me-3" />Projects</NuxtLink></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4  text-white">
                        <div class="bg-dark-secondary rounded d-flex align-items-center p-4">
                            <img class="rounded-circle" src="../assets/img/project.jpg" alt="" style="width: 50px; height: 50px;">
                            <div class="ms-3">
                                <p class="mb-2">Total Project</p>
                                <h4 class="mb-0" id="suhuNum" >{{ this.totalProjects}}</h4>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 text-white">
                        <div class="bg-dark-secondary rounded d-flex align-items-center p-4">
                            <img class="rounded-circle" src="../assets/img/users.png" alt="" style="width: 50px; height: 50px;">
                            <div class="ms-3">
                                <p class="mb-2">Total User</p>
                                <h4 class="mb-0" id="suhuNum" s>{{ this.totalUsers}}</h4>
                            </div>
                        </div>
                    </div>
          <div class="col-sm-4 mt-5">
          <div class="card bg-dark-secondary">
            <div class="card-body">
              <h2 class="text-center text-white">Your Account</h2>
              <form @submit.prevent="submit">
                <div class="mb-3 text-white">
                  <label for="exampleFormControlInput1" class="form-label text-white">Name :</label>
                  <h5>{{this.user.userData.name}}</h5>
                </div>
                <div class="mb-3 text-white">
                  <label for="exampleFormControlInput1" class="form-label text-white">Username :</label>
                  <h5>{{this.user.userData.username}}</h5>
                </div>
                <div class="mb-3 text-white">
                  <label for="exampleFormControlInput1" class="form-label text-white">token</label>
                  <div class="d-flex bd-highlight">
                    <div class="p-2 w-100 bd-highlight" v-if="hideButton">
                      <h5>**********</h5>
                    </div>
                    <div class="p-2 w-100 bd-highlight" v-else>
                      <input v-model="token" type="text" class="form-control text-white bg bg-dark-secondary" id="exampleFormControlInput1" placeholder="Isikan username anda">
                    </div>
                    <div class="p-2 flex-shrink-1 bd-highlight" v-if="hideButton">
                      <font-awesome-icon :icon="['far', 'eye']" @click="unHideButtoFunc" class="hideButton"/>
                    </div>
                    <div class="p-2 flex-shrink-1 bd-highlight" v-else>
                      <font-awesome-icon :icon="['far', 'eye-slash']" @click="hideButtoFunc" class="hideButton"/>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <button @click="openCreateProjectModal" type="submit" class="w-100 btn btn-lg btn btn-primary">
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-5 mt-5">
          <div class="d-flex justify-content-between bd-highlight mb-3">
            <div class="p-2 text-white">
              <h5>Your Projects</h5>
            </div>
            <div class="p-2 text-white">
              <NuxtLink :to="`/new-project`" class="btn-lg btn btn-primary">
                <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />New Project
              </NuxtLink>
            </div>
          </div>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Project ID</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in monitors">
                <td col="">
                  <NuxtLink :to="`/dashboard-${item.project_id}`">
                    <font-awesome-icon :icon="['far', 'file']" class="me-2"/>{{item.project_id}}
                  </NuxtLink>
                </td>
                <td col="">
                  <div class="d-flex align-items-center">
                    <div class="p-2">
                      <font-awesome-icon :icon="['fas', 'trash']" @click="delteMonitorToggle(item.id,index)"/>
                    </div>
                    <div class="p-2">
                      <NuxtLink :to="`edit-project-${item.id}`">
                        <font-awesome-icon :icon="['fas', 'gear']" />
                      </NuxtLink>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
          <div class="col-sm-4 mt-5">
            <div class="col-sm-9 col-md-4 text-white">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Lokasi Projects</label>
                                <div id="map"></div>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
      <script >
      import { messageStore }  from "~/stores/message";
      import { userStore }  from "~/stores/user";
      import GlobalDelete from "../components/GlobalDelete.vue"
      import { windowStore }  from "~/stores/window";
      import { ref,reactive } from 'vue';
      import iconFile from '../assets/img/1.png'
      import L from "leaflet";
      import 'leaflet/dist/leaflet.css';
      export default{
        data(){
          return{
            profilModal:false,
            map:null,
            totalProjects:0,
            totalUsers:0,
            sebaranDatasets:[],
            icon:null,
            hapusPesan:"Anda yakin ingin hapus monitor ini ?",
            popup:false,
            id:"",
            deleteIndex:"",
            marker:null,
            newProfil:{"username":"","name":"","password":"","old_password":"",'errors':{}},
            hideButton:true,
            monitors:[],
            user:userStore(),
            token:userStore().token
          }
        },
        async mounted(){
          await this.user.getUserData()
          this.newProfil['username'] = this.user.userData.username
          this.newProfil['name'] = this.user.userData.name
          await $fetch(`${useRuntimeConfig().public.backendURL}/api/admin_dashboard/`, {
                headers: {
                  "Authorization":`Bearer ${this.user.token}`,
                },
                method: 'GET'
              })
                .then(response => {
                    console.log(response)
                    this.totalProjects=response.project_count
                    this.totalUsers=response.user_count
                    this.sebaranDatasets=response.project_coor
                    windowStore().loading=false
                
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
          await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors/?user=${this.user.userData.id.$oid}`, {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept:"application/json",
                "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'GET'
            })
              .then(response => {
                var data = response
                this.monitors=data.data
                this.pagination=data.pagination
                console.log(data.data)
              
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
            setTimeout(this.initLeaflet,1000)

        },
       
        async created(){
            definePageMeta({
                middleware: ['auth']
            })

      
        },
        watch:{
        },
          methods:{
            redirectTo(){
              return navigateTo(this.redirect)
            },
            openCreateProjectModal(){
              this.newProfil['errors']={}
              this.profilModal= !this.profilModal
            },
            async postProject(){
              const data = {'id':this.user.userData.id.$oid,'username':this.newProfil['username'],'name':this.newProfil['name'],'password':this.newProfil['password'],'old_password':this.newProfil['old_password']}
              await $fetch(`${useRuntimeConfig().public.backendURL}/api/profil/`, {
                headers: {
                  "Authorization":`Bearer ${this.user.token}`,
                },
                method: 'PUT',
                body:JSON.stringify(data)
              })
                .then(async(response)=> {
                  this.profilModal=false
                  window.scrollTo(0,0)
                  this.newProfil['errors']={}
                  this.user.token = response.token
                  let decodedHeader = jwt_decode(this.user.token);
                  localStorage.setItem('token', JSON.stringify(this.user.token));
                  console.log(decodedHeader)
                  let user =JSON.stringify(decodedHeader.upn)
                  localStorage.setItem('user', user)
                  this.user.userData = JSON.parse(user)
                  this.newProfil['username'] = this.user.userData.username
                  this.newProfil['name'] = this.user.userData.name
                
                })
  
                .catch(error => {
                  console.log(error)
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
                  this.newProfil['errors'] = error.data
                })
            },
            hideButtoFunc(){
              this.hideButton = true;
            },
            unHideButtoFunc(){
              this.hideButton = false;
            },
            onMapClick(e) {
              this.marker.setLatLng(e.latlng)
              this.newProject['lokasi'].push(e.latlng.lat)
              this.newProject['lokasi'].push(e.latlng.lng)
              console.log(this.newProject['lokasi'])
            },
            switchClose(){
              this.popup=false
              this.id=''
            },
            delteMonitorToggle(id,index){
              this.popup=true
              this.id=id
              this.deleteIndex=index
            },
            deleteInMonitors(){
              this.popup=false
              this.monitors.splice(this.deleteIndex,1)
              this.id=''
            },
            initLeaflet(){
                const icon=L.Icon.extend({
                        options: {
                            shadowUrl: '',
                            iconSize:     [40, 40],
                        }
                    });
                const defaultIcon = new icon({iconUrl: iconFile});
                this.map =L.map('map', {
                            center: L.latLng(-5.889261, 107.061768),
                            zoom: 5,
                            }),
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(this.map);  
                for(var i=0;i < this.sebaranDatasets.length;i++){
                  var pop = `<p>Project ID: <a class="text-dark" href="/dashboard-${ this.sebaranDatasets[i]['project_id']}">${ this.sebaranDatasets[i]['project_id']}</a></p><p>Deskripsi : ${ this.sebaranDatasets[i]['deskripsi']}</p><p>Lokasi : ${ this.sebaranDatasets[i]['lokasi']}</p>`
                  L.marker( this.sebaranDatasets[i]['lokasi'], {icon: defaultIcon}).addTo(this.map)
                }
                this.map.on('click', this.onMapClick);
          }
        },
          components: {
            L,
            GlobalDelete
          },
        }
      </script>
      <style scoped>
      .hideButton{
        cursor:pointer;
      }
      </style>
          <style scoped>
          .btn_custom_outline:hover {
              color: #FFFFFF !important;
          }
          .close{
            border-width: 0px;
            background-color: white;
          }
          
          .add-section{
            border-style: solid;
            border-color:#FFFFFF;
            border-width: 8px;
            width:300px;
            cursor:pointer;
            text-align:center;
          }
          a{
            
            cursor:pointer;
          }
          .modal {
            position: fixed; /* Stay in place */
            padding-top: 20px; /* Location of the box */
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
            width: 410px;
            height: 350px; 
          }
          /* Modal Content */
          .modal-content {
            background-color: #fefefe;
            margin-top: 3rem;
            margin-left: 25rem;
            padding: 20px;
            border-radius: 25px;
            width: 1000px;
            height:250px;
            text-align: center;
          }

          .modal-content-col {
            background-color: #fefefe;
            margin-top: 3rem;
            margin-left: 20rem;
            padding: 20px;
            border-radius: 25px;
            width: 800px;
            height:550px;
            text-align: start;
            overflow: scroll;
          }
          .hide{
            display: none;
          }
          .show{
            display: block;
          }
          .container-fluid{
            margin-top: 8vh!important;
          }
          .modal-close{
            background-color: transparent;
            border:none;
          }
          
          </style>