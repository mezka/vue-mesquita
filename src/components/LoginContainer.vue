<template>
    <div class="login-container">
        <form class="login_form" v-on:submit.prevent="submitForm" action="">
            <p>
                <label for="email">
                E-mail:</label>
                <input v-model="email" class="input-text" type="text" id="email" name="email" required>
            </p>
            <p>
                <label for="password">
                Password:</label>
                <input v-model="password" class="input-text" type="password" id="password" name="password" required>
            </p>
            <input class="button" type="submit" name="submit">
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'login-container',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            console.log(
                //eslint-disable-next-line
                'Sending\n{\n\t"email": "' +
                    this.email +
                    '",\n\t"password": "' +
                    this.password +
                    //eslint-disable-next-line
                    '"\n}\n'
            );

            axios
                .post('/api/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    console.log(response.data);
                    this.$emit('closeLogin');
                    this.$router.push({ name: this.$route.query.next });
                })
                .catch(error => {
                    console.log(error.response.data);
                    this.$emit('openLoginFailure', error.response.data);
                });
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
