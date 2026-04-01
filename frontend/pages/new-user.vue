<template>
    <NuxtLayout name="base">
    
            <div class="container-fluid text-white mt-4  p-4">
                  <ul class="d-flex justify-content-start bd-highlight mb-3">
                    <li class="p-2"><NuxtLink :to="`/home`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" class="me-3"/>Home</NuxtLink></li>
                    <li class="p-2">/</li>
                    <li class="p-2"><NuxtLink :to="`/new-project`" class="nav-link "  aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'users']" class="me-3"/>New Project</NuxtLink></li>
                    </ul>
                <h3>Edit User</h3>
                <form @submit.prevent="postProject()">
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">Deskripsi</label>
    <input v-model="newProject['deskripsi']"  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="newProject['errors']['deskripsi']" class="text-danger text-small">{{ newProject['errors']['deskripsi'] }}</small>
    <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">Project Id</label>
    <input v-model="newProject['project_id']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="newProject['errors']['project_id']" class="text-danger text-small">{{ newProject['errors']['project_id'] }}</small>
    <div id="emailHelp" class="form-text">Nama deskripsi project anda.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label">Lokasi</label>
    <div id="emailHelp" class="form-text"><small v-if="newProject['errors']['lokasi']"  class="text-danger text-small">{{ newProject['errors']['lokasi'] }}</small></div>
    <div id="map"></div>
    <div id="emailHelp" class="form-text">Pilih koordinat project anda.</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    </NuxtLayout>
    </template>
    <script >
    import { messageStore }  from "~/stores/message";
    import { userStore }  from "~/stores/user";
    import { windowStore }  from "~/stores/window";
    import iconFile from '../assets/img/1.png'
    import L from "leaflet";
    import 'leaflet/dist/leaflet.css';
    export default{
      data(){
        return{
          newProject:{"deskripsi":"","project_id":"","lokasi":[],'errors':{}},
          certname:null,
          test:"FU",
          user:userStore(),
          map:null,
          marker:null,
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
        if(this.user.roles=[1]){
          return navigateTo("/home")
        }
        windowStore().loading=false
      },
      async mounted(){
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
                this.marker =L.marker([-5.889261, 107.061768], {icon: defaultIcon})
                this.marker.addTo(this.map)
                    .bindPopup('Klik koordinat.')
                    .openPopup();
                

                this.map.on('click', this.onMapClick);
             },
        methods:{
            async postProject(){
            const data = {'collaborators':[this.user.userData.id.$oid],'deskripsi':this.newProject['deskripsi'],'project_id':this.newProject['project_id'],'lokasi':this.newProject['lokasi']}
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors/}`, {
              headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'POST',
              body:JSON.stringify(data)
            })
              .then(response => {
                this.message.base_flash("success","Data berhasil ditambah!")
                window.scrollTo(0,0)
                
              })

              .catch(error => {
                console.log(error.data)
                this.message.base_flash("error","Data gagal ditambah, pastikan kredensial anda benar!")
                this.newProject['errors']=error.data
                window.scrollTo(0,0)
              })     
          },
          onMapClick(e) {
            this.marker.setLatLng(e.latlng)
            this.newProject['lokasi']=[]
            this.newProject['lokasi'].push(e.latlng.lat)
            this.newProject['lokasi'].push(e.latlng.lng)
            console.log(this.newProject['lokasi'])
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