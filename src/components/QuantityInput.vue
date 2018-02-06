<template>
  <span>
      <input type="number" ref="input" v-bind:value="value" v-on:input="formatQuantity($event.target.value)">
  </span>
</template>

<script>
export default {
    name: 'quantity-input',
    props: ['value'],

    methods: {
        formatQuantity(quantity) {
            const formattedQuantity = quantity < 1 ? 1 : quantity;

            if (quantity !== formattedQuantity) {
                this.$refs.input.value = formattedQuantity;
            }

            this.$emit('input', formattedQuantity);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
