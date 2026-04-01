import { defineStore } from 'pinia'

export const windowStore = defineStore({
  id: 'window',
  state: () => {
    return{
     minimize:false,
     width:"35vh",
     loading:false,
     height:"100vh"
    }
  },
  actions: {
    flash(status,message){
       this.status[status] = message
       this.popupMessage=true
    },  
    close(){
      this.status['success'] = ''
      this.status['error'] = ''
      this.status['warning'] = ''
      this.popupMessage=false
    }
  },
  getters:{
    getSuccessStatus(){
      return this.status['success']
    },
    getErrorStatus(){
      return this.status['error']
    },
    getWarningStatus(){
      return this.status['warning']
    }
}
})