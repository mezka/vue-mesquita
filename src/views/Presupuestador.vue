<template>
    <select v-model="selected">
        <option v-bind:key="product.productId" v-for="product in products" v-bind:value="product.productName">
            {{ product.productName }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'home-content',
    data() {
        return {
            selected: null,
            products: [
                {
                    productId: 1,
                    productName: 'Puerta Cortafuego RF60',
                    productMeasurements: '0900x2000mm PL, 1000x2050mm MT',
                    productEquipsProductId: null,
                },
            ],
            accessories: [
                {
                    productId: 2,
                    productName: 'Barral Antipanico JAQUE Push',
                    productMeasurements: null,
                    productEquipsProductId: 1,
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>

</style>
