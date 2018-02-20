<template>
    <div class="container">

        <client-manager></client-manager>

        <h2>Presupuesto</h2>

            <div class="cart-box">
                <div v-if="!isEmptyObject(cartItem)" v-for="cartItem in cart">
                    <div >
                        <strong>{{ cartItem.productname }}</strong>
                    </div>
                    <div>
                        Cantidad: {{cartItem.productquantity}} - ${{ Number(cartItem.productprice).toFixed(2) }} c/u
                    </div>

                    <ul class="selected-cart">
                        <li class="li-a" v-for="cartAcc in cartItem.productselectedaccessories" v-if="!isEmptyObject(cartAcc)">
                            {{ cartAcc.productname }} - ${{ Number(cartAcc.productprice).toFixed(2) }}
                        </li>
                    </ul>
                    <p>{{!cartItem? '' : !isEmptyObject(cartItem)? 'Precio unitario c/ accesorios: $' + Number(calculateBundlePrice(cartItem) / cartItem.productquantity).toFixed(2) : ''}}</p>
                    <p>{{!cartItem? '' : !isEmptyObject(cartItem)? 'Descuento por unidad: $' + Number(calculateBundleDiscount(cartItem) / cartItem.productquantity).toFixed(2) : ''}}</p>
                    <p>{{!cartItem? '' : !isEmptyObject(cartItem)? 'Subtotal por todas las unidades: $' + Number(calculateBundlePrice(cartItem) - calculateBundleDiscount(cartItem)).toFixed(2): ''}}</p>
                </div>
                
                <div class="total-container-wrapper">
                    <div class="total-container">
                        <p>Subtotal parcial: ${{Number(calculateCartPrice(cart)).toFixed(2)}}</p>
                        <p>Descuento total: - ${{Number(calculateCartDiscount(cart).toFixed(2))}}</p>
                        <p>Subtotal final: ${{Number(calculateCartPrice(cart, calculateCartDiscount(cart))).toFixed(2)}}</p>
                        <p>I.V.A: ${{Number(calculateCartPrice(cart) * 0.21).toFixed(2)}}</p>
                        <p><strong>Total: ${{Number(calculateCartPrice(cart) * 1.21).toFixed(2)}}</strong></p>
                    </div>
                </div>


                <button class="btn btn-primary" @click="submitPresupuesto">Guardar presupuesto</button>
            </div>
        
        
            <div class="product-box" v-for="(cartItem, cartIdx) in cart" :key="cartIdx">
            
               
                    <div class="item-box">
                        <product-select v-on:removeProduct="removeProduct" :products="products" :cart="cart" :cartIndex="cartIdx"></product-select>


                        <div class="quantity-box">
                            <span v-if="!isEmptyObject(cartItem)"><label>Descuento: </label><discount-input class="discount-input" v-model="cartItem.productdiscount"/></span>
                            <span v-if="!isEmptyObject(cartItem)"><label>Cantidad: </label><quantity-input class="quantity-input" v-model="cartItem.productquantity"/></span>
                            <button type="button" class="btn btn-square btn-danger" @click="removeProduct(cartIdx)">
                                -
                            </button>
                        </div>
                    </div>


                    <button v-if="!isEmptyObject(cartItem)" type="button" class="btn btn-rectangle btn-success" @click="addAccessory(cartIdx)"> A&ntilde;adir accesorio:</button>
                    

                    <div v-if="!isEmptyObject(cartItem)">
                        <div class="item-box" v-for="(cartAccessoryItem, cartAccessoryIndex) in cart[cartIdx].productselectedaccessories">
                            <accessory-select v-on:removeAccessory="removeAccessory" :cart="cart" :cartIndex="cartIdx" :cartAccessoryIndex="cartAccessoryIndex"/>

                            <div class="quantity-box">
                                <span v-if="!isEmptyObject(cartAccessoryItem)"><label>Descuento: </label><discount-input class="discount-input" v-model="cartAccessoryItem.productdiscount"/></span>
                                <div v-if="!isEmptyObject(cartAccessoryItem)"><label>Cantidad: </label><quantity-input class="quantity-input" v-model="cartAccessoryItem.productquantity"/></div>
                                <button type="button" class="btn btn-square btn-danger" @click="removeAccessory(cartIdx, cartAccessoryIndex)">
                                    -
                                </button>
                            </div>

                        </div>
                    </div> 
                

            </div>
            <div class="end-box">
              <button type="button" class="btn btn-rectangle btn-success" @click="addProduct">A&ntilde;adir producto:</button>
            </div>
            
        
        <div v-html="out"></div>
        
    </div>
        

