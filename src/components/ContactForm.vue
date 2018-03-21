<template>
  
<div>
    <div>
        <p>Los campos del formulario marcados con (
            <span class="asterisk">*</span>) son obligatorios</p>
    </div>
    <form class="contact_form" v-on:submit.prevent="submitForm" action="">
        <p>
            <label for="name">
                <span class="asterisk">*</span> Nombre Completo:</label>
            <input v-model="contactname" class="inputText" type="text" id="name" name="name" required>
        </p>
        <p>
            <label for="phone">
                <span class="asterisk">*</span> Telefono:</label>
            <input v-model="contactphone" class="inputText" type="phone" id="phone" name="phone" required>
        </p>
        <p>
            <label for="email">
                <span class="asterisk">*</span> E-mail:</label>
            <input v-model="contactemail" class="inputText" type="email" id="email" name="email" required>
        </p>
        <p>
            <label for="timetocontact">Horario para contactarlo:</label>
            <input v-model="contacttimetocontact" class="inputText" type="text" id="time" name="timetocontact">
        </p>
        <p>
            <label for="text">Comentarios opcionales:</label>
            <textarea v-model="contacttext" class="inputTextarea" cols="88" rows="6" id="text" name="text"></textarea>
        </p>

        <input class="button" type="submit" name="submit">
    </form>
</div>

</template>

<script>

import axios from 'axios';

export default {
    name: 'contact-form',
    data() {
        return {
            contactname: '',
            contactphone: '',
            contactemail: '',
            contacttimetocontact: '',
            contacttext: '',
        };
    },
    methods: {
        submitForm: function submitForm() {
            console.log(
                `Sending:\n{\n\t"name": "${this.name}",\n\t"text": "${this
                    .text}",\n\t"email":"${this
                    .email}"\n\t"phone": "${// eslint-disable-next-line
                this.phone}"\n\t"timetocontact": "${this.timetocontact}"\n}\n`
            );

            axios
                .post('/api/contact', {
                    clientid: this.clientid,
                    contactname: this.name,
                    contacttext: this.text,
                    contactemail: this.email,
                    contactphone: this.phone,
                    contacttimetocontact: this.timetocontact,
                })
                .then(response => {
                    console.log(response.data);
                    this.$emit('addedContact');
                });
        },
    },
    props: {
        clientid: Number,
    },
};
</script>

<style lang="scss">

</style>


