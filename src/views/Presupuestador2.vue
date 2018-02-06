<template>
    
    <div class="wrapper">

        {{cart}}

        <p>Presupuesto</p>
        
        <div v-if="Object.keys(cartItem).length !== 0" v-for="cartItem in cart" class="cart">
            <span >
                {{ cartItem.productname }} - ${{ cartItem.productprice }}
            </span>
            <ul class="selected-a">
                <li class="li-a" v-for="cartAcc in cartItem.productselectedaccessories" v-if="Object.keys(cartAcc).length !== 0">
                    {{ cartAcc.productname }} - ${{ cartAcc.productprice }}
                </li>
            </ul>

            <p>{{!cartItem? '' : Object.keys(cartItem).length !== 0? 'Subtotal: $' + bundlePrice(cartItem) : ''}}</p>
        </div>

        <div v-for="(cartItem, cartIdx) in cart" :key="cartIdx">

            <hr>
            
            <div class="product">
                <product-select v-on:removeProduct="removeProduct" :products="products" :cart="cart" :cartIndex="cartIdx"></product-select>

                <span v-if="Object.keys(cartItem).length !== 0">Cantidad: <quantity-input  v-model="cartItem.productquantity"/></span>
                


                <button type="button" class="btn btn-danger" @click="removeProduct(cartIdx)">
                    -
                </button>
            </div>


            <div class="prod-accessory" v-if="Object.keys(cartItem).length !== 0">
                A&ntilde;adir accesorio:
                <button type="button" class="btn btn-success" @click="addAccessory(cartIdx)">+</button>
            </div>
            <div v-if="Object.keys(cartItem).length !== 0">
                <div class="accessory-list" v-for="(cartAccessoryItem, cartAccessoryIndex) in cart[cartIdx].productselectedaccessories">
                    <accessory-select v-on:removeAccessory="removeAccessory" :cart="cart" :cartIndex="cartIdx" :cartAccessoryIndex="cartAccessoryIndex"/>

                    <span v-if="Object.keys(cartAccessoryItem).length !== 0">
                        Cantidad: <quantity-input v-model="cartAccessoryItem.productquantity"/>
                    </span>
                    <button type="button" class="btn btn-danger" @click="removeAccessory(cartIdx, cartAccessoryIndex)">
                        -
                    </button>        
                </div>
                
            </div> 

        </div>
        
        <p>
            A&ntilde;adir producto: <button type="button" class="btn btn-success" @click="addProduct">+</button>
        </p>
        
        
    </div>
        

</template>

<script>
import axios from 'axios';
import AccessorySelect from '@/components/AccessorySelect';
import ProductSelect from '@/components/ProductSelect';
import QuantityInput from '@/components/QuantityInput';

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
            if (
                this.index !== 0 &&
                Object.keys(this.cart[this.index - 1]).length === 0
            ) {
                return;
            }

            this.$set(this.cart, this.index, {});
            this.index += 1;
        },
        removeProduct(cartIdx) {
            this.$delete(this.cart, cartIdx);
            this.index -= 1;
        },
        addAccessory(cartIdx) {
            if (
                this.cart[cartIdx].productselectedaccessories.length !== 0 &&
                Object.keys(
                    this.cart[cartIdx].productselectedaccessories[
                        this.cart[cartIdx].productselectedaccessories.length - 1
                    ] // eslint-disable-line
                ).length === 0 // eslint-disable-line
            ) {
                return;
            }

            this.$set(
                this.cart[cartIdx].productselectedaccessories,
                this.cart[cartIdx].productselectedaccessories.length,
                {} //eslint-disable-line
            );
        },

        removeAccessory(cartIdx, cartAccessoryIndex) {
            this.cart[cartIdx].productselectedaccessories.splice(
                cartAccessoryIndex,
                // eslint-disable-next-line
                1
            );
        },

        bundlePrice(cartItem) {
            let accessoriesPrice = 0;

            if (cartItem.productselectedaccessories) {
                for (
                    let i = 0;
                    i < cartItem.productselectedaccessories.length;
                    i++ // eslint-disable-line
                ) {
                    if (
                        typeof cartItem.productselectedaccessories[i] === // eslint-disable-line
                            'object' && // eslint-disable-line
                        Object.keys(cartItem.productselectedaccessories[i]) // eslint-disable-line
                            .length !== 0 // eslint-disable-line
                    ) {
                        accessoriesPrice += // eslint-disable-line
                            cartItem.productselectedaccessories[i]
                                .productprice * // eslint-disable-line
                            cartItem.productselectedaccessories[i]
                                .productquantity;
                    }
                }
            } else {
                return cartItem.productquantity * cartItem.productprice;
            }

            return (
                cartItem.productquantity * cartItem.productprice + // eslint-disable-line
                cartItem.productquantity * accessoriesPrice // eslint-disable-line
            );
        },
    },

    components: {
        ProductSelect,
        QuantityInput,
        AccessorySelect,
    },
};
</script>

<style lang="scss" scoped>
.body {
    font-family: Tahoma;
    font-size: 11px;
}

.cart {
    border: 1px solid grey;
    margin: 20px;
    padding: 5px;
}

.cart-item {
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    border: 1px solid lightgrey;
    align-self: center;
}

.product,
.accessory-list {
    display: flex;
    justify-content: flex-start;
}

select {
    margin: 5px;
    font-size: 11px;
}

.prod-accessory {
    display: flex;
    margin: 5px;
}

ul.selected-a {
    font-size: 10px;
}

button.btn {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 5px;
}
</style>
