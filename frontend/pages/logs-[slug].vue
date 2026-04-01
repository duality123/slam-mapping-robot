<template>
  <NuxtLayout name="body" :workspace="workspace" >
    <Delete :token=this.user.token :start_date_single_delete="this.end_date_delete_single" :url="this.url" :start_date_multi_delete="this.start_date_delete_multi" :end_date_multi_delete="this.end_date_delete_multi" :pesan="hapusPesan" @deleteInEmitter="deleteInEmitter()" :popup="popup" @toggleClose="switchClose()"/>
    <div id="myModal" class="modal" v-if="this.popupGraph" >
        <div class="modal-content-col">
          <div class="d-flex justify-content-end">
            <button @click="closeCol" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div>
            <div class=" px-4">
              <h5 class="text-center">Grafik Rata - Rata</h5>
                <div class="row g-4 justify-content-center">
                    <div class="col-sm-9 col-md-4 zing-graph">            
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">Suhu</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="suhuValues"  height="280rem" width="280rem"/>
                    </div>
                    
                    <div class="col-sm-9 col-md-4 zing-graph">
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">PH</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="phValues" height="280rem" width="280rem"/>
                    </div>
                    <div class="col-sm-9 col-md-4 zing-graph">
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">TDS</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="tdsValues" height="280rem" width="280rem"/>
                        </div>
                        <div class="col-sm-9 col-md-4 zing-graph" >
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">Salinitas</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="salinitasValues" height="280rem" width="280rem"/>
                        </div>
                        <div class="col-sm-9 col-md-4 zing-graph">
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">Ammonia</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="ammoniaValues" height="280rem" width="280rem"/>
                        </div>
                </div>
            </div>
          </div>
        </div>
      </div>
              <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                  <div class="col-sm-9">
              <div class="card-body bg-dark-secondary text-white px-4 p-4">
                <div class="mb-3">
                <h5>Dataset availibility :</h5>
              </div>
              <div class="mb-3">
                <h5>{{ this.min }} - {{ this.max }}</h5>
              </div>
              <div class="mb-3">
                  <h5 for="exampleFormControlInput1" class="form-label">Filter menurut waktu</h5>
              <input class="form-control" id="formFile" type="date" v-model="start_date_single" >
              </div>
              <div class="mb-3">
                  <h5 for="exampleFormControlInput1" class="form-label">Filter menurut interval waktu</h5>
                  <div class="d-flex justify-content-center row  mb-3">
                    <div class="p-2 bd-highlight col"><input class="form-control" v-model="start_date_multi" id="start_time" type="date" ></div>
                    <div class="p-2 bd-highlight col text-center"><h5 class="form-label">sampai</h5></div>
                    <div class="p-2 bd-highlight col"><input class="form-control" v-model="end_date" id="end_time" type="date"></div>
                  </div>
              </div>
              <div class="mb-3">
              <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight" v-if="!isDownloading"><button @click="downloadData()" type="button" class="btn btn-secondary">Download data </button></div>
                <div class="p-2 bd-highlight" v-else><button disabled="true" type="button" class="btn btn-secondary"><div class="spinner-border text-light" role="status">
<span class="sr-only">Loading...</span>
</div></button></div>
                <div class="p-2 bd-highlight"><button :disabled="isReadyDelete" @click="hapusFunction()" type="button" class="btn btn-danger text-white">Hapus data</button></div>
              </div>
              <div class="p-2 dropdown">
  <a class="btn btn-primary dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Grafik Reducer
  </a>

  <ul class="dropdown-menu ">
    <li><a @click="changeGraphStyle('mean')" class="dropdown-item" >Mean</a></li>
    <li><a @click="changeGraphStyle('max')" class="dropdown-item" >Max</a></li>
    <li><a @click="changeGraphStyle('min')" class="dropdown-item" >Min</a></li>
  </ul>
