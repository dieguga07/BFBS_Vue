import {defineStore} from  'pinia'



export const UserContext = defineStore('userState',{

    state: () =>({

        user:false,

    }),


    actions:{


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