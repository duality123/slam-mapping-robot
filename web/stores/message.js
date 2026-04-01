import { defineStore } from 'pinia'

export const messageStore = defineStore({
  id: 'message',
  state: () => ({
     status:{success : '',error : '',warning : ''},
     base_status:{success : '',error : '',warning : ''},
     popupMessage:false
  }),
  actions: {
    flash(status,message){
       this.status[status] = message
       this.popupMessage=true
    },  
    reset(){
      this.status['success'] = ''
      this.status['error'] = ''
      this.status['warning'] = ''
      this.popupMessage=true
    },  
    base_reset(){
      this.base_status['success'] = ''
      this.base_status['error'] = ''
      this.base_status['warning'] = ''
      this.popupMessage=true
     },  
    base_flash(status,message){
      this.base_status[status] = message
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