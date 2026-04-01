import { userStore } from "~/stores/user";
import { windowStore } from "~/stores/window";
export default defineNuxtRouteMiddleware((to) => {
windowStore().loading = true
if (!userStore().token) {
  return navigateTo('/login')
}

  
       
})
