<template>
  <span>
      <input class="discount-input" type="number" ref="input" v-bind:value="value" v-on:input="formatDiscount($event.target.value)">
  </span>
</template>

<script>
export default {
    name: 'discount-input',
    props: ['value'],

    methods: {
        formatDiscount(discount) {
            const formattedDiscount =
                discount < 0 ? 0 : discount > 100 ? 100 : discount; // eslint-disable-line

            if (discount !== formattedDiscount) {
                this.$refs.input.value = formattedDiscount;
            }

            this.$emit('input', formattedDiscount);
        },
    },
};
</script>

<style lang="scss" scoped>
.discount-input {
    width: 45px;
}
</style>