</template>

<script>
import axios from "axios";
import AccessorySelect from "@/components/AccessorySelect";
import ProductSelect from "@/components/ProductSelect";
import QuantityInput from "@/components/QuantityInput";
import DiscountInput from "@/components/DiscountInput";
import ClientManager from '@/components/ClientManager';

export default {
  name: "presupuestador",

  beforeRouteEnter(to, from, next) {

    let products = null;

    axios
      .get("/api/products/1")
      .then(response => {
        products = response.data;

        next(vm => {
            vm.setData({
              products: products,
            });
          });
      })
      .catch(error => {
        console.log('products-error: ', error);
      });

      
  },

  data() {
    return {
      cart: [],
      products: [],
      index: 0,
      out: ""
    };
  },

  methods: {
    setData(dataObj) {
      console.log(dataObj);
      this.$set(this, 'products', dataObj.products);
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
      if (this.cart[cartIdx].productselectedaccessories.length !== 0 && this.isEmptyObject(this.cart[cartIdx].productselectedaccessories[this.cart[cartIdx].productselectedaccessories.length - 1])){
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
        cartAccessoryIndex, 1
      );
    },

    calculateBundlePrice(cartItem) {
    let bundlePrice = cartItem.productquantity * cartItem.productprice;

        if (cartItem.productselectedaccessories) {
            for (let i = 0; i < cartItem.productselectedaccessories.length; i += 1) {
                if (!this.isEmptyObject(cartItem.productselectedaccessories[i])) {
                    bundlePrice += cartItem.productselectedaccessories[i].productprice * cartItem.productselectedaccessories[i].productquantity;
                }
            }
        }

    return bundlePrice;
    },

    calculateBundleDiscount(cartItem) {

      let productDiscountMultiplier = cartItem.productdiscount / 100;

      let discountAmount = cartItem.productquantity * cartItem.productprice * productDiscountMultiplier;

      if (cartItem.productselectedaccessories) {
        for (let i = 0; i < cartItem.productselectedaccessories.length; i++) {

          let currentAccessory = cartItem.productselectedaccessories[i];

          if (!this.isEmptyObject(currentAccessory) && currentAccessory.productdiscount !== 0) {

            let accessoryDiscountMultiplier = currentAccessory.productdiscount / 100;

            discountAmount += currentAccessory.productprice * currentAccessory.productquantity * accessoryDiscountMultiplier;
          }
        }
      }

      return discountAmount;
    },

    calculateCartDiscount(cart){
        let cartDiscount = 0;

        for(let i = 0; i < cart.length; i += 1){
            if(!this.isEmptyObject(cart[i])){
                cartDiscount = this.calculateBundleDiscount(cart[i]);
            }
        }

        return cartDiscount;
    },

    calculateCartPrice(cart, discountAmount) {
      let cartPrice = 0;

      if(!discountAmount){
          var discountAmount = 0;
      }

      for (let i = 0; i < cart.length; i += 1) {
        if (!this.isEmptyObject(cart[i])) {
          cartPrice += this.calculateBundlePrice(cart[i]);
        }
      }

      return cartPrice - discountAmount;
    },

    submitPresupuesto() {
      axios
        .post("/api/presupuesto", this.cart)
        .then(response => {
          this.out = response.data;
        })
        .catch(error => console.log(error));
    },

    isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    },

  },

  components: {
    ProductSelect,
    QuantityInput,
    AccessorySelect,
    DiscountInput,
    ClientManager,
  }
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

.btn-rectangle {
  margin-top: 10px;
  width: 130px;
  text-align: center;
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

.end-box {
  margin: 0px 0px 0px 20px;
}

@media all and (max-width: 1920px) and (min-width: 768px) {
  .item-box {
    max-width: 768px;
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
