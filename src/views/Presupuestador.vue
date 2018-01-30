<template>
    

    <section class="presupuestador-wrapper container">
            <template v-for="i in selectedLength(selected)">
                <div class="row">
                    
                    <div class="col-xs-5">
                        <select class="form-control" v-model="selected[i]" :key="i">
                            <option v-for="(product, index) in products" v-bind:value="product" :key="index">
                                {{ product.productname }}
                            </option>
                        </select>
                    </div>

                    <div class="col-xs-1 col-xs-offset-6">
                        <p>{{ selected[i]? '$' + selected[i].productprice : ''}}</p>
                    </div>
                </div>
                <template v-if="selected[i]">
                        <template v-for="j in selectedLength(selected[i]['productselectedaccesories'])">
                            <div class="row">
                                <div class = "col-xs-6 col-xs-offset-3">
                                    <select class="form-control" v-model="selected[i]['productselectedaccesories'][j]" :key="j">
                                        <option v-for="(productaccesory, index) in selected[i].productaccesories" v-bind:value="productaccesory" :key="index">
                                            {{ productaccesory.productname }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-xs-1 col-xs-offset-2">
                                    <p>{{ selected[i]? '$' + selected[i].productprice : ''}}</p>
                                </div>
                            </div>
                        </template>
                </template>
            </template>
        <p>{{selected}}</p>
    </section>

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

    methods: {
        setProducts(products) {
            this.products = products;
        },
        selectedLength(array) {
            if (array.length) {
                return array.length;
            }
            return 2;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
