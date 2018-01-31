<template>

</template>

<script>
import axios from 'axios';

export default {
    name: 'presupuestador',

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

    methods: {
        setProducts(products) {
            this.products = products;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
