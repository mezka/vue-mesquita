<template>
    
    <section class="presupuestador-wrapper container">
                <div v-for="i in selectedLength(selected)" :key="i">
                    <div class="row">
                        <div class="col-xs-5">
                            <select class="form-control" v-model="selected[i]">
                                <option v-for="(product, ind) in products" v-bind:value="product" :key="ind">
                                    {{ product.productname }}
                                </option>
                            </select>
                        </div>

                        <div class="col-xs-1 col-xs-offset-6">
                            <p>{{ selected[i]? '$' + selected[i].productprice : ''}}</p>
                        </div>
                    </div>
                    <template v-if="selected[i]">
                        <div class="row" v-for="j in selectedLength(selected[i]['productselectedaccesories'])" :key="j">
                            <div class = "col-xs-6 col-xs-offset-3">
                                <select class="form-control" v-model="selected[i]['productselectedaccesories'][j]">
                                    <option v-for="(productaccesory, index) in selected[i].productaccesories" :value="productaccesory" :key="index">
                                        {{ productaccesory.productname }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-xs-1 col-xs-offset-2">
                                <p>{{ selected[i]? '$' + selected[i].productprice : ''}}</p>
                            </div>
                        </div>
                    </template>
                </div>                
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
            let count = 0;

            for (let i = 0; i < array.length; i += 1) {
                if (array[i]) {
                    count += 1;
                }
            }

            if (count === 0) {
                return 1;
            }

            return count + 1;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
