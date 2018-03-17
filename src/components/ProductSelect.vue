<template>
  <select @change="productChange($event.target.value)">
      <option :value="-1"></option>
      <option v-for="(product, productIdx) in products" :value="productIdx">
          {{product.productname}} - ${{product.productprice}}
      </option>
  </select>
</template>


<script>

import { mapMutations, mapGetters } from 'vuex';

export default {
  name: "product-select",
  props: ["presupuestoProductIdx"],

  computed: {
    ...mapGetters([
      'products',
      'presupuestoProducts',
    ])
  },

  methods: {

    ...mapMutations({
      removePresupuestoProduct: 'REMOVE_PRESUPUESTO_PRODUCT',
      changePresupuestoProduct: 'CHANGE_PRESUPUESTO_PRODUCT',
    }),

    productChange(productIdx) {
      if (productIdx === "-1") {
        this.removePresupuestoProduct(this.presupuestoProductIdx);
      } else {
        this.changePresupuestoProduct({presupuestoProductIdx: this.presupuestoProductIdx, presupuestoProduct: this.products[productIdx]});
      }

      return;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
