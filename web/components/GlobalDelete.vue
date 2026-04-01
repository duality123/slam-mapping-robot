<template>
    <div class="col-lg-8">

<div id="myModal" class="modal" v-if="popup">
<div class="modal-content">
<div class=" d-flex justify-content-end">
<button @click="$emit('toggleClose')" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class=" d-flex justify-content-between">
<img src="../assets/img/alert.png" style="width: 50%; margin-left: 8rem;">
</div>
<div class="d-flex justify-content-center text-center mt-4" style="margin-left: 2rem;">
   <h6 class="text-danger">{{pesan}}</h6>
</div>
<div class="d-flex flex-column flex-lg-row justify-content-center gap-3 gap-lg-4 mt-1">
     <button @click="$emit('toggleClose')" class="btn btn-primary text-primary-blue-6 text-white py-2 border-5">Batal</button>
     <button @click="hapusAction()" class="btn btn-outline-primary py-2 btn_custom_outline">
         Ya</button>
 </div>
</div>
</div>
</div>
</template>
<script>
import { messageStore }  from "~/stores/message";
import { userStore }  from "~/stores/user";
export default{
data(){
    return {
        message:messageStore(),
        user:userStore()
    }
},
props:{
   id:String,
   pesan:String,
   url:String,
   popup:Boolean,
 },
methods:{
   async hapusAction(){
       await $fetch(`${useRuntimeConfig().public.backendURL}/api/${this.url}/${this.id}`, {
         headers: {
                  "Authorization":`Bearer ${this.user.token}`,
                },
                 method: 'DELETE',
               })
                 .then(response => {
                    this.message.base_flash("success","Item berhasil dihapus")
                    this.$emit('deleteInEmitter')
                 
                 })

                 .catch(error => {
                  return navigateTo("/login")
                   console.log(error)
                 }) 
   },
   
}
}
</script>
<style scoped>
.btn_custom_outline:hover {
   color: #FFFFFF !important;
}
.close{
 border-width: 0px;
 background-color: white;
}

.modal-content{
 height: 500px;
 overflow-y: auto;
}
 .modal {
 position: fixed; /* Stay in place */
 padding-top: 30px; /* Location of the box */
 left: 0;
 display: block;
 top: 0;
 width: 100%; /* Full width */
 height: 100%; /* Full height */
 overflow: auto; /* Enable scroll if needed */
 background-color: rgb(0,0,0); /* Fallback color */
 background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
}
/* Modal Content */
.modal-content {
 background-color: #fefefe;
 margin-top: 3rem;
 margin-left: 25rem;
 padding: 20px;
 border-radius: 25px;
 width: 40%;
 text-align: center;
}
@media (max-width: 575.98px) {
 .modal-content{
   margin-left: 3rem;
   margin-top: 5rem;
   width: 450px;
 }
}
.modal {
 position: fixed; /* Stay in place */
 padding-top: 40px; /* Location of the box */
 left: 0;
 display: block;
 top: 0;
 width: 100%; /* Full width */
 height: 100%; /* Full height */
 overflow: auto; /* Enable scroll if needed */
 background-color: rgb(0,0,0); /* Fallback color */
 background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
 background-color: #fefefe;
 margin-top: 3rem;
 margin-left: 25rem;
 padding: 20px;
 border-radius: 25px;
 width: 40%;
 height:450px;
 text-align: center;
}
.hide{
 display: none;
}
.show{
 display: block;
}

.close{
 background-color: transparent;
 border:none;
}

</style>