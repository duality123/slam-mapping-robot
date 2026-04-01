import { defineStore } from 'pinia'
import jwt_decode from "jwt-decode";
export const userStore = defineStore('user',{
  state: () => {	
    return {
      userData:null,
      token:JSON.parse(localStorage.getItem("token")),
      token_active:false,
      interval:null,
      loading:false,
      authenticated:false
    }
  },
  actions: {
    async getUserData(){
      this.userData = JSON.parse(localStorage.getItem('user'))
    },
    async login(loginForm) {
      await $fetch(`${useRuntimeConfig().public.backendURL}/api/login`, {
         headers: {
                Accept:"application/json"

        },
        method: 'POST',
        body: JSON.stringify(loginForm)
      })
        .then(response => {
          console.log(response.token)
          this.token=response.token;
          let decodedHeader = jwt_decode(this.token);
          localStorage.setItem('token', JSON.stringify(this.token))

          ///decodedHeader = JSON.parse(decodedHeader);
          console.log(decodedHeader)
          let user =JSON.stringify(decodedHeader.upn)
          
          localStorage.setItem('user', user)
          this.userData = JSON.parse(user)
          console.log(this.userData)
          if (this.userData.roles.includes('1')){
            return navigateTo("/home-admin")
          }

          else{
              return navigateTo("/home")
          }

          })
         
        .catch(error => {throw error.data})
    },
     async updateUser(url,data) {
      console.log(data.get('Email'))
         await $fetch(`${useRuntimeConfig().public.backendURL}/${url}`, {
           headers: {
                "Authorization":`Bearer ${this.token}`,
              },
            method: 'POST',
            body: data
          })
          .then(response => {
            this.token=response.token;
            let decodedHeader = jwt_decode(this.token);
            localStorage.setItem('token', JSON.stringify(this.token))
  
            ///decodedHeader = JSON.parse(decodedHeader);
            console.log(decodedHeader)
            let user =JSON.stringify(decodedHeader)
            
            localStorage.setItem('user', user)
            this.userData = user
            console.log(this.userData)
            
            })
            .catch(error => {throw error })
      },
       async updateAlamat(url,data) {
         await $fetch(`${useRuntimeConfig().public.backendURL}/${url}`, {
           headers: {
                "Authorization":`Bearer ${this.token}`,
              },
            method: 'POST',
            body: JSON.stringify(data)
          })
          .then(response => {
            
              this.userData.user=response.user
              this.userData.profile=response.user.Profile
              localStorage.setItem('user', JSON.stringify(this.userData.user))
              localStorage.setItem('profile', JSON.stringify(this.userData.profile))

            
            })
            .catch(error => {throw error.data })
      },
    async register(registerForm) {
     await $fetch(`${useRuntimeConfig().public.backendURL}/register`, {
        headers: {
                "Content-Type": "multipart/form-data",
                Accept:"application/json"

        },
        method: 'POST',
        body: JSON.stringify(registerForm)
      })
        .then(response => {
          this.token=response.token;
          let decodedHeader = jwt_decode(this.token);
          localStorage.setItem('token', JSON.stringify(this.token))

          ///decodedHeader = JSON.parse(decodedHeader);
          console.log(decodedHeader)
          let user =JSON.stringify(decodedHeader)
          
          localStorage.setItem('user', user)
          this.userData = user
        })
        .catch(error => {throw error.data })
      },
    
    logout() {
      clearInterval(this.interval)
      this.interval = null
      this.userData =null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    check_token(){
      var token = JSON.parse(localStorage.getItem("token"))
      console.log(token)
      if ( token != null){
        $fetch(`${useRuntimeConfig().public.backendURL}/api/verify-token`, {
          headers: {
                 "Authorization":`Bearer ${token}`,
 
         },
         method: 'GET',
       })
         .then(response => {
           this.token=token
           this.authenticated= true
           return true
          })
         .catch(error => {return false})

      }
      else {
        return false
      }
    }
  },
  getters:{
  }
})


/*
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const userStore = defineStore('user', () => {
  const userData =ref({user:null,profile:null});
  let authenticated = ref(false)
  const token = ref(JSON.parse(localStorage.getItem('token')));
  const interval = ref(null); 
  /*
  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
    user.value = JSON.parse(localStorage.getItem('token'))
  }
  
  $fetch(`${useRuntimeConfig().public.backendURL}/get_user`,{
         headers: {
                "Content-Type": "multipart/form-data",
                "accept":"application/json",
                "Authorization":`Bearer ${token.value}`,

        },
        method: 'POST',

      })
      .then(response=>{
          userData.value.user =response.user
          token.value=response.token
          userData.value.profile=response.user.Profile
          authenticated.value = true
      })
      .catch(error => {
         logout()
         navigateTo('/login')
         return  false
      })
    

  const login =async(loginForm)=> {
    await $fetch(`${useRuntimeConfig().public.backendURL}/login`, {
         headers: {
                "Content-Type": "multipart/form-data",
                Accept:"application/json"

        },
        method: 'POST',
        body: JSON.stringify(loginForm)
      })
        .then(response => {
           
          userData.value.user =response.user
          token.value=response.token
          userData.value.profile=response.user.Profile
          authenticated.value = true
          localStorage.setItem('token', JSON.stringify(token.value))

          

        })
        .catch(error => {throw error.data})
  }
   const updateUser = async(url,data)=> {
      console.log(data.get('Email'))
         await $fetch(`${useRuntimeConfig().public.backendURL}/${url}`, {
           headers: {
                "Authorization":`Bearer ${token.value}`,
              },
            method: 'POST',
            body: data
          })
          .then(response => {
            
              userData.value.user =response.user
            userData.value.profile=response.user.Profile
            
            })
            .catch(error => {throw error.data })
      }
    const register =async(registerForm)=>{
     await $fetch(`${useRuntimeConfig().public.backendURL}/register`, {
        headers: {
                "Content-Type": "multipart/form-data",
                Accept:"application/json"

        },
        method: 'POST',
        body: JSON.stringify(registerForm)
      })
        .then(response => {
          userData.value.user =response.user
          token.value=response.token
          userData.value.profile=response.user.Profile
          authenticated.value = true
           localStorage.setItem('token', JSON.stringify(token.value))
        })
        .catch(error => {throw error.data })
      }
    
   const logout=()=> {
      clearInterval(interval.value)
      interval.value=null
      userData.value = {user:null,profile:null}
      token.value = null
      localStorage.removeItem('token')
    }

   const check_token=async()=>{
      await $fetch(`${useRuntimeConfig().public.backendURL}/check_token`,{
         headers: {
                "Content-Type": "multipart/form-data",
                "accept":"application/json",
                "Authorization":`Bearer ${token.value}`,

        },
        method: 'GET',

      })
      .then(response=>{
        return  true
      })
      .catch(error => {
         logout()
         navigateTo('/login')
         return  false
      })
    }
  return { userData, token,login,check_token,register,logout,updateUser }
})
*/