<template>
  <NuxtLayout name="base">
    <div class="container-fluid text-white mt-4 p-4">
      <ul class="d-flex justify-content-start bd-highlight mb-3" v-if="user.userData.roles.includes('1')">
                    <li class="p-2" ><NuxtLink :to="`/home-admin`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" class="me-3"/>Home</NuxtLink></li>
                    <li class="p-2">/</li>
                    <li class="p-2" ><NuxtLink :to="`/projects?page=1`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'desktop']" class="me-3"/>Project Management</NuxtLink></li>
                    <li class="p-2">/</li>
                    <li class="p-2"><NuxtLink :to="`/edit-project-${route.params.slug}`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'file']" class="me-3"/>Edit Project</NuxtLink></li>                
                  </ul>
                  <ul class="d-flex justify-content-start bd-highlight mb-3"  v-else>
                    <li class="p-2" ><NuxtLink :to="`/home`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" class="me-3"/>Home</NuxtLink></li>
                    <li class="p-2">/</li>
                    <li class="p-2"><NuxtLink :to="`/edit-project-${route.params.slug}`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'file']" class="me-3"/>Edit Project</NuxtLink></li>
                    </ul>
      <h3>Edit Project</h3>
      <form @submit.prevent="postProject()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Deskripsi</label>
          <input v-model="dataProject['deskripsi']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <small v-if="dataProject['errors']['deskripsi']" class="text-danger text-small">{{ dataProject['errors']['deskripsi'] }}</small>
          <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Project Id</label>
          <input v-model="dataProject['project_id']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <small v-if="dataProject['errors']['project_id']" class="text-danger text-small">{{ dataProject['errors']['project_id'] }}</small>
          <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Model</label>
          <p id="model">{{ this.modelName }}</p>
          <input type="file" @change="this.changeModel($event)"  class="mt-2" id="input">
          <small v-if="dataProject['errors']['model']" class="text-danger text-small">{{ dataProject['errors']['model'] }}</small>
          <div id="emailHelp" class="form-text">Model (RKNN).</div>
        </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">K Pakan Ikan</label>
    <input v-model="dataProject['k_pakan']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="dataProject['errors']['k_pakan']" class="text-danger text-small">{{ dataProject['errors']['k_pakan'] }}</small>
    <div id="emailHelp" class="form-text">Nilai konstanta pakan ikan.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">Batas waktu bawah</label>
    <input v-model="dataProject['l_time']" type="time" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="dataProject['errors']['l_time']" class="text-danger text-small">{{ dataProject['errors']['l_time'] }}</small>
    <div id="emailHelp" class="form-text">Batas bawah waktu mulai pakan ikan.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">Batas waktu atas</label>
    <input v-model="dataProject['u_time']" type="time" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="dataProject['errors']['u_time']" class="text-danger text-small">{{ dataProject['errors']['u_time'] }}</small>
    <div id="emailHelp" class="form-text">Batas bawah waktu akhir pakan ikan.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">Interval ( detik )</label>
    <input v-model="dataProject['intervals']" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="dataProject['errors']['intervals']" class="text-danger text-small">{{ dataProject['errors']['intervals'] }}</small>
    <div id="emailHelp" class="form-text">Interval waktu pakan ikan.</div>
  </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Lokasi</label>
          <div id="emailHelp" class="form-text">
            <small v-if="dataProject['errors']['lokasi']" class="text-danger text-small">{{ dataProject['errors']['lokasi'] }}</small>
          </div>
          <div id="map"></div>
          <div id="emailHelp" class="form-text">Pilih koordinat project anda.</div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script>
import { messageStore } from "~/stores/message";
import { userStore } from "~/stores/user";
import { windowStore } from "~/stores/window";
import iconFile from '../assets/img/1.png';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

    export default{
      data(){
        return{
          dataProject:{"k_pakan":0,"l_time":"","u_time":"","intervals":0,"deskripsi":"","project_id":"",'model':"","lokasi":[],"errors":{}},
          modelName:null,
          test:"FU",
          user:userStore(),
          map:null,
          marker:null,
          route:useRoute(),
          message:messageStore()
        }
      },
      setup(){

      },
      async created(){
        definePageMeta({
          middleware: ['auth']
        })
        
        await this.user.getUserData()
        console.log(this.route.params.slug)
        await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors/${this.route.params.slug}`, {
              headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'GET',
            })
              .then(response => {
                this.dataProject['id']=this.route.params.slug
                this.dataProject['deskripsi']=response.deskripsi
                this.dataProject['project_id']=response.project_id
                this.dataProject['lokasi']=response.lokasi
                this.dataProject['k_pakan']=response.k_pakan
                this.dataProject['intervals']=response.intervals
                this.dataProject['l_time']=response.l_time
                this.dataProject['u_time']=response.u_time
                this.modelName=response.model
                //this.dataProject['model'] = model
                this.dataProject['errors']={}
                windowStore().loading=false
                
              })

              .catch(error => {
                console.log(error.data)
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
                this.message.base_flash("error","Ada kesalahan!")
                this.dataProject['errors']=error.data
                window.scrollTo(0,0)
              })   
      },
      async mounted(){
        setTimeout(this.initLeaflet,2000)
       
             },
        methods:{
            async postProject(){
              const data = new FormData();
              data.append('id',this.dataProject['id'])
              data.append('deskripsi',this.dataProject['deskripsi'])
              data.append('model',this.dataProject['model'])
              data.append('project_id',this.dataProject['project_id'])
              data.append('lokasi',this.dataProject['lokasi'])
              data.append('k_pakan',this.dataProject['k_pakan'])
              data.append('l_time',this.dataProject['l_time'])
              data.append('u_time',this.dataProject['u_time'])
              data.append('intervals',this.dataProject['intervals'])
              await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors/`, {
                headers: {
                  "Authorization":`Bearer ${this.user.token}`,
                },
                method: 'PUT',
                body:data
              })
                .then(response => {
                  this.dataProject['errors']={}
                  this.message.base_flash("success","Data berhasil diubah!")
                  //this.newProject['errors']={}
                  window.scrollTo(0,0)
                  
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
                  console.log(error.data)
                  this.message.base_flash("error","Data gagal ditambah, pastikan kredensial anda benar!")
                  this.dataProject['errors']=error.data
                  window.scrollTo(0,0)
                })     
          },
          onMapClick(e) {
            this.marker.setLatLng(e.latlng)
            this.dataProject['lokasi']=[]
            this.dataProject['lokasi'].push(e.latlng.lat)
            this.dataProject['lokasi'].push(e.latlng.lng)
          },
          changeModel(event){
            this.modelName= event.target.files[0].name
            this.dataProject['model']= event.target.files[0];
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
                this.marker =L.marker(this.dataProject['lokasi'], {icon: defaultIcon})
                this.marker.addTo(this.map)
                    .bindPopup('Klik koordinat.')
                    .openPopup();
                

                this.map.on('click', this.onMapClick);
          }
      },
      components:{
        L
      }

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
    #map { 
          width: 750px;
          height: 550px; 
        }
    </style>