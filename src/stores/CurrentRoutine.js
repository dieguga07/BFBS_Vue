import {defineStore} from  'pinia'



export const CurrentRoutine = defineStore('currentRoutine',{

    state: () =>({

        routine:[]

    }),


    actions:{

        addExercise(exercise) {
            this.routine.push(exercise);
        },

      },

      persist: {
        enabled:true,
        strategies:[
          {
            key:"currentRoutine",
            storage: localStorage,
          },
         
        ]
      }



})