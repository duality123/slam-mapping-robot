<template> 
    <header >
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav" aria-label="Ninth navbar example">
    
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="../assets/img/1.png" style="width:10vh;height:10vh;" class="me-3"/> SIMOKA {{workspace}}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dropdown" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="dropdown">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 navmobile">
          <li class="nav-item ">
            <a class="nav-link" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gauge']" />Dashboard</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'database']" />Data Logs</a>
          </li>
          <li>
            <a class="nav-link " aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'gears']" />APIs</a>
          </li>
        </ul>
        <h5>netal</h5>
      </div>
    </div>
  </nav>

  </header>
</template>

<script>
export default{
    props:{
        workspace:String
    },
    async created() {
      window.addEventListener("scroll", this.onScroll)
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll)
    },
    methods:{
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
      close(){
        this.message.status.success = ""
      }
    }

}
</script>