<template>
    <div class="container">

        <client-manager v-on:selectedClientChanged="changeSelectedClient"></client-manager>
        <presupuestador-form v-on:presupuestoChanged="changePresupuesto"></presupuestador-form>
        <presupuesto-select :presupuestos="presupuestos" v-on:presupuestoChange="presupuestoChange"></presupuesto-select>

        {{cart}}

        <h2>Presupuesto</h2>

            <presupuesto-summary :presupuestadorProductsArr="cart" :impuesto="21"></presupuesto-summary>
            <button class="btn btn-primary" @click="submitPresupuesto">Guardar presupuesto</button>
        
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
        
        <sweet-modal ref="noneSelectedAlert" icon="error" title="Cometiste un error">
	        <p>{{modalMessage}}</p>
        </sweet-modal>
    </div>
        

</template>

<script>
import axios from "axios";
import AccessorySelect from "@/components/AccessorySelect";
import ProductSelect from "@/components/ProductSelect";
import QuantityInput from "@/components/QuantityInput";
import DiscountInput from "@/components/DiscountInput";
import ClientManager from '@/components/ClientManager';
import PresupuestadorForm from '@/components/PresupuestadorForm';
import PresupuestoSummary from '@/components/PresupuestoSummary';
import PresupuestoSelect from '@/components/PresupuestoSelect';
import { SweetModal } from 'sweet-modal-vue';


export default {
  name: "presupuestador",

  beforeRouteEnter(to, from, next) {

    let products = null;

    axios
      .get("/api/products/categoryId/1")
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
      presupuestos: [],
      selectedClient: {},
      cart: [],
      products: [],
      index: 0,
      out: "",
      modalMessage: '',
      presupuesto: {},
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

    changePresupuesto(presupuestoObj){
      this.presupuesto = presupuestoObj;
    },

    submitPresupuesto() {

      if(!this.isInputValid()){
        return;
      }

      axios
        .post("/api/presupuesto/add", 
        { cart: this.cart,
          client: this.selectedClient,
          presupuesto: this.presupuesto,
        })
        .then(response => {
          this.out = response.data;
        })
        .catch(error => console.log(error));
    },

    isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    },

    changeSelectedClient(selectedClientObj){
      this.$set(this, 'selectedClient', Object.assign({}, selectedClientObj));
      this.getClientPresupuestos(selectedClientObj.clientid);
    },

    presupuestoChange(presupuestoObj){
      console.log('changed');
    },

    isInputValid(){
      if(this.isEmptyObject(this.selectedClient)){
        this.modalMessage = 'No seleccionaste un cliente';
        this.$refs.noneSelectedAlert.open();
        return false;
      }else if(!this.selectedClient.selectedContact || this.isEmptyObject(this.selectedClient.selectedContact)){
        this.modalMessage = 'No seleccionaste un contacto para el cliente';
        this.$refs.noneSelectedAlert.open();
        return false;
      }else if(this.cart.length === 0){
        this.modalMessage = 'No seleccionaste items para el presupuesto';
        this.$refs.noneSelectedAlert.open();
        return false;
      }

      return true;
    },

    getClientPresupuestos(clientId){
      axios.get('/api/presupuestos/get/clientid/' + clientId)
      .then((response) => {
          this.$set(this, 'presupuestos', response.data);
      })
      .catch((error) =>{
          console.log(error.data);
      });
    },
  },

  components: {
    ProductSelect,
    QuantityInput,
    AccessorySelect,
    DiscountInput,
    ClientManager,
    SweetModal,
    PresupuestadorForm,
    PresupuestoSummary,
    PresupuestoSelect,
  }
};


</script>

<style lang="scss" scoped>
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

button.btn-square {
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 0 5px;
}
</style>
