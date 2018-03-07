<template>
    <div class="client-manager">
        {{selectedClient}}
        <div class="select-box">
            <client-select  class="select" v-on:clientChange="clientChange" :clients="clients"></client-select>

            <div class="btn-wrapper">
                <button class="btn btn-square btn-danger" v-on:click="openClientDeleteModal">X</button>
                <button class="btn btn-rectangle btn-success" v-on:click="openClientModal">Nuevo Cliente</button>
            </div>
            
        </div>
        <div class="select-box">
            <contact-select class="select" v-on:contactChange="contactChange" :clientcontacts="selectedClient.clientcontacts"></contact-select>
            <div class="btn-wrapper">
                <button class="btn btn-square btn-danger" v-on:click="openContactDeleteModal">X</button>
                <button class="btn btn-rectangle btn-success" v-on:click="openContactModal">Nuevo Contacto</button>
            </div>
        </div>
        
        <sweet-modal ref="clientModal">
            <client-contact-form v-on:addedClient="changeSelectedClientAndContact"></client-contact-form>
        </sweet-modal>
        <sweet-modal ref="contactModal">
            <contact-form v-on:addedContact="changeSelectedContact" :clientid="getSelectedClientId"></contact-form>
        </sweet-modal>


        <sweet-modal ref="clientDeleteModal" icon="warning" title="Confirme la eliminacion del cliente">
            <button class="btn btn-warning" slot="button" v-on:click="deleteClient">Eliminar Cliente</button>
        </sweet-modal>

        <sweet-modal ref="contactDeleteModal" icon="warning" title="Confirme la eliminacion del contacto">
            <button class="btn btn-warning" slot="button" v-on:click="deleteContact">Eliminar Contacto</button>
        </sweet-modal>

        <sweet-modal ref="noneSelectedAlert" icon="error" title="Cometiste un error">
	        Selecciona un registro
        </sweet-modal>
    </div>
</template>
<script>

import axios from 'axios'
import ClientSelect from '@/components/ClientSelect';
import ContactSelect from '@/components/ContactSelect';
import ContactForm from '@/components/ContactForm';
import ClientContactForm from '@/components/ClientContactForm';
import { SweetModal } from 'sweet-modal-vue';

export default {
    name: 'client-manager',
    data(){
        return {
            selectedClient:{},
            clients: [],
            presupuestos: [],
        };
    },
    components: {
        ClientSelect,
        ContactSelect,
        SweetModal,
        ClientContactForm,
        ContactForm,
    },
    methods:{

        getClients(){
            axios.get('/api/clients').then(response => {
                this.$set(this, 'clients', response.data);
            }).catch(error => {
                console.log(error);
            });
        },
        
        changeSelectedContact(clientid, contactid){
            this.getClients();
            this.$refs.contactModal.close();
        },

        changeSelectedClientAndContact(clientid, contactid){
            this.getClients();
            this.$refs.clientModal.close();
        },

        clientChange(clientIndex){

            if(clientIndex !== -1){
                this.$set(this, 'selectedClient', Object.assign({}, this.clients[clientIndex]));
            } else {
                this.$set(this, 'selectedClient', {});
            }

            this.$emit('selectedClientChanged', this.selectedClient);
        },
        contactChange(contactIndex){
            this.$set(this.selectedClient, 'selectedContact', Object.assign({}, this.selectedClient.clientcontacts[contactIndex]));
            this.$emit('selectedClientChanged', this.selectedClient);
        },
        openClientModal(){
            this.$refs.clientModal.open();
        },
        openClientDeleteModal(){
            if(!this.isEmptyObject(this.selectedClient)){
                this.$refs.clientDeleteModal.open();
            }else{
                this.$refs.noneSelectedAlert.open();
            }
        },

        openContactModal(){
            this.$refs.contactModal.open();
        },

        openContactDeleteModal(){
            if(!this.isEmptyObject(this.selectedClient) && !this.isEmptyObject(this.selectedClient.selectedContact)){
                this.$refs.contactDeleteModal.open();
            }else{
                this.$refs.noneSelectedAlert.open();
            }
        },

        deleteClient(){
            axios.post('/api/clients/delete', {clientid: this.selectedClient.clientid})
            .then(result => {
                console.log(result.data);
                this.$set(this, 'selectedClient', {});
                this.$refs.clientDeleteModal.close();
                this.getClients();
            })
            .catch(error => {
                console.log(error);
            });
        },

        deleteContact(){
            axios.post('/api/contacts/delete', {contactid: this.selectedClient.selectedContact.contactid})
            .then(result => {
                this.$set(this.selectedClient, 'selectedContact', {});
                this.$refs.contactDeleteModal.close();
                this.getClients();
            }).catch(error => {
                console.log(error);
            });
        },

        isEmptyObject(obj) {
            return Object.keys(obj).length === 0;
        },
    },

    computed: {
        getSelectedClientId(){
            return !this.isEmptyObject(this.selectedClient)?Number(this.selectedClient.clientid):null;
        }
    },

    beforeMount(){
        this.getClients();
    }
}
</script>

<style lang="scss" scoped>
.select-box {
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 20px 0px 0px 0px;
}

.select {
  min-width: 300px;
  height: 22px;
}

.btn-rectangle {
  width: 125px;
}
</style>
