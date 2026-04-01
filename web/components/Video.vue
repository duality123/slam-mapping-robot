<template>

                               <img id="streamImg" :src="url" alt="kkk" class="stream-img" >

    </template>
    <script>
    export default{
      props:{
        url:String
      },
      unmounted(){
       url=""
       document.getElementById("streamImg").src = "";
      }
    
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