<template>
  
  <div class="presupuesto-summary-container">
      <div v-if="!isEmptyObject(presupuestoProduct)" v-for="presupuestoProduct in presupuestoProducts">
            <div >
                <strong>{{ presupuestoProduct.productname }}</strong>
            </div>
            <div>
                Cantidad: {{presupuestoProduct.productquantity}} - ${{ Number(presupuestoProduct.productprice).toFixed(2) }} c/u
            </div>

            <ul class="selected-cart">
                <li class="li-a" v-for="productAccessory in presupuestoProduct.productselectedaccessories" v-if="!isEmptyObject(productAccessory)">
                    {{ productAccessory.productname }} - ${{ Number(productAccessory.productprice).toFixed(2) }}
                </li>
            </ul>

            <div v-if="presupuestoProduct && !isEmptyObject(presupuestoProduct)">
                <p>{{presupuestoProduct && !isEmptyObject(presupuestoProduct)? 'Precio unitario c/ accesorios: $' + Number(calculateBundlePrice(presupuestoProduct)).toFixed(2) : ''}}</p>
                <p>{{presupuestoProduct && !isEmptyObject(presupuestoProduct)? 'Descuento por unidad: $' + Number(calculateBundleDiscount(presupuestoProduct)).toFixed(2) : ''}}</p>
                <p>{{presupuestoProduct && !isEmptyObject(presupuestoProduct)? 'Subtotal por todas las unidades: $' + Number(calculateTotalBundleDiscount(presupuestoProduct)).toFixed(2) : ''}}</p>
            </div>
        </div>
                
        <div>
            <div class="total-container">
                <p>Subtotal parcial: ${{Number(presupuestoProductsSubtotalNoDiscount).toFixed(2)}}</p>
                <p>Descuento total: - ${{Number(presupuestoProductsTotalDiscount).toFixed(2)}}</p>
                <p>Subtotal final: ${{Number(presupuestoProductsSubtotal).toFixed(2)}}</p>
                <p>I.V.A: ${{Number(presupuestoProductsIVA).toFixed(2)}}</p>
                <p><strong>Total: ${{Number(presupuestoProductsTotal).toFixed(2)}}</strong></p>
            </div>
        </div>
  </div>


</template>

<script>

import { clone } from 'underscore';
import { mapState, mapGetters } from 'vuex';
import { isEmptyObject } from '../helpers';


export default {
  name: 'presupuesto-summary',

  computed: {

    ...mapState([
        'presupuestoProducts',
    ]),
    
    ...mapGetters([
      'presupuestoProductsSubtotal',
      'presupuestoProductsSubtotalNoDiscount',
      'presupuestoProductsTotalDiscount',
      'presupuestoProductsIVA',
      'presupuestoProductsTotal',
    ]),
  },

  methods: {

    isEmptyObject: isEmptyObject,
    
    calculateTotalBundlePrice(product) {
        //  para todas las unidades

        return product.productprice * product.productquantity * (1 - product.productdiscount / 100) + product.productselectedaccessories.reduce((acum, productAccessory) => {

            return acum + isEmptyObject(productAccessory) ? productAccessory.productprice * (1 - productAccessory.productdiscount / 100) * product.productquantity : 0;
        }, 0);
    },

    calculateTotalBundleDiscount(product) {

        return product.productprice * product.productquantity * product.productdiscount +
            product.productselectedaccessories.reduce((acum, productAccessory) => {

                return acum + isEmptyObject(productAccessory) ? productAccessory.productprice *  productAccessory.productdiscount / 100 * product.productquantity : 0;
            }, 0);
    },

    calculateBundlePrice(product) {

        return product.productprice * product.productdiscount + product.productselectedaccessories.reduce((acum, productAccessory) => {

            return acum + isEmptyObject(productAccessory) ? productAccessory.productprice * (1 - productAccessory.productdiscount / 100) : 0;
        }, 0);
    },

    calculateBundleDiscount(product) {

        return product.productprice * product.productdiscount + product.productselectedaccessories.reduce((acum, productAccessory) => {
            return acum + !this.isEmptyObject(productAccessory) ? productAccessory.productprice * productAccessory.productdiscount : 0;
        }, 0);
    },

    calculateProductDiscountedPrice(product) {

        return product.productprice * (1 - (product.productdiscount / 100));
    },

    calculateProductDiscount(product) {
        return product.productprice * ((product.productdiscount / 100));
    },
  },
}
</script>

<style lang="scss" scoped>
ul.selected-cart {
  font-size: 10px;
}

.total-container {
  display: inline-block;
  border: 1px solid grey;
  padding: 5px;
  margin: 0px 0px 10px 0px;
}

.presupuesto-summary-container {
  border: 1px solid grey;
  margin: 20px 10px 0px 20px;
  padding: 10px;
}
</style>



