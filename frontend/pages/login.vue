<template>
<NuxtLayout name="base">
		<div class="container-fluid mt-4">
		<div class="row justify-content-center">
			
<div class="col-md-6   mb-5">
<div class="card bg-dark-secondary" >
  <div class="card-body">
  	<h2 class="text-center text-white">Login</h2>
  	 <form @submit.prevent="submit">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label text-white">Username </label>
  <input v-model="form.username" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Isikan username anda">
    <small v-if = "form.errors.username" class="text-danger text-small">{{form.errors.username}}</small>
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label text-white">Password</label>
  <input v-model="form.password" type="password" class="form-control" id="exampleFormControlInput1" placeholder="Masukkan Password anda">
     <small v-if = "form.errors.password" class="text-danger text-small">{{form.errors.password}}</small>
</div>
<div class="mb-3">
<button type="submit" class="w-100 btn btn-lg btn btn-primary">
   Login
</button>
</div>
</form>
  </div>
</div>
</div>
</div>
	</div>
</NuxtLayout>
</template>
<script setup>
import { storeToRefs }  from "pinia";
import { messageStore }  from "~/stores/message";
import { userStore }  from "~/stores/user";
import jwt_decode from "jwt-decode";
import { windowStore }  from "~/stores/window";
import { ref,reactive,onMounted } from 'vue';
const  message = messageStore()  
const route = useRoute()
const auth = userStore()
const userInit = userStore()
onMounted(()=>{
  windowStore().loading=false
})
const form = ref({ password:"",
                   username:"",
                   errors:{}})
const submit = ()=>{
      const data = {
          username:form.value.username,
          password:form.value.password,
        }
      auth
      .login(data)
      .then(response=>{

      
      }).
      catch(error=>{
        console.log("test")
        console.log(error)
        form.value.errors.username= error['username']
        form.value.errors.password= error['password']
       })    
       
}
</script>
<style scoped>

</style>