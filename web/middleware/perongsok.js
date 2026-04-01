import { userStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to) => {

if (!userStore().userData.user.Role != 2) {
  return navigateTo('/login')
}

  
       
})
