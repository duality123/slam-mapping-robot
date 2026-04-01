<template>
    <div class="d-flex flex-column flex-shrink-0 text-white bg-dark sidenav" id="sidebar"  style="width: 10vh; height:100vh;">
        <ul class="nav nav-pills flex-column mb-auto text-white ">
          <li class="nav-item " :class="[route.name=='index'?'active':'']">
                <NuxtLink to="/" class="nav-link " :class="[route.name=='index'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gauge']" class="me-3" /></NuxtLink>
              </li>
              <li class="nav-item " :class="[route.name=='logs'?'active':'']">
                <NuxtLink :to="`/logs?page=1`" class="nav-link" :class="[route.name=='logs'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'database']" class="me-3"/></NuxtLink>
              </li>
              <li class="nav-item"  :class="[route.name=='settings'?'active':'']">
                <NuxtLink :to="`/settings`" class="nav-link " :class="[route.name=='settings'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gears']" class="me-3" /></NuxtLink>
              </li>
          <li class="nav-item ">
            <NuxtLink :to="`${useRuntimeConfig().public.backendURL}/docs`" target="_blank" class="nav-link" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'sitemap']" class="me-3" /></NuxtLink>
          </li>
          <li class="nav-item ">
                <NuxtLink class="nav-link " aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'chart-line']" class="me-3"/></NuxtLink>
              </li>
              <li class="nav-item"  :class="[route.name=='login'?'active':'']">
                <NuxtLink :to="`/login`" class="nav-link " :class="[route.name=='login'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'right-to-bracket']" class="me-3" /></NuxtLink>
              </li>
              <li class="nav-item"  :class="[route.name=='monitors'?'active':'']">
                <NuxtLink :to="`/login`" class="nav-link " :class="[route.name=='monitors'?'active':'']" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'desktop']" class="me-3" /></NuxtLink>
              </li>
        </ul>
      </div>
</template>
<script>
export default{
  data(){
      return{
        route:useRoute()
      }
  },
}
</script>
<style scoped>
.active{
  background-color:royalblue!important;
  color: #f1f1f1!important;
  width: 500px;
}
</style>