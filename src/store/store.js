import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const productCategoryId = Object.freeze({ puertasCortafuego: '1' });


const store = Vuex.store({
    state: {
        presupuestadorProducts: [],
        presupuestoProducts: [],
        clients: [],
    },

    mutations: {

        ADD_PRESUPUESTO_PRODUCT() {
            this.presupuestoProducts.push({});
        },

        REMOVE_PRESUPUESTO_PRODUCT(idx) {
            this.state.presupuestoProducts.splice(idx, 1);
        },

        ADD_PRESUPUESTO_PRODUCT_ACCESSORY(idx) {

            // push into presupuestoSelectedAccessories and then splice it replacing the element with itself to trigger a render update

            this.state.presupuestoProducts[idx].presupuestoSelectedAccessories.push({});
            this.state.presupuestoProducts.splice(idx, 1, this.state.presupuestoProducts[idx]);
        },
    },

    actions: {
        getPresupuestadorProducts() {
            axios.get(`/api/products/${productCategoryId.puertasCortafuego}`)
                .then((response) => {
                    store.commit('setStateProperty', 'presupuestadorProducts', response.data);
                });
        },

        getClients() {
            axios.get('/api/clients')
                .then((response) => {
                    store.commit('setStateProperty', 'clients', response.data);
                });
        },


    },
});


export default store;
