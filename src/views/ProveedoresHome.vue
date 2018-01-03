<template>
  <div class="proveedores-home-wrapper">
    <h2>Bienvenido al portal de proveedores</h2>

    <div class="form-container">
        <form class="login_form" v-on:submit.prevent="submitForm" action="">
                    <p>
                        <label for="name">
                        E-mail:</label>
                        <input v-model="email" class="inputText" type="text" id="name" name="name" required>
                    </p>
                    <p>
                        <label for="password">
                        Password:</label>
                        <input v-model="password" class="inputText" type="text" id="name" name="name" required>
                    </p>
                    <input class="button" type="submit" name="submit">
                </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'proveedores-home',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        submitForm: function submitForm() {
            console.log(
                `Sending:\n{\n\t"email": "${this.email}",\n\t"password":"${this
                    .password}"\n}\n`
            );

            axios
                .post('/api/contact', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    console.log(response.data);
                });
        },
    },
};
</script>

<style lang="scss" scoped>

</style>


