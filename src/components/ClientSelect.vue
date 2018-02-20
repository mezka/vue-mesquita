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

export default {
  name: 'client-select',
  data(){
      return {
      };
  },
  props: ['clients'],

  methods: {
      clientChange(clientIndex){
        this.$emit('clientChange', clientIndex);
      }
  }
}
</script>

<style lang="scss" scoped>

</style>


