import {defineStore} from  'pinia'



export const UserContext = defineStore('userState',{

    state: () =>({
        name:"",
        email:"",
        token:"",
        admin:false

    }),


    actions:{
      setName(newState) {
        this.name = newState
      },

      setEmail(newState) {
        this.email = newState
      },

      setToken(newState){
        this.token = newState
      },

      setAdmin(newState){
        this.admin = newState
      }

      },

      persist: {
        enabled:true,
        strategies:[
          {
            key:"user",
            storage: localStorage,
          },
         
        ]
      }



})