import { userStore }from "~/stores/user";
export default defineNuxtPlugin(nuxtApp => {
  const userInstance = userStore()
  if (typeof window !== 'undefined') {

      userInstance.user = localStorage.getItem('user')
  }
})