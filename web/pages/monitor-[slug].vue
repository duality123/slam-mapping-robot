<template>
    <NuxtLayout name="body" :workspace="workspace">
                <!-- Sale & Revenue Start -->
                <div class="container-fluid  pt-2 px-4">
                    <div class="container-fluid zing-container-1 pt-2 px-1">
                    <div class="row g-4">
                        <div class="col-sm-6"  >
                                <div class="container">
                              <div class="d-flex align-items-center justify-content-between mb-4">
                                  <h6>Camera Monitor | Brightness: {{ parseInt(this.currentBrightness * 100) }} %</h6>
                                </div>
                             <Video id="videoIn" style="width:450px;" :url="this.stream_img"></Video>
                             </div> 
                              <div class="container row mt-4">
                             <div class="col-sm-6"><button @click="increaseBrightness" type="button" class="btn btn-primary">Increase Brightness +10%</button></div>
                               <div class="col-sm-6"><button @click="decreaseBrightness" type="button" class="btn btn-danger text-white">Decrease Brightness -10% </button></div>
                            </div>
                            </div>
                            <div  class=" col-sm-4">
                              <div class="container">
                                      <Map />
</div>
                            </div>
    
                    </div>
                  </div>
                    </div>
    </NuxtLayout>
    </template>
    <script>
    import Map from "../components/Map.vue"
    import { userStore }  from "~/stores/user";
    import { windowStore }  from "~/stores/window";
    import { cvStream }  from "~/stores/cvstream";
    export default{
      data(){
        return{
          layout:"base",
          stream_img:"http://192.168.1.6:81/stream",
          meanPanjang:null,
          kecepatanPrediksi:null,
          route:useRoute(),
          user:userStore(),
          objectCount:null,
          route:useRoute(),
          video:null,
          currentBrightness:null,
          workspace:"",
          ws:null,
          ws_fish:null,


      }},        
      components:{
        Map
      },
      created(){
        //this.stream_img = ""
        this.user.getUserData();
        this.workspace=' - '+ this.route.params.slug

      },
      async unmounted(){
        this.stream_img = ""
        cvStream().changeState(false)
        this.ws_fish.close()
        this.ws_fish = null
      },
      async mounted(){
        //await this.fetchMonitorData()
    this.video = document.getElementById('videoIn');
    this.currentBrightness = 1.0;

  },
  methods:{
    updateBrightness() {
        // Apply the CSS filter style
        this.video.style.filter = `brightness(${this.currentBrightness * 100}%)`;
    },

    increaseBrightness() {
        this.currentBrightness += 0.1; // Increase brightness by 10%
        this.updateBrightness();
    },

    decreaseBrightness() {
        this.currentBrightness -= 0.1; // Decrease brightness by 10%
        if (this.currentBrightness < 0) this.currentBrightness = 0; // Prevent negative values
        this.updateBrightness();
    }
  },

    }
    
    </script>
    <style scoped>
    
    </style>
    <style>
    #map { 
      width: 350px;
      height: 350px; 
    }
    .zing-container-0{
      max-width:1090px!important;
      max-height:1000px!important;
      overflow:hidden;
    }
    .zing-graph{
      max-width:300px!important;
      max-height:300px!important;
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
    @media (max-width: 580px) {
      .stream-img{
        width:300px!important;
        height:300px!important;
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
    }
    </style>