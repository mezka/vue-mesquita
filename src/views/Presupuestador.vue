<template>
    

    <div class="wrapper">
        <div v-for="n in entries" :key="n">
            <select v-model="selected[n]">
                <option v-for="product in products" v-bind:value="product">
                    {{ product.productName }}
                </option>
            </select>

            <p>{{selected[n]}}</p>
            <button v-on:click="addEntry">Add entry</button>    
        
        </div>
            
    <p>{{entries}}</p>
    <p>{{selected}}</p>
    </div>

</template>

<script>
export default {
    name: 'home-content',
    data() {
        return {
            entries: 2,
            selected: [],
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
    methods: {
        addEntry() {
            console.log(this.entries);
            this.entries += 1;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
