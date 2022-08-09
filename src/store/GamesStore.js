import { defineStore } from 'pinia'


export const gamesStore = defineStore('games', {
    state: () => ({ 
        count: 0,
        iseighteen: false,
     }),
    actions: {
        increment() {
          this.count++
        },
        confirmEighteen() {
            this.iseighteen = true
        }
    }
});