<template>
  <div class="proveedores-home-wrapper">
    <h2>Bienvenido al portal de proveedores</h2>

    <div class="welcome-container">
        <p>Bienvenido, {{post}}</p>
        <p>Bienvenido, {{error}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'proveedores-home',
    data() {
        return {
            userfirstname: null,
            userlastname: null,
            error: null,
            post: null,
        };
    },
    beforeRouteEnter(to, from, next) {
        console.log('something');
        axios.get('/api/user').then((err, post) => {
            next(vm => vm.setData(err, post));
        });
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    beforeRouteUpdate(to, from, next) {
        console.log('something');
        this.post = null;
        axios.get('/api/user').then((err, post) => {
            console.log('hit');
            this.setData(err, post);
            next();
        });
    },
    methods: {
        setData(err, post) {
            if (err) {
                this.error = err.toString();
            } else {
                this.post = post;
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
