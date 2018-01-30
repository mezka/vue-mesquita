<template>
    

    <div class="wrapper">
        <div v-for="n in entries" :key="n">

            <select v-model="selected[n]">
                <option v-for="(product, index) in products" v-bind:value="product" :key="index">
                    {{ product.productname }}
                </option>
            </select>

            <div v-if="selected[n]">
                <select v-model="selected[n].accessories">
                    <option v-for="accesory in accesories" v-bind:value="accesory" :key="index">
                        {{ accessory.productname }}
                    </option>
                </select>

            </div>

            

            <p>{{selected[n]}}</p>
        </div>
            
    <p>{{entries}}</p>
    <p>{{selected}}</p>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'home-content',

    beforeRouteEnter(to, from, next) {
        axios
            .get('/api/products/1')
            .then(response => {
                next(vm => {
                    vm.setProducts(response.data);
                });
            })
            .catch(error => {
                console.log(error);
            });
    },

    data() {
        return {
            selected: [],
            products: [],
        };
    },

    computed: {
        entries() {
            if (this.selected.length === 0) return 1;

            return this.selected.length;
        },
    },

    methods: {
        addEntry() {
            console.log(this.entries);
            this.entries += 1;
        },
        setProducts(products) {
            this.products = products;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
