<template>
    <NuxtLayout name="base">
      <div :class='[window.minimize?"col-sm-1":"col-sm-2"]'>
        <Sidebar :minimize="window.minimize" :width="window.width" :height="window.height" @switchMinimize="switchMinimize()"/>
      </div>
  
            <div :class='[window.minimize?" col-xl-11":"col"]' class="text-white">
              <div class="mt-4">
          <div v-if="message.status.success" class="d-flex p-2 bd-highlight alert alert-success">
            <div class="p-2 flex-grow-1 bd-highlight">{{message.status.success}}</div>
            <div class="p-2 bd-highlight"><span @click="close()" aria-hidden="true">&times;</span></div>
          </div>
          <div v-if="message.status.warning" class="d-flex p-2 bd-highlight alert alert-warning">
            <div class="p-2 flex-grow-1 bd-highlight">{{message.status.warning}}</div>
            <div class="p-2 bd-highlight"><span @click="close()" aria-hidden="true">&times;</span></div>
          </div>
          <div v-if="message.status.error" class="d-flex p-2 bd-highlight alert alert-danger">
            <div class="p-2 flex-grow-1 bd-highlight">{{message.status.error}}</div>
            <div class="p-2 bd-highlight"><span @click="close()" aria-hidden="true">&times;</span></div>
          </div>
          <slot/>
          </div>
  
            </div>
         
    </NuxtLayout>
    </template>
    <script setup>
    import { userStore } from "~/stores/user";
    import { windowStore } from "~/stores/window";
    import Sidebar from "../components/Sidebar"
    import Navbar from "../components/Navbar"
    import { messageStore }  from "~/stores/message";
    const message = messageStore()
    const userInstance =userStore()
    const window =windowStore()
    const route = useRoute()
      definePageMeta({
        middleware: 'auth'
      })
      const switchMinimize=()=>{
        window.minimize=!window.minimize
        if(window.width=='35vh'){
          window.width='10vh'
        }
        else{
          window.width='35vh'
        }
      }
      const close=()=>{
        message.reset()
      }
    </script>
    <style scoped>
    span{
      cursor: pointer;
    }
     .main{
        margin-top: 1rem!important;
        margin-left: 15rem!important;
    }
    .custom-file-input::-webkit-file-upload-button {
      visibility: hidden;
    }
    .active a{
      color: white!important;
      font-size: 15px;
    
    }
    a{
            
            cursor:pointer;
          }
    a{
       font-size: 15px;
        text-decoration: none;
    }
    
    .custom-file-input::before {
      content: 'Upload Foto';
      display: inline-block;
      background: linear-gradient(top, #f9f9f9, #e3e3e3);
      border: 1px solid #999;
      border-radius: 3px;
      padding: 5px 8px;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      cursor: pointer;
      text-shadow: 1px 1px #fff;
      font-weight: 700;
      font-size: 10pt;
    }
    .custom-file-input:hover::before {
      border-color: black;
    }
    .custom-file-input:active::before {
      background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
    .custom-file-input{
      margin-left: 100px;
      width:30%;
    }
      h2{
      text-decoration:underline;
    }
    .profile{
      margin-left: 100px;
    }
    
    @media (max-width: 580px) {
     .responsive-item{
          display: block;
        }
     .profile{
      margin-left: 100px;
     }
     .list-group{
      width: 20rem;
     }
     .custom-file-input{
      margin-left: 110px;
      width:60%;
     }
     .main{
      margin-left: 1rem!important;
     }
    }
    </style>