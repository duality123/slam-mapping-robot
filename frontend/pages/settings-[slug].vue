<template>
    <NuxtLayout name="body">
      <div id="myModal" class="modal" v-if="editColsModal">
<div class="modal-content-col">
<div class=" d-flex justify-content-end">
<button @click="closeCol()" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div >
  <form @submit.prevent="postEditCol()">
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label text-dark">Column Name</label>
    <input v-model="editColsForm['value']['name']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="editColsForm['errors']['name']" class="text-danger text-small">{{ newColsForm['errors']['name'] }}</small>
    <div id="emailHelp" class="form-text">Nama column di dashboard anda.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label text-dark">Column Type</label>
    <select v-model="newColsForm['value']['type']" class="form-select form-select-sm" aria-label=".form-select-sm example">
      <option disabled value="">Pilih type column</option>
        <option>Number</option>
        <option>Line-chart</option>
        <option>Gauge</option>
        <option>Camera</option>
    </select>
    <small v-if="newColsForm['errors']['type']" class="text-danger text-small">{{ newColsForm['errors']['name'] }}</small>
    <div id="emailHelp" class="form-text">Type column di dashboard anda.</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</div>
</div>
      <div id="myModal" class="modal" v-if="colsModal">
<div class="modal-content-col">
<div class=" d-flex justify-content-end">
<button @click="closeCol()" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div >
  <form @submit.prevent="postNewCol()">
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label text-dark">Column Name</label>
    <input v-model="newColsForm['value']['name']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="newColsForm['errors']['name']" class="text-danger text-small">{{ newColsForm['errors']['name'] }}</small>
    <div id="emailHelp" class="form-text">Nama column di dashboard anda.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label text-dark">Column Type</label>
    <select v-model="newColsForm['value']['type']" class="form-select form-select-sm" aria-label=".form-select-sm example">
      <option disabled value="">Pilih type column</option>
        <option>Number</option>
        <option>Line-chart</option>
        <option>Gauge</option>
        <option>Camera</option>
    </select>
    <small v-if="newColsForm['errors']['type']" class="text-danger text-small">{{ newColsForm['errors']['name'] }}</small>
    <div id="emailHelp" class="form-text">Type column di dashboard anda.</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</div>
</div>
<div id="myModal" class="modal" v-if="sectionsModal">
<div class="modal-content">
<div class=" d-flex justify-content-end">
<button @click="toggleCloseSection()" type="button" class="close" data-dismiss="modal" aria-label="Close" style="max-width: 20px;">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div class="d-flex flex-column flex-lg-row justify-content-center gap-3 gap-lg-4 mt-1">
  <form @submit.prevent="postNewSect()">
  <div class="mb-3">
    <label for="exampleInputEmail1 " class="form-label text-dark">Section Name</label>
    <input v-model="newSectionName['value']" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small v-if="newSectionName['error']" class="text-danger text-small">{{ newSectionName['error'] }}</small>
    <div id="emailHelp" class="form-text">Nama section di dashboard anda.</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</div>
