import { defineStore } from 'pinia'
import { userStore }  from "~/stores/user";
//const userInstance = userStore()
export const formStore = defineStore({
  id: 'form',
  state: () => ({

  }),
  actions: {
    async post(url,data) {
     console.log(userInstance.token)
     await $fetch(`${useRuntimeConfig().public.backendURL}/${url}`, {
        headers: {
                "Content-Type": "multipart/form-data",
                Accept:"application/json",
                "Authorization":`Bearer ${userInstance.token}`,

        },
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(response => {

        })
        .catch(error => {throw error.data })
      },

  },
})