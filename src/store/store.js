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

        ADD_PRESUPUESTO_PRODUCT(state) {
            state.presupuestoProducts.push({});
        },

        REMOVE_PRESUPUESTO_PRODUCT(state, idx) {
            state.presupuestoProducts.splice(idx, 1);
        },

        ADD_PRESUPUESTO_PRODUCT_ACCESSORY(state, idx) {

            // push into presupuestoSelectedAccessories and then splice it replacing the element with itself to trigger a render update

            state.presupuestoProducts[idx].presupuestoSelectedAccessories.push({});
            state.presupuestoProducts.splice(idx, 1, this.state.presupuestoProducts[idx]);
        },

        SET_STATE_PROPERTY(state, key, value) {
            Vue.set(state, key, value);
        },
    },

    actions: {
        getPresupuestadorProducts() {
            axios.get(`/api/products/${productCategoryId.puertasCortafuego}`)
                .then((response) => {
                    store.commit('SET_STATE_PROPERTY', 'presupuestadorProducts', response.data);
                });
        },

        getClients() {
            axios.get('/api/clients')
                .then((response) => {
                    store.commit('SET_STATE_PROPERTY', 'clients', response.data);
                });
        },


    },
});


export default store;
