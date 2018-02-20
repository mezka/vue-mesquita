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
                <button class="btn btn-square btn-danger">X</button>
                <button class="btn btn-rectangle btn-success">Nuevo Contacto</button>
            </div>
        </div>

        <sweet-modal ref="clientModal">
            <client-contact-form v-on:addedClient="changeClientContact"></client-contact-form>
        </sweet-modal>
        <sweet-modal ref="contactModal"></sweet-modal>


        <sweet-modal ref="clientDeleteModal" icon="warning" title="Confirme la eliminacion del cliente">
            <button class="btn btn-warning" slot="button" v-on:click="deleteClient">Eliminar Cliente</button>
        </sweet-modal>
    </div>
</template>
<script>

import axios from 'axios'
import ClientSelect from '@/components/ClientSelect';
import ContactSelect from '@/components/ContactSelect';
import ClientContactForm from '@/components/ClientContactForm';
import { SweetModal } from 'sweet-modal-vue';

export default {
    name: 'client-manager',
    data(){
        return {
            selectedClient:{},
            clients: [],
        };
    },
    components: {
        ClientSelect,
        ContactSelect,
        SweetModal,
        ClientContactForm,
    },
    methods:{

        getClients(){
            axios.get('/api/clients').then(response => {
                this.$set(this, 'clients', response.data);
            }).catch(error => {
                console.log(error);
            });
        },

        changeClientContact(clientid, contactid){
            this.getClients();
            this.$refs.clientModal.close();
        },

        clientChange(clientIndex){
            this.$set(this, 'selectedClient', Object.assign({}, this.clients[clientIndex]));
        },
        contactChange(contactIndex){
            this.$set(this.selectedClient, 'selectedContact', Object.assign({}, this.selectedClient.clientcontacts[contactIndex]));
        },
        openClientModal(){
            this.$refs.clientModal.open();
        },
        openClientDeleteModal(){
            this.$refs.clientDeleteModal.open();
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
