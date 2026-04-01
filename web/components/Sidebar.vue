<template>
    <div class="d-flex flex-column flex-shrink-0 text-white bg-dark sidenav"   id="sidebar"  :style='`width:${width}; height:${height};`' >
        <ul class="nav nav-pills flex-column mb-auto text-white"  v-if="!this.minimize">
          <li class="nav-item" >
                <a class="nav-link " aria-current="page" ><font-awesome-icon :icon="['fas', 'minimize']" class="me-3" @click="$emit('switchMinimize')" /></a>
              </li>
        <li class="nav-item" :class="[route.name=='index'?'active':'']">
                <NuxtLink :to="`/dashboard-${$route.params.slug}`" class="nav-link " :class="[route.name.split('-')[0]=='dashboard'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gauge']" class="me-3" />Dashboard</NuxtLink>
              </li>
              <li class="nav-item" :class="[route.name=='index'?'active':'']">
                <NuxtLink :to="`/monitor-${$route.params.slug}`" class="nav-link " :class="[route.name.split('-')[0]=='monitor'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'desktop']" class="me-3" />Camera Monitor</NuxtLink>
              </li>
              <li class="nav-item " :class="[route.name=='logs'?'active':'']">
                <NuxtLink :to="`/logs-${route.params.slug}?page=1&graph=mean`" class="nav-link" :class="[route.name.split('-')[0]=='logs'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'database']" class="me-3"/>Data Logs</NuxtLink>
              </li>

          <li class="nav-item ">
            <NuxtLink :to="`${useRuntimeConfig().public.backendURL}/docs`" target="_blank" class="nav-link" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gear']" class="me-3" />APIs</NuxtLink>
          </li>
          <li class="nav-item ">
                <NuxtLink class="nav-link " aria-current="page" ><font-awesome-icon :icon="['fas', 'chart-line']" class="me-3"/>Prediksi</NuxtLink>
              </li>
              <li  class="nav-item"  :class="[route.name=='monitors'?'active':'']">
                <NuxtLink :to="`/home-admin`" class="nav-link " :class="[route.name=='monitors'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" class="me-3"/>Home</NuxtLink>
              </li>

        </ul>
 
        <ul class="nav nav-pills flex-column mb-auto text-white justify-content-between"  v-else >
          <li class="nav-item ml-1" >
                <a class="nav-link px-4  "  aria-current="page" ><font-awesome-icon :icon="['fas', 'maximize']" class="me-3" @click="$emit('switchMinimize')" /></a>
              </li>
          <li class="nav-item " :class="[route.name=='index'?'active':'']">
                <NuxtLink :to="`dashboard-${route.params.slug}`" class="nav-link px-4 " :class="[route.name.split('-')[0]=='dashboard'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gauge']" class="me-3" /></NuxtLink>
              </li>
              <li class="nav-item" :class="[route.name=='monitor'?'active':'']">
                <NuxtLink :to="`/monitor-${$route.params.slug}`" class="nav-link px-4" :class="[route.name.split('-')[0]=='monitor'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'desktop']" class="me-3" /></NuxtLink>
              </li>
              <li class="nav-item " :class="[route.name=='logs'?'active':'']">
                <NuxtLink :to="`/logs-${route.params.slug}?page=1&graph=mean`" class="nav-link px-4" :class="[route.name.split('-')[0]=='logs'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'database']" class="me-3"/></NuxtLink>
              </li>
          <li class="nav-item ">
            <NuxtLink :to="`${useRuntimeConfig().public.backendURL}/docs`" target="_blank" class="nav-link px-4" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'sitemap']" class="me-3" /></NuxtLink>
          </li>
          <li class="nav-item ">
            <NuxtLink class="nav-link px-4 " aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'chart-line']" class="me-3"/></NuxtLink>
          </li>

          <li class="nav-item"  :class="[route.name=='monitors'?'active':'']">
            <NuxtLink :to="`/home`" class="nav-link px-4" :class="[route.name=='monitors'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" class="me-3" /></NuxtLink>
          </li>
        </ul>
      </div>
</template>
<script>
import { userStore }  from "~/stores/user";
export default{
  data(){
      return{
        user:userStore(),
        route:useRoute()
      }
  },
  created(){
    this.user.getUserData()
  },
  props:{
    minimize:Boolean,
    width:String,
    height:String
  },
  computed:{
    minimizeSide(){
      return this.minimize
    }
  }
}
</script>
<style scoped>
.active{
  background-color:royalblue!important;
  color: #f1f1f1!important;
  width: 500px;
}
button{
  color: #818181;
}
a{
  color: #818181;
}
.sidenav button:hover {
  color: #f1f1f1;
}
</style>
<style>
.collapse-style{
  width: 10vh; 
  height:100vh;
}
.expand-style{
  width: 40vh; 
  height:100vh;
}
</style>