</div>
              </div>
      
          </div>
      </div>
   
 
   
                </div>
            </div>
            <!-- Sale & Revenue End -->


 
            <div class="container-fluid zing-container-0 pt-4 px-4">
              <h5 class="text-center">Grafik {{this.graph}}</h5>
              <div v-if="graphloading" class="row g-4 justify-content-center">
                <div class="spinner-border text-secondary justify-content-center" role="status">
                  <span class="visually-hidden text-center">Loading...</span>
              </div>
                </div>
                <div v-else class="row g-4 justify-content-center">
                    <div class="col-sm-9 col-md-4 zing-graph">            
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">Suhu</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="suhuValues"  height="280rem" width="280rem"/>
                    </div>
                    
                    <div class="col-sm-9 col-md-4 zing-graph">
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">PH</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="phValues" height="290rem" width="280rem"/>
                    </div>
                    <div class="col-sm-9 col-md-4 zing-graph">
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">TDS</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="tdsValues" height="290rem" width="280rem"/>
                        </div>
                        <div class="col-sm-9 col-md-4 zing-graph" >
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">Salinitas</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="salinitasValues" height="290rem" width="280rem"/>
                        </div>
                        <div class="col-sm-9 col-md-4 zing-graph">
                            <div class="d-flex align-items-center flex justify-content-between mb-4">
                                <h6 class="mb-0">Ammonia</h6>
                            </div>
                            <ZingChartVue :data="returnBaseData" :series="ammoniaValues" height="290rem" width="280rem"/>
                        </div>
                </div>
                </div>
                  <div class="col-sm mt-2">
                  <table class="table table-dark table-striped">
<thead>
  <tr>
    <th scope="col">Tanggal</th>
    <th scope="col">Suhu</th>
    <th scope="col">PH</th>
    <th scope="col">TDS</th>
    <th scope="col">Salinitas</th>
    <th scope="col">Ammonia</th>
  </tr>
</thead>
<tbody>
  <tr v-for="index in data">
    <th scope="row">{{ index.time }}</th>
    <td>{{ index.suhu }}</td>
    <td>{{ index.ph }}</td>
    <td>{{ index.tds }}</td>
    <td>{{ index.salinitas }}</td>
    <td>{{ index.ammonia }}</td>
  </tr>
</tbody>
</table>
<nav aria-label="...">
<ul class="pagination">
  <li class="page-item " v-if="this.pagination.prev">
    <span class="page-link"  @click="nextPage(this.pagination.prev)">Prev</span>
  </li>
  <li class="page-item" :class="[this.route.query['page'] == index ? 'active':'']" v-for="index in this.pagination.nums" aria-current="page">
    <span class="page-link"  @click="nextPage(index)">{{ index }}</span>
  </li>
  <li class="page-item" v-if="this.pagination.next">
    <span class="page-link"  @click="nextPage(this.pagination.next)">Next</span>
  </li>
