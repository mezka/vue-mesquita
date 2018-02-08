<template>
    
    <div class="wrapper">

        {{cart}}        

        <h2>Presupuesto</h2>

            <div class="cart-box">
                <div v-if="Object.keys(cartItem).length !== 0" v-for="cartItem in cart">
                    <div >
                        <strong>{{ cartItem.productname }}</strong>
                    </div>
                    <div>
                        Precio unitario: ${{ Number(cartItem.productprice).toFixed(2) }} - Cantidad: {{cartItem.productquantity}}
                    </div>

                    <ul class="selected-cart">
                        <li class="li-a" v-for="cartAcc in cartItem.productselectedaccessories" v-if="Object.keys(cartAcc).length !== 0">
                            {{ cartAcc.productname }} - ${{ Number(cartAcc.productprice).toFixed(2) }}
                        </li>
                    </ul>
                    <p>{{!cartItem? '' : Object.keys(cartItem).length !== 0? 'Parcial unitario: $' + Number(bundlePrice(cartItem) / cartItem.productquantity).toFixed(2) : ''}}</p>
                    <p>{{!cartItem? '' : Object.keys(cartItem).length !== 0? 'Total por este item: $' + Number(bundlePrice(cartItem)).toFixed(2) : ''}}</p>
                </div>
                
                <div class="total-container-wrapper">
                    <div class="total-container">
                        <p>Subtotal General: ${{Number(cartPrice(cart)).toFixed(2)}}</p>
                        <p>I.V.A: ${{Number(cartPrice(cart) * 0.21).toFixed(2)}}</p>
                        <p>Total: ${{Number(cartPrice(cart) * 1.21).toFixed(2)}}</p>
                    </div>
                </div>


                <button class="btn btn-primary" @click="submitPresupuesto">Guardar presupuesto</button>
            </div>
        
        
            <div class="product-box" v-for="(cartItem, cartIdx) in cart" :key="cartIdx">
            
               
                    <div class="item-box">
                        <product-select v-on:removeProduct="removeProduct" :products="products" :cart="cart" :cartIndex="cartIdx"></product-select>


                        <div class="quantity-box">
                            <span v-if="Object.keys(cartItem).length !== 0"><label>Cantidad: </label><quantity-input class="quantity-input" v-model="cartItem.productquantity"/></span>
                            <button type="button" class="btn btn-square btn-danger" @click="removeProduct(cartIdx)">
                                -
                            </button>
                        </div>
                    </div>


                    <div class="prod-accessory" v-if="Object.keys(cartItem).length !== 0">
                        A&ntilde;adir accesorio:
                        <button type="button" class="btn btn-square btn-success" @click="addAccessory(cartIdx)">+</button>
                    </div>

                    <div v-if="Object.keys(cartItem).length !== 0">
                        <div class="item-box" v-for="(cartAccessoryItem, cartAccessoryIndex) in cart[cartIdx].productselectedaccessories">
                            <accessory-select v-on:removeAccessory="removeAccessory" :cart="cart" :cartIndex="cartIdx" :cartAccessoryIndex="cartAccessoryIndex"/>

                            <div class="quantity-box">
                                <div v-if="Object.keys(cartAccessoryItem).length !== 0"><label>Cantidad: </label><quantity-input class="quantity-input" v-model="cartAccessoryItem.productquantity"/></div>
                                <button type="button" class="btn btn-square btn-danger" @click="removeAccessory(cartIdx, cartAccessoryIndex)">
                                    -
                                </button>
                            </div>

                        </div>
                    </div> 
                

            </div>
        
            <p class="product-add-box">
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
        cartPrice(cart) {
            let cartPrice = 0;

            for (let i = 0; i < cart.length; i += 1) {
                if (Object.keys(cart[i]).length !== 0) {
                    cartPrice += this.bundlePrice(cart[i]);
                }
            }

            return cartPrice;
        },

        submitPresupuesto() {
            axios
                .post('/api/presupuesto', this.cart)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
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
select,
input {
    height: 22px;
}

.total-container {
    display: inline-block;
    border: 1px solid grey;
    padding: 5px;
    margin: 0px 0px 10px 0px;
}

.cart-box {
    border: 1px solid grey;
    margin: 20px 10px 0px 20px;
    padding: 10px;
}

.product-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    border-bottom: 1px solid grey;
}

.product-add-box {
    padding: 0px 10px 0px 10px;
    margin-top: 10px;
}

.item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    min-height: 30px;

    margin: 5px 0px 0px 0px;
}

.quantity-box {
    display: flex;
    justify-content: flex-end;
}

@media all and (max-width: 1920px) and (min-width: 600px) {
    .item-box {
        max-width: 700px;
    }
}

ul.selected-cart {
    font-size: 10px;
}

button.btn-square {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 5px;
}
</style>
