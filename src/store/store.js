import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { isEmptyObject } from '../helpers';

Vue.use(Vuex);

const productCategoryId = Object.freeze({ puertasCortafuego: '1' });

const store = new Vuex.Store({
    state: {
        products: [],
        presupuestoProducts: [],
        clients: [],
        presupuestoClient: {},
    },

    getters: {
        products(state) {
            return state.products;
        },

        clients(state) {
            return state.clients;
        },

        presupuestoClient(state) {
            return state.presupuestoClient;
        },

        presupuestoClientContacts(state) {
            return state.presupuestoClient.clientcontacts;
        },

        presupuestoProductsIVA(state) {
            return state.presupuestoClient.categoriafiscalimpuesto;
        },

        presupuestoProductsTotal(state, getters) {
            return getters.presupuestoProductsSubtotal * (1 + getters.presupuestoProductsIVA);
        },

        presupuestoProducts(state) {
            return state.presupuestoProducts;
        },

        presupuestoProductAccessories(state, idx) {
            return state.presupuestoProducts[idx] ? state.presupuestoProducts[idx].productaccessories : [];
        },

        presupuestoProductsSubtotal(state) {
            return state.presupuestoProducts.reduce((acum, presupuestoProduct) => {
                return acum + isEmptyObject(presupuestoProduct) ? presupuestoProduct.productprice * presupuestoProduct.productquantity * (1 - presupuestoProduct.productdiscount / 100) + presupuestoProduct.productselectedaccessories.reduce((acum, productAccessory) => {

                    return acum + isEmptyObject(productAccessory) ? productAccessory.productprice * (1 - productAccessory.productdiscount / 100) * presupuestoProduct.productquantity : 0;
                }, 0) : 0;
            }, 0);
        },

        presupuestoProductsSubtotalNoDiscount(state) {
            return state.presupuestoProducts.reduce((acumA, presupuestoProduct) => {
                return acumA + isEmptyObject(presupuestoProduct) ? presupuestoProduct.productprice * presupuestoProduct.productquantity + presupuestoProduct.productselectedaccessories.reduce((acumB, productAccessory) => {

                    return acumB + isEmptyObject(productAccessory) ? productAccessory.productprice * presupuestoProduct.productquantity : 0;
                }, 0) : 0;
            }, 0);
        },

        presupuestoProductsTotalDiscount(state) {
            return state.presupuestoProducts.reduce((acumA, presupuestoProduct) => {

                return acumA + isEmptyObject(presupuestoProduct) ? presupuestoProduct.productprice * presupuestoProduct.productquantity * (presupuestoProduct.productdiscount / 100) + presupuestoProduct.productselectedaccessories.reduce((acumB, productAccessory) => {

                    return acumB + isEmptyObject(productAccessory) ? productAccessory.productprice * (productAccessory.productdiscount / 100) * presupuestoProduct.productquantity : 0;
                }, 0) : 0;
            }, 0);
        },
    },

    mutations: {

        ADD_PRESUPUESTO_PRODUCT(state) {
            state.presupuestoProducts.push({ productselectedaccessories: [] });
        },

        CHANGE_PRESUPUESTO_PRODUCT(state, { presupuestoProductIdx, presupuestoProduct }) {
            state.presupuestoProducts.splice(presupuestoProductIdx, 1, presupuestoProduct);
        },

        REMOVE_PRESUPUESTO_PRODUCT(state, idx) {
            state.presupuestoProducts.splice(idx, 1);
        },

        ADD_PRESUPUESTO_PRODUCT_ACCESSORY(state, idx) {

            // push into presupuestoSelectedAccessories and then splice it replacing the element with itself to trigger a render update

            state.presupuestoProducts[idx].productselectedaccessories.push({});
            state.presupuestoProducts.splice(idx, 1, this.state.presupuestoProducts[idx]);
        },

        REMOVE_PRESUPUESTO_PRODUCT_ACCESSORY(state, { presupuestoProductIdx, presupuestoProductAccessoryIdx }) {

            // splice accessoryIdx from productSelectedAccessories and then splice the product replacing it with itself to trigger a render update

            state.presupuestoProducts[presupuestoProductIdx].productselectedaccessories.splice(presupuestoProductAccessoryIdx, 1);
            state.presupuestoProducts.splice(presupuestoProductIdx, 1, this.state.presupuestoProducts[presupuestoProductIdx]);
        },

        CHANGE_PRESUPUESTO_PRODUCT_ACCESSORY(state, { presupuestoProductIdx, presupuestoProductAccessoryIdx, presupuestoProductAccessory }) {
            state.presupuestoProducts[presupuestoProductIdx].productselectedaccessories.splice(presupuestoProductAccessoryIdx, 1, presupuestoProductAccessory);
        },

        CHANGE_PRESUPUESTO_CLIENT(state, presupuestoClient) {
            Vue.set(state, 'presupuestoClient', presupuestoClient);
        },

        CHANGE_PRESUPUESTO_CLIENT_CONTACT(state, presupuestoClientContact) {
            Vue.set(state, 'presupuestoClientContact', presupuestoClientContact);
        },

        SET_STATE_PROPERTY(state, { key, value }) {
            Vue.set(state, key, value);
        },
    },

    actions: {
        GET_PRESUPUESTADOR_PRODUCTS({ commit }) {

            return axios.get(`/api/products/${productCategoryId.puertasCortafuego}`)
                .then((response) => {

                    response.data.forEach(productObj => {
                        productObj.productselectedaccessories = [];
                    });

                    commit('SET_STATE_PROPERTY', { key: 'products', value: response.data });
                });
        },

        GET_CLIENTS({ commit }) {
            return axios.get('/api/clients')
                .then((response) => {
                    commit('SET_STATE_PROPERTY', { key: 'clients', value: response.data });
                });
        },

        SUBMIT_PRESUPUESTO({ commit }) {
            console.log('SUBMIT_PRESUPUESTO');
        },
    },
});


export default store;
