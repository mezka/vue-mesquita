<template>
    <div id="app">
        <header-container></header-container>
        <router-view></router-view>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>

import HeaderContainer from '@/components/HeaderContainer';

export default {
    name: 'app',
    components: {
        HeaderContainer,
    },
};

</script>

<style src="../node_modules/bootstrap/dist/css/bootstrap.css" lang="css"></style>
<style src="../node_modules/bootstrap/dist/css/bootstrap-theme.css" lang="css"></style>
<style src="../node_modules/font-awesome/css/font-awesome.css" lang="css"></style>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
}
</style>