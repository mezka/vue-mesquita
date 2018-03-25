<template>
    <div class="form-container">
        <h2>A&ntilde;ada un nuevo cliente</h2>
        <div>
            <div>
                <p>Los campos del formulario marcados con (<span class="asterisk">*</span>) son obligatorios</p>
            </div>
            <form class="contact_form" v-on:submit.prevent="submitForm" action="">
                <p>
                    <label for="client-name">
                        <span class="asterisk">*</span>Raz&oacute;n Social:</label>
                    <input v-model="clientObj.clientname" class="inputText" type="text" id="client-name" name="client-name" required>
                </p>

                <p>
                    <label for="client-cuit">
                        <span class="asterisk">*</span>
                        CUIT:
                    </label>
                    <input v-model="clientObj.clientcuit" name="client-cuit" type="text">
                </p>

                <p>
                    <label for="fiscal-category-id">
                        <span class="asterisk">*</span>
                        Categor&iacute;a Fiscal:
                    </label>

                    <select v-model="clientObj.clientcategoriafiscalid">
                        <option v-for="(categoriafiscal, index) in categoriasFiscales" :value="categoriafiscal.categoriafiscalid">
                            {{categoriafiscal.categoriafiscalname}}
                        </option>
                    </select>
                </p>

                <p>
                    <label for="client-fiscal-address">
                        <span class="asterisk">*</span>
                        Direcci&oacute;n Fiscal:
                    </label>
                    <input v-model="clientObj.clientfiscaladdress" type="text">
                </p>
                <p>
                    <label for="client-address">
                        <span class="asterisk">*</span>
                        Direcci&oacute;n Operativa:
                    </label>
                    <input v-model="clientObj.clientaddress" type="text">
                </p>

                <h3>Informaci&oacute;n de contacto</h3>

                <p>
                    <label for="client-contact-name">
                        <span class="asterisk">*</span> Nombre:</label>
                    <input v-model="clientObj.clientcontactname" class="inputText" type="text" id="client-contact-name" name="client-contact-name" required>
                </p>
                <p>
                    <label for="client-contact-email">
                        <span class="asterisk">*</span> E-mail:</label>
                    <input v-model="clientObj.clientcontactemail" class="inputText" type="text" id="client-contact-email" name="client-contact-email" required>
                </p>
                <p>
                    <label for="client-contact-phone">
                        <span class="asterisk">*</span> Telefono:</label>
                    <input v-model="clientObj.clientcontactphone" class="inputText" type="text" id="client-contact-phone" name="client-contact-phone" required>
                </p>

                <input class="button" type="submit" name="submit">
            </form>
        </div>
        {{result}}
    </div>
</template>

<script>

import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'client-contact-form',

  data(){
      return {
            clientObj: {
                clientname: '',
                clientcuit: '',
                clientcategoriafiscalid: '',
                clientfiscaladdress: '',
                clientaddress: '',
                clientcontact: '',
                clientid: '',
                clientcontactname: '',
                clientcontactemail: '',
                clientcontactphone: '',
            },
            result: '',
      }
  },

  computed: {
      ...mapState([
          'categoriasFiscales',
      ]),
  },

  methods: {

      ...mapActions({
          addClient: 'ADD_CLIENT',
      }),

      submitForm(){
          this.addClient(this.clientObj);
          this.$emit('closeClientModal');
      }
  },
}
</script>


<style lang="scss" scoped>

</style>
