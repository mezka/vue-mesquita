<template>
  <select @change="productChange($event.target.value)">
      <option :value="-1"></option>
      <option v-for="(product, productIndex) in products" :value="productIndex">
          {{product.productname}} - ${{product.productprice}}
      </option>
  </select>
</template>


<script>
export default {
    name: 'product-select',
    props: ['products', 'cart', 'cartIndex'],

    methods: {
        productChange(productIndex) {
            if (productIndex === '-1') {
                console.log('true');
                this.$emit('removeProduct', this.cartIndex);
                return;
            }

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

            this.$emit('input', productIndex);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
