<template>
  <select @input="productChange($event.target.value)">
      <option :value="{}"></option>
      <option v-for="(product, productIndex) in products" :value="productIndex">
          {{product.productname}} - ${{product.productprice}}
      </option>
  </select>
</template>


<script>
export default {
    name: 'product-select',
    props: ['value', 'products', 'cart', 'cartIndex'],

    methods: {
        productChange(productIndex) {
            if (Object.keys(this.cart[this.cartIndex]).length !== 0) {
                this.$set(
                    this.cart,
                    this.cartIndex,
                    Object.assign(
                        {
                            productquantity: this.cart[this.cartIndex]
                                .productquantity,
                        },
                        this.products[productIndex] // eslint-disable-line
                    ) // eslint-disable-line
                );

                this.$set(
                    this.cart[this.cartIndex],
                    'productselectedaccessories',
                    [] // eslint-disable-line
                );
            } else {
                this.$set(
                    this.cart,
                    this.cartIndex,
                    Object.assign(
                        {
                            productquantity: 1,
                        },
                        this.products[productIndex] // eslint-disable-line
                    ) // eslint-disable-line
                );

                this.$set(
                    this.cart[this.cartIndex],
                    'productselectedaccessories',
                    [] // eslint-disable-line
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
