<template>
    <div class="client-manager">
        <div class="select-box">
            <client-select  class="select"></client-select>

            <div class="btn-wrapper">
                <button class="btn btn-square btn-danger" v-on:click="openClientDeleteModal">X</button>
                <button class="btn btn-rectangle btn-success" v-on:click="openClientModal">Nuevo Cliente</button>
            </div>
            
        </div>
        <div class="select-box">
            <contact-select class="select"></contact-select>
            <div class="btn-wrapper">
                <button class="btn btn-square btn-danger" v-on:click="openContactDeleteModal">X</button>
                <button class="btn btn-rectangle btn-success" v-on:click="openContactModal">Nuevo Contacto</button>
            </div>
        </div>

        <sweet-modal ref="clientModal">
            <client-contact-form v-on:closeClientModal="closeClientModal"></client-contact-form>
        </sweet-modal>
        <sweet-modal ref="contactModal">
            <contact-form v-on:closeContactModal="closeContactModal"></contact-form>
        </sweet-modal>


        <sweet-modal ref="clientDeleteModal" icon="warning" title="Confirme la eliminacion del cliente">
            <button class="btn btn-warning" slot="button" v-on:click="deleteClientAndCloseModal">Eliminar Cliente</button>
        </sweet-modal>

        <sweet-modal ref="contactDeleteModal" icon="warning" title="Confirme la eliminacion del contacto">
            <button class="btn btn-warning" slot="button" v-on:click="deleteContactAndCloseModal">Eliminar Contacto</button>
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
import { mapState, mapActions } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';
import { isEmptyObject } from '../helpers';

export default {
    name: 'client-manager',

    components: {
        ClientSelect,
        ContactSelect,
        SweetModal,
        ClientContactForm,
        ContactForm,
    },

    computed: {
        ...mapState([
            'presupuestoClient',
            'presupuestoClientContact',
        ]),
    },



    methods:{

        ...mapActions({
            deleteClient: 'DELETE_CLIENT',
            deleteContact: 'DELETE_CONTACT',
        }),
        
        closeContactModal(){
            this.$refs.contactModal.close();
        },

        closeClientModal(){
            this.$refs.clientModal.close();
        },
        openClientModal(){
            this.$refs.clientModal.open();
        },
        openClientDeleteModal(){
            if(!isEmptyObject(this.presupuestoClient)){
                this.$refs.clientDeleteModal.open();
            } else {
                this.$refs.noneSelectedAlert.open();
            }
        },

        openContactModal(){
            this.$refs.contactModal.open();
        },

        openContactDeleteModal(){
            if(!isEmptyObject(this.presupuestoClient) && !isEmptyObject(this.presupuestoClientContact)){
                this.$refs.contactDeleteModal.open();
            }else{
                this.$refs.noneSelectedAlert.open();
            }
        },

        deleteClientAndCloseModal(){
            this.deleteClient().then(() => {
                this.$refs.clientDeleteModal.close();
            });
        },

        deleteContactAndCloseModal(){
            this.deleteContact().then(() => {
                this.$refs.contactDeleteModal.close();
            });
        }
    },
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
