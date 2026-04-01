<template>
<NuxtLayout name="body">

		<div class="container-fluid">
		<div class="row justify-content-center">
			
<div class="col-md-6  mb-5">
<div class="card" >
  <div class="card-body">
  	<h2 class="text-center">Anda adalah ?</h2>
  <div class="form-check">
  <input v-model="pengepul"  class="form-check-input" type="checkbox" value="" id="flexCheckChecked" :checked="pengepul">
  <label class="form-check-label" for="flexCheckChecked">
    Pengepul
  </label>
</div>
<div class="form-check">
  <input v-model="perongsok"  class="form-check-input" type="checkbox" :checked="perongsok" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
   Perongsok
  </label>
</div>
<div class="form-check">
  <input v-model="tukang_rongsok" class="form-check-input" type="checkbox" :checked="tukang_rongsok" value="" id="flexCheckChecked" checked>
  <label class="form-check-label" for="flexCheckChecked">
    Tukang Rongsok
  </label>
</div>
  <button @click = "redirectTo" class="w-100 btn btn-lg btn btn-primary mt-2">
    Lanjut
</button>
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
import { ref,reactive } from 'vue';
export default{
  data(){
    return{
      redirect:null,
      tukang_rongsok:false,
      perongsok:false,
      pengepul:false
    }
  },
  watch:{
    perongsok(newValue,oldValue){
      if (newValue==true) {
        this.tukang_rongsok = false
        this.pengepul = false
        this.redirect = "/register/perongsok"
      }
    },
    tukang_rongsok(newValue,oldValue){
      if (newValue==true) {
        this.perongsok = false
        this.pengepul = false
        this.redirect = "/register/tukang_rongsok"
      }
    },
    pengepul(newValue,oldValue){
      if (newValue == true) {
        this.tukang_rongsok = false
        this.perongsok = false
        this.redirect = "/register/pengepul"
      }
    }
  },
    methods:{
      redirectTo(){
        return navigateTo(this.redirect)
      }
    }
  }
</script>
<style scoped>
</style>