<template>
    
    <div class="wrapper">

        {{cart}}

        <div v-for="(cartItem, cartIdx) in cart" :key="cartIdx">
            
            <div class="product">
                <product-select :products="products" :cart="cart" :cartIndex="cartIdx"></product-select>
                <button type="button" class="btn btn-danger" @click="removeProduct(cartIdx)">
                    -
                </button>
            </div>
            <hr>
            <div class="prod-accessory" v-if="Object.keys(cartItem).length !== 0">
                Accessories
                <button type="button" class="btn btn-success" @click="addAccessory(cartIdx)">
                +
                </button>
            </div>
            <div class="accessory-list" v-if="Object.keys(cartItem).length !== 0">
                <div class="accessory-item" v-for="(cartaAccessory, accIdx) in cart[cartIdx].productselectedaccessories">
                    <select v-model="cart[cartIdx].productselectedaccessories[accIdx]">
                        <option v-for="productAccessory in cart[cartIdx].productaccessories" :value="productAccessory">
                            {{productAccessory.productname}} - ${{productAccessory.productprice}}
                        </option>
                    </select>
                </div>
            </div> 
        </div>
        <button type="button" class="btn btn-success" @click="addProduct">
            +
        </button>
        
    </div>
        

</template>

<script>
import axios from 'axios';
import ProductSelect from '@/components/ProductSelect';

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
            cart: [],
            products: [],
            index: 0,
        };
    },

    methods: {
        setProducts(products) {
            this.products = products;
        },
        addProduct() {
            this.$set(this.cart, this.index, {});
            this.index += 1;
        },
        removeProduct(cartIdx) {
            this.cart.splice(cartIdx, 1);
            this.index -= 1;
        },
        addAccessory(cartIdx) {
            this.cart[cartIdx].productselectedaccessories.push({});
        },
    },

    components: {
        ProductSelect,
    },
};
</script>

<style lang="scss" scoped>

</style>
