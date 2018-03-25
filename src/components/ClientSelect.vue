<template>
  <select @input="clientChange($event.target.value)">
      <option :value="-1"></option>
      <option v-for="(client, clientIndex) in clients" :value="clientIndex">
          {{client.clientname}}
      </option>
  </select>
</template>

<script>

import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'client-select',
  
  computed: {
    ...mapState([
        'clients',
    ]),
  },

  methods: {

    ...mapMutations({
        changePresupuestoClient: 'CHANGE_PRESUPUESTO_CLIENT',
    }),

    clientChange(clientIndex){
        if(clientIndex !== '-1'){
            this.changePresupuestoClient(this.clients[clientIndex]);
        } else {
            this.changePresupuestoClient({});
        }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


