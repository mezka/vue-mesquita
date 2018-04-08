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
        presupuestoClientContact: {},
        presupuestoOptions: {
            presupuestooc: '',
            presupuestopaymethod: '',
        },
        categoriasFiscales: [],
        formasDePago: [],
    },

    getters: {

        presupuestoClientContacts(state) {
            return isEmptyObject(state.presupuestoClient) ? {} : state.presupuestoClient.clientcontacts;
        },

        presupuestoProductsIVA(state) {
            return state.presupuestoClient.categoriafiscalimpuesto;
        },

        presupuestoProductsTotal(state, getters) {
            return state.presupuestoProductsSubtotal * (1 + getters.presupuestoProductsIVA);
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
        FETCH_PRESUPUESTADOR_PRODUCTS({ commit }) {

            return axios.get(`/api/products/${productCategoryId.puertasCortafuego}`)
                .then((response) => {

                    response.data.forEach(productObj => {
                        productObj.productselectedaccessories = [];
                    });

                    commit('SET_STATE_PROPERTY', { key: 'products', value: response.data });
                });
        },

        FETCH_CLIENTS({ commit }) {
            return axios.get('/api/clients')
                .then((response) => {
                    commit('SET_STATE_PROPERTY', { key: 'clients', value: response.data });
                });
        },

        FETCH_CATEGORIAS_FISCALES({ commit }) {
            return axios.get('/api/categoriasfiscales')
                .then((response) => {
                    commit('SET_STATE_PROPERTY', { key: 'categoriasFiscales', value: response.data });
                });
        },

        FETCH_FORMAS_DE_PAGO({ commit }) {
            return axios.get('/api/formasdepago')
                .then((response) => {
                    commit('SET_STATE_PROPERTY', { key: 'formasDePago', value: response.data });
                });
        },

        ADD_CLIENT({ dispatch }, clientObj) {
            axios.post('/api/clients/add', clientObj)
                .then(() => {
                    return dispatch('FETCH_CLIENTS');
                })
                .catch(error => console.log(error));
        },

        ADD_CLIENT_CONTACT({ dispatch }, contactObj) {
            axios.post('/api/contacts/add', contactObj)
                .then(() => {
                    return dispatch('FETCH_CLIENTS');
                })
                .catch(error => console.log(error));
        },

        DELETE_CLIENT({ commit, dispatch, getters }) {
            return axios.post('/api/clients/delete', { clientid: getters.presupuestoClient.clientid })
                .then(() => {
                    commit('SET_STATE_PROPERTY', { key: 'presupuestoClient', value: {} });
                    return dispatch('FETCH_CLIENTS');
                }).catch((error) => {
                    console.log(error);
                });
        },

        DELETE_CONTACT({ commit, dispatch, state }) {

            const filteredContactsArr = state.presupuestoClient.clientcontacts.filter((contactObj) => {
                return contactObj.contactid !== state.presupuestoClientContact.contactid;
            });

            const updatedPresupuestoClient = Object.assign({}, state.presupuestoClient, { clientcontacts: filteredContactsArr });

            commit('SET_STATE_PROPERTY', { key: 'presupuestoClient', value: updatedPresupuestoClient });

            return axios.post('/api/contacts/delete', { contactid: state.presupuestoClientContact.contactid })
                .then(() => {
                    return dispatch('FETCH_CLIENTS');
                }).catch((error) => {
                    console.log(error);
                });
        },

        SUBMIT_PRESUPUESTO({ commit }) {
            console.log('SUBMIT_PRESUPUESTO');
        },
    },
});


export default store;
