<template>

<div>
  <select @input="accessoryChange($event.target.value)">
      <option :value="-1"></option>
      <option v-for="(productAccessory, productAccessoryIndex) in cartItem.productaccessories" :value="productAccessoryIndex">
          {{productAccessory.productname}} - ${{productAccessory.productprice}}
      </option>
  </select>
</div>
</template>


<script>
export default {
    name: 'accessory-select',
    props: ['cart', 'cartIndex', 'cartAccessoryIndex'],

    data() {
        return {
            cartItem: this.cart[this.cartIndex],
        };
    },

    methods: {
        accessoryChange(productAccessoryIndex) {
            if (productAccessoryIndex === '-1') {
                console.log('true');
                this.$emit(
                    'removeAccessory',
                    this.cartIndex,
                    this.cartAccessoryIndex
                );
                return;
            }

            if (
                Object.keys(
                    this.cartItem.productselectedaccessories[
                        this.cartAccessoryIndex
                    ]
                ).length === 0 // eslint-disable-line
            ) {
                this.$set(
                    this.cartItem.productselectedaccessories,
                    this.cartAccessoryIndex,
                    Object.assign(
                        {},
                        this.cartItem.productaccessories[productAccessoryIndex]
                    ) // eslint-disable-line
                );

                this.$set(
                    this.cartItem.productselectedaccessories[
                        this.cartAccessoryIndex
                    ],
                    'productquantity',
                    1 // eslint-disable-line
                );
            } else {
                this.$set(
                    this.cartItem.productselectedaccessories,
                    this.cartAccessoryIndex,
                    Object.assign(
                        {},
                        this.cartItem.productaccessories[productAccessoryIndex]
                    ) // eslint-disable-line
                );

                this.$set(
                    this.cartItem.productselectedaccessories[
                        this.cartAccessoryIndex // eslint-disable-line
                    ],
                    'productquantity',
                    this.cartItem.productselectedaccessories[
                        this.cartAccessoryIndex // eslint-disable-line
                    ].productquantity // eslint-disable-line
                );
            }

            this.$set(
                this.cartItem.productselectedaccessories[
                    this.cartAccessoryIndex
                ],
                'productdiscount',
                0 // eslint-disable-line
            );
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
