<template>
  <div class="proveedores-home-wrapper">
    <h2>Bienvenido al portal de proveedores</h2>

    <div class="welcome-container" v-if="userfirstname">
        <p>Bienvenido, {{userfirstname + ' ' + userlastname}}</p>
    </div>

    <div class="form-container" v-else>
        <form class="login_form" v-on:submit.prevent="submitForm" action="">
                    <p>
                        <label for="email">
                        E-mail:</label>
                        <input v-model="email" class="inputText" type="text" id="email" name="email" required>
                    </p>
                    <p>
                        <label for="password">
                        Password:</label>
                        <input v-model="password" class="inputText" type="text" id="password" name="password" required>
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
            userfirstname: '',
            userlastname: '',
            showForm: true,
            showWelcome: false,
        };
    },
    methods: {
        submitForm: function submitForm() {
            console.log(
                //eslint-disable-next-line
                `Sending:\n{\n\t"email": "${this
                    .email}",\n\t"password":"${//eslint-disable-next-line
                this.password}"\n}\n`
            );

            axios
                .post('/api/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    if (!response.data.user) {
                        console.log('alert failure');
                    } else {
                        axios.get('/api/user', response.data).then(result => {
                            if (result.data) {
                                console.log(result.data);

                                this.userfirstname = result.data.userfirstname;
                                this.userlastname = result.data.userlastname;
                            }
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>

</style>


