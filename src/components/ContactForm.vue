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
            <input v-model="name" class="inputText" type="text" id="name" name="name" required>
        </p>
        <p>
            <label for="phone">
                <span class="asterisk">*</span> Telefono:</label>
            <input v-model="phone" class="inputText" type="phone" id="phone" name="phone" required>
        </p>
        <p>
            <label for="email">
                <span class="asterisk">*</span> E-mail:</label>
            <input v-model="email" class="inputText" type="email" id="email" name="email" required>
        </p>
        <p>
            <label for="timetocontact">Horario para contactarlo:</label>
            <input v-model="timetocontact" class="inputText" type="text" id="time" name="timetocontact">
        </p>
        <p>
            <label for="text">Comentarios opcionales:</label>
            <textarea v-model="text" class="inputTextarea" cols="88" rows="6" id="text" name="text"></textarea>
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
            name: '',
            phone: '',
            email: '',
            timetocontact: '',
            text: '',
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
                    name: this.name,
                    text: this.text,
                    email: this.email,
                    phone: this.phone,
                    timetocontact: this.timetocontact,
                })
                .then(response => {
                    console.log(response.data);
                });
        },
    },
};
</script>

<style lang="scss">

</style>


