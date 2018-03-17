<template>
    <div class="container">

        <client-manager v-on:selectedClientChanged="changeSelectedClient"></client-manager>
        <presupuestador-form></presupuestador-form>

        {{presupuestoProducts}}

        <h2>Presupuesto</h2>

            <presupuesto-summary></presupuesto-summary>
            <button class="btn btn-primary" @click="submitPresupuesto">Guardar presupuesto</button>
        
            <div class="product-box" v-for="(presupuestoProduct, presupuestoProductIdx) in presupuestoProducts" :key="presupuestoProductIdx">
            
               
                    <div class="item-box">
                        <product-select :presupuestoProductIdx="presupuestoProductIdx"></product-select>


                        <div class="quantity-box">
                            <span v-if="!isEmptyObject(presupuestoProduct)"><label>Descuento: </label><discount-input class="discount-input" v-model="presupuestoProduct.productdiscount"/></span>
                            <span v-if="!isEmptyObject(presupuestoProduct)"><label>Cantidad: </label><quantity-input class="quantity-input" v-model="presupuestoProduct.productquantity"/></span>
                            <button type="button" class="btn btn-square btn-danger" @click="removePresupuestoProduct(presupuestoProductIdx)">
                                -
                            </button>
                        </div>
                    </div>


                    <button v-if="!isEmptyObject(presupuestoProduct)" type="button" class="btn btn-rectangle btn-success" @click="addPresupuestoProductAccessory(presupuestoProductIdx)"> A&ntilde;adir accesorio:</button>
                    

                    <div v-if="!isEmptyObject(presupuestoProduct)">
                        <div class="item-box" v-for="(presupuestoProductAcc, presupuestoProductAccIdx) in presupuestoProducts[presupuestoProductIdx].productselectedaccessories">
                            <accessory-select :presupuestoProductIdx="presupuestoProductIdx" :presupuestoProductAccIdx="presupuestoProductAccIdx"/>

                            <div class="quantity-box">
                                <span v-if="!isEmptyObject(presupuestoProductAcc)"><label>Descuento: </label><discount-input class="discount-input" v-model="presupuestoProductAcc.productdiscount"/></span>
                                <div v-if="!isEmptyObject(presupuestoProductAcc)"><label>Cantidad: </label><quantity-input class="quantity-input" v-model="presupuestoProductAcc.productquantity"/></div>
                                <button type="button" class="btn btn-square btn-danger" @click="removeAccessory({ presupuestoProductIdx, presupuestoProductAccessoryIdx: presupuestoProductAccIdx })">
                                    -
                                </button>
                            </div>

                        </div>
                    </div> 
                

            </div>
            <div class="end-box">
              <button type="button" class="btn btn-rectangle btn-success" @click="addPresupuestoProduct">A&ntilde;adir producto:</button>
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
import { SweetModal } from 'sweet-modal-vue';
import { mapMutations, mapGetters } from 'vuex';
import store from '@/store/store';


export default {
  name: "presupuestador",

  beforeRouteEnter(to, from, next) {

    store.dispatch('GET_PRESUPUESTADOR_PRODUCTS')
    .then((response) => {
      store.dispatch('GET_CLIENTS');
    })
    .then((response) =>{
      next();
    })
    .catch((error) => {
      console.log(error);
    });
  },

  data() {
    return {
      selectedClient: {},
      index: 0,
      out: "",
      modalMessage: '',
      presupuesto: {},
    };
  },

  computed: {
    ...mapGetters([
      'products',
      'presupuestoProducts',
    ])
  },

  methods: {

    ...mapMutations({
      addPresupuestoProduct: 'ADD_PRESUPUESTO_PRODUCT',
      removePresupuestoProduct: 'REMOVE_PRESUPUESTO_PRODUCT',
      changePresupuestoProduct: 'CHANGE_PRESUPUESTO_PRODUCT',
      addPresupuestoProductAccessory: 'ADD_PRESUPUESTO_PRODUCT_ACCESSORY',
      removePresupuestoProductAccessory: 'REMOVE_PRESUPUESTO_PRODUCT_ACCESSORY',
    }),

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