</div>

      <div class="container-fluid mt-8" >
        <div class="container-fluid mt-8" v-for="(section,i) in sections" >
            <h3 class="text-center ">
              {{ section.name }}
              <span class="position-absolute translate-middle badge rounded-pill add" style="margin-left:15px">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="dropdown-toggle add" data-bs-toggle="dropdown" aria-expanded="false"/>
                <ul class="dropdown-menu">
                                  <li><a @click="changeEditSection(i)" class="dropdown-item add" href="#">Edit</a></li>
                                  <li><a  @click="deleteSection(section.id,i)" class="dropdown-item add" href="#">Delete</a></li>
                                </ul>  
                <span class="visually-hidden">unread messages</span>
                </span>
            </h3>
            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-9 col-md-4" v-for="item in section['cols']">
                        <div class="bg-dark-secondary rounded p-4 ">
                          <div class="d-flex justify-content-end bd-highlight">
                            <div class="p-2">
                              <div class="dropdown">
                                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="dropdown-toggle add" data-bs-toggle="dropdown" aria-expanded="false"/>
                                <ul class="dropdown-menu">
                                  <li><a class="dropdown-item add" href="#">Edit</a></li>
                                  <li><a class="dropdown-item add" href="#">Delete</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                            <div class="ms-3">
                              <p>Name : {{ item['name'] }}</p>
                              <p>Type : {{ item['type'] }}</p>
                          </div>
                        </div>
                    </div>
                    <div class="col-sm-9 col-xl-4">
                        <h1><font-awesome-icon :icon="['far', 'square-plus']" class="add" @click="addCol(section.id,i)"/></h1>
                    </div>

                </div>
            </div>           
            
        </div>
        <div class="mt-4 d-flex justify-content-center">
            <h3 @click="addSections()"  class="text-center add-section">+ Add Section</h3>
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
          colsModal:false,
          scrollPos:0,
          newColsForm:{'value':{'rows_id':"","index":"",'name':'','type':""},'errors':{'name':""}},
          newSectionName:{"value":"","error":""},
          sectionsModal:false,
          redirect:null,
          tukang_rongsok:false,
          perongsok:false,
          showOptions:false,
          pengepul:false,
          hideButton:true,
          route:useRoute(),
          sections:[],
          editColsModal:false,
          col:[],
          user:userStore(),
          token:userStore().token
        }
      },
      mounted(){
        document.addEventListener('DOMContentLoaded', function() {
            var input = document.querySelector("input");

            input.addEventListener('input', function() {
              this.style.width = (this.value.length + 1) + 'ch'; // Added 1 for better visual adjustment
            });
          });
                },
      async created(){
        await this.user.getUserData()
        await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors_rows/${this.route.params.slug}`, {
              headers: {
                Accept:"application/json",
                "Authorization":`Bearer ${this.user.token}`,
              },
              method: 'GET'
            })
              .then(response => {
                this.sections=response.data
                console.log(this.sections)
              
              })

              .catch(error => {
                console.log(error)
              })        
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
          closeTabOptions(){
            this.showOptions = false
          },
          showTabOptions(){
            this.showOptions = true
            console.log("FCUC")
          },
          redirectTo(){
            return navigateTo(this.redirect)
          },
          hideButtoFunc(){
            this.hideButton = true;
          },
          unHideButtoFunc(){
            this.hideButton = false;
          },
          async postEditRow(){
            var data = {'name':this.newSectionName['value']}
            console.log(data)
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors_rows/${this.newColsForm['value']['rows_id']}`, {
                  headers: {
                          Accept:"application/json"

                    },
                    method: 'PUT',
                    body: JSON.stringify(data)
                  })
                  .then(response => {
                    this.sections[this.newColsForm['value']['index']]['cols'].push(response)
                    this.colsModal=false
                    this.newColsForm['value']['name'] =''
                    this.newColsForm['value']['type'] =''
                  
                  })

                  .catch(error => {

                    this.newColsForm['errors'] =error.data
                  })  
          },
          async postNewCol(){
            const data = {'type':this.newColsForm['value']['type'],'name':this.newColsForm['value']['name']}
            console.log(data)
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors_cols/${this.newColsForm['value']['rows_id']}`, {
                  headers: {
                          Accept:"application/json"

                    },
                    method: 'POST',
                    body: JSON.stringify(data)
                  })
                  .then(response => {
                    this.sections[this.newColsForm['value']['index']]['cols'].push(response)
                    this.colsModal=false
                    this.newColsForm['value']['name'] =''
                    this.newColsForm['value']['type'] =''
                  
                  })

                  .catch(error => {

                    this.newColsForm['errors'] =error.data
                  })  
          },
          async postNewSect(){
            var data = {'name':this.newSectionName['value']}
            console.log(data)
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors_rows/${this.route.params.slug}`, {
                  headers: {
                          Accept:"application/json"

                    },
                    method: 'POST',
                    body: JSON.stringify(data)
                  })
                  .then(response => {
                    this.sections.push(response)
                    console.log(response._id)
                    this.sectionsModal=false
                    this.newSectionName['value'] =''
                  
                  })

                  .catch(error => {

                    this.newSectionName['error'] =error.data.name
                  })  
          },
          changeEditSection(index){
            console.log(index)
          },
          addSections(){
            this.sectionsModal=true
            this.newSectionName['value'] =''
            this.newSectionName['error'] =''
          },
          addCol(rowsId,index){
            this.colsModal=true
            this.newColsForm['value']['index'] =index
            this.newColsForm['value']['rows_id'] =rowsId
            
          },
          closeCol(){
            this.colsModal=false
            
          },
         async deleteSection(id,index){
          var id= id
            await $fetch(`${useRuntimeConfig().public.backendURL}/api/monitors_rows/${id}`, {
                  headers: {
                          Accept:"application/json"

                    },
                    method: 'delete',
                  })
                  .then(response => {
                    c
                  })
                  .catch(error => {
                    console.log(error)
                  })              
          },
          toggleCloseSection(){
            this.sectionsModal=false
          }
        }
      }
    </script>
    <style scoped>
    .hideButton{
      cursor:pointer;
    }
    .add{

        cursor: pointer;
    }
    
    </style>
    <style scoped>
    .btn_custom_outline:hover {
        color: #FFFFFF !important;
    }
    .close{
      border-width: 0px;
      background-color: white;
    }
    
    .add-section{
      border-style: solid;
      border-color:#FFFFFF;
      border-width: 8px;
      width:300px;
      cursor:pointer;
      text-align:center;
    }
    a{
      cursor:pointer;
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
      margin-left: 35rem;
      padding: 20px;
      border-radius: 25px;
      width: 450px;
      height:250px;
      text-align: center;
    }
    .modal-content-col {
      background-color: #fefefe;
      margin-top: 3rem;
      margin-left: 35rem;
      padding: 20px;
      border-radius: 25px;
      width: 450px;
      height:550px;
      text-align: start;
    }
    .hide{
      display: none;
    }
    .show{
      display: block;
    }
    .container-fluid{
      margin-top: 8vh!important;
    }
    .modal-close{
      background-color: transparent;
      border:none;
    }
    
    </style>
    