</ul>
</nav>
</div>

  </NuxtLayout>
  </template>
  <script>
  import { messageStore }  from "~/stores/message";
  import Delete from "../components/Delete.vue"
  export default{
    data(){
      return{
        data:[],
        popupGraph:false,
        start_date_single:"",
        start_date_multi:"",
        start_date_delete_single:"",
        start_date_delete_multi:"",
        end_date_delete_multi:"",
        end_date:"",
        isReadyDelete:false,
        search:'?page=1',
        isDownloading:false,
        url :"",
        user:userStore(),
        route:useRoute(),
        workspace:"",
        message : messageStore(),
        hapusPesan:"",
        pagination:{},
        popup:false,
        max:"",
        min:"",
        graph:'mean',
        graphloading:true,
        time:[],
        suhuValues:[{values:[]}],
        phValues:[{values:[]}],
        tdsValues:[{values:[]}],
        salinitasValues:[{values:[]}],
        ammoniaValues:[{values:[]}],
      }
    },
    async created(){
     await this.refreshData()
    },
    async updated(){
      await this.refreshData()
    },
    methods:{
      async refreshData(){
        this.workspace=' - '+this.route.params.slug
      this.search = window.location.search
      const urlParams = new URLSearchParams(this.search)
      if (urlParams.get("graph")){
        this.graph =urlParams.get("graph")
        }

      this.url ='logs/'+this.route.params.slug
      await $fetch(`${useRuntimeConfig().public.backendURL}/api/logs/${this.route.params.slug}/${this.search}`, {
              headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
            method: 'GET'
          })
            .then(response => {
              var data = response
              this.max = data.max
              this.min=data.min
              this.data=data.data
              this.pagination=data.pagination
              console.log(data.pagination)
            
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
                  return navigateTo("/login")
              console.log(error)
            })
        let graph_query=`?graph=${this.graph}`
        if (urlParams.get("start_date")){
          graph_query += `&start_date=${urlParams.get("start_date")}`
        }
        if (urlParams.get("end_date")){
          graph_query += `&end_date=${urlParams.get("end_date")}`
        }
        await $fetch(`${useRuntimeConfig().public.backendURL}/api/graph/${this.route.params.slug}/${graph_query}`, {
              headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
            method: 'GET'
          })
            .then(response => {
              var data = response
              this.time=[]
              this.suhuValues[0]['values']=[]
              this.phValues[0]['values']=[]
              this.tdsValues[0]['values']=[]
              this.salinitasValues[0]['values']=[]
              this.ammoniaValues[0]['values']=[]
              for (const [key, value] of Object.entries(data)) {
                this.time.push(key)
                this.suhuValues[0]['values'].push(value.suhu)
                this.phValues[0]['values'].push(value.ph)
                this.tdsValues[0]['values'].push(value.tds)
                this.salinitasValues[0]['values'].push(value.salinitas)
                this.ammoniaValues[0]['values'].push(value.ammonia)
              }
              this.graphloading=false
            
            
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
                  return navigateTo("/login")
              console.log(error)
            })
      },
      deleteInEmitter(){
        this.popup=false
        return navigateTo({
          path: '/logs-'+this.route.params.slug,
          query:{
            page: 1,
        }})
      },
      switchClose(){
        this.popup = false
      },
      changeGraphStyle(style){
        
        return navigateTo({
            path: '/logs-'+this.route.params.slug,
            query:{
              graph:style
          }
          })
      },
      async nextPage(num){
        if(this.start_date_single){
          this.$router.push({
          path: '/logs-'+this.route.params.slug,
          query:{
            page: num,
            start_date: this.start_date_single,
            graph:this.graph
        }
        })
        
      }
      else if(this.start_date_multi && this.end_date){
        this.$router.push({
          path: '/logs-'+this.route.params.slug,
          query:{
            page: num,
            start_date: this.start_date_multi,
            end_date:this.end_date,
            graph:this.graph
        }
        })
      }
        this.$router.push({
          path: '/logs-'+this.route.params.slug,
          query:{
            page: num,
            start_date: this.start_date,
            graph:this.graph
        }
        })
      
      },
      hapusFunction(){
        if (this.start_date_single =="" && this.start_date_multi =="" && this.end_date =="") {
          messageStore().flash("error","Anda wajib pilih waktunya !")
          return
        }
        this.popup=true
        if (this.start_date_single !="") {
          this.hapusPesan="anda yakin ingin menghapus seluruh data pada tanggal " +this.start_date_single
        }
        else if (this.start_date_multi !="" && this.end_date !="" ) {
          this.hapusPesan="anda yakin ingin menghapus seluruh data pada tanggal " +this.start_date_multi +" sampai "+this.end_date
        }
        else{
          this.hapusPesan="anda yakin ingin menghapus seluruh data ?"
        }
        
      },
      switchCloseGraph(){
        console.log("ttttesstt")
        this.popupGraph = true
      },
      async downloadData(){
      this.isDownloading=true
      await $fetch(`${useRuntimeConfig().public.backendURL}/api/download`, {
        headers: {
                "Authorization":`Bearer ${this.user.token}`,
              },
            method: 'POST',
            body:JSON.stringify({"start_date":this.start_date,"end_date":this.end_date})
          })
          .then(res => {
                // and passing the data with type 
                const blob = new Blob([res], { type: 'text/csv' }); 
                
                // Creating an object for downloading url 
                const url = window.URL.createObjectURL(blob) 

                // Creating an anchor(a) tag of HTML 
                const a = document.createElement('a') 

                // Passing the blob downloading url  
                a.setAttribute('href', url) 

                // Setting the anchor tag attribute for downloading 
                // and passing the download file name 
                a.setAttribute('download', 'file.csv'); 

                // Performing a download with click 
                a.click() 
                this.isDownloading=false
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
              return navigateTo("/login")
              console.log(error)
            })
    }
    },
    watch:{
     start_date_multi(newValue,oldValue){
        this.start_date_single=''
        this.start_date_delete_single=""
        this.start_date_delete_multi=newValue
        if(newValue != oldValue){
          if (this.end_date){
            return navigateTo({
            path: '/logs-'+this.route.params.slug,
            query:{
              page: 1,
              start_date: this.start_date_multi,
              end_date: this.end_date,
              graph:this.graph
          }})
          }
        }
      },
      
      end_date(newValue,oldValue){
        this.start_date=''
        this.start_date_delete_single=''
        this.end_date_delete_multi=newValue
        if(newValue != oldValue){
          return navigateTo({
            path: '/logs-'+this.route.params.slug,
            query:{
              page: 1,
              start_date: this.start_date_multi,
              end_date: this.end_date,
              graph:this.graph
          }
          })
        }
      },
      start_date_single(newValue,oldValue){
        if(newValue != oldValue){
          this.end_date_delete_single=newValue
          console.log(this.end_date_delete_single)
          this.end_date=''
          this.start_date_multi=''
          this.end_date_delete_multi=""
          this.start_date_delete_multi=""
          return navigateTo({
            path: '/logs-'+this.route.params.slug,
            query:{
              page: 1,
              start_date: this.start_date_single,
              graph:this.graph
          }
          })
        }
      }
    },
    computed:{
      isAllowDelete(){
        if(this.start_date_delete_single || (this.start_date_delete_multi && this.end_date_delete_multi)){
          return true
      }
      return false
    },
    returnBaseData(){
      if(this.time.length>0){
          return {"type": "line",
                        "backgroundColor":"#373737",
                        'scaleX': {
                            'values':this.time,
                            'item': {
                            'fontAngle': -48,
                            'fontColor': '#9a9cab',
                            'fontFamily': 'Arial',
                            'fontSize': '10px',
                            'offsetX': '5px',
                            }
                          },
                        
                      }
    }
    else{
      return {"type": "line",
                    "backgroundColor":"#373737",
                    'scaleX': {
                        'values':[],
                        'item': {
                        'fontAngle': -48,
                        'fontColor': '#9a9cab',
                        'fontFamily': 'Arial',
                        'fontSize': '10px',
                        'offsetX': '5px',
                        }
                      },
                  }
    }
  },
    },
    components:{
      Delete,
      ZingChartVue
    }
  }
  </script>
  
  <style scoped>

  .dropdown-item{
    color: black!important;
  }
          .modal {
          position: fixed; /* Stay in place */
          padding-top: 10px; /* Location of the box */
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
        .zing-graph{
          max-width:500px!important;
          max-height:350px!important;
          overflow:hidden;
        }        /* Modal Content */
        .close{
          border-width: 0px;
          background-color: white;
        }
        .zing-container-0{
          max-width:1090px!important;
          max-height:1000px!important;
          overflow:hidden;
        }

        .zing-container-1{
          width:1050px!important;
          height:600px!important;
          overflow:hidden;
        }
        #zingchart-vue-0{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }
        #zingchart-vue-1{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }
        #zingchart-vue-2{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }
        #zingchart-vue-3{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }
        #zingchart-vue-4{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }
        #zingchart-vue-12{
          width:500px!important;
          height:500px!important;
          overflow:hidden;
        }
        #zingchart-vue-13{
          width:500px!important;
          height:500px!important;
          overflow:hidden;
        }
        #zingchart-vue-5{
          width:500px!important;
          height:500px!important;
          overflow:hidden;
        }
        #zingchart-vue-6{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }
        #zingchart-vue-7{
          width:300px!important;
          height:300px!important;
          overflow:hidden;
        }       
        .modal-content {
          background-color: #fefefe;
          margin-top: 3rem;
          margin-left: 30rem;
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
        }
  span{
    cursor: pointer;
  }
  </style>