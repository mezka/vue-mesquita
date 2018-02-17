<template>
    <div class="form-container">
        <h2>Solicite un presupuesto</h2>
        <div>
            <div>
                <p>Los campos del formulario marcados con (
                    <span class="asterisk">*</span>) son obligatorios</p>
            </div>
            <form class="contact_form" v-on:submit.prevent="submitForm" action="">
                <p>
                    <label for="client-name">
                        <span class="asterisk">*</span>Raz&oacute;n Social:</label>
                    <input v-model="clientname" class="inputText" type="text" id="client-name" name="client-name" required>
                </p>

                <p>
                    <label for="client-cuit">
                        <span class="asterisk">*</span>
                        CUIT:
                    </label>
                    <input v-model="clientcuit" name="client-cuit" type="text">
                </p>

                <p>
                    <label for="fiscal-category-id">
                        <span class="asterisk">*</span>
                        Categor&iacute;a Fiscal:
                    </label>
                    <input v-model="clientcategoriafiscalid" type="text">
                </p>

                <p>
                    <label for="client-fiscal-address">
                        <span class="asterisk">*</span>
                        Direcci&oacute;n Fiscal:
                    </label>
                    <input v-model="clientfiscaladdress" type="text">
                </p>
                <p>
                    <label for="client-address">
                        <span class="asterisk">*</span>
                        Direcci&oacute;n Operativa:
                    </label>
                    <input v-model="clientaddress" type="text">
                </p>
                <p>
                    <label for="client-contact">
                        <span class="asterisk">*</span> Contacto:</label>
                    <input v-model="clientcontact" class="inputText" type="text" id="client-contact" name="client-contact" required>
                </p>

                <input class="button" type="submit" name="submit">
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'client-form',
  data(){
      return {
          clientObj:{
            clientname: '',
            clientcuit: '',
            clientcategoriafiscalid: '',
            clientfiscaladdress: '',
            clientaddress: '',
            clientcontact: '',
            clientid: '',
          },
      }
  }
}
</script>


<style lang="scss" scoped>

</style>
