import { defineStore } from 'pinia'

export const cvStream = defineStore({
  id: 'cv',
  state: () => ({
     isStream:false
  }),
  actions: {
    changeState(status){
       this.isStream=status
    },  
  },
  getters:{
    isStreamFunc(){
      return this.isStream
    },
}
})