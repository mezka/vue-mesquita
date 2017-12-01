<template>
    <div id="app">
        <header-container class="header-margin"></header-container>
        <router-view></router-view>
        <footer-container></footer-container>
    </div>
</template>

<script>

import HeaderContainer from '@/components/HeaderContainer';
import FooterContainer from '@/components/FooterContainer';

export default {
    name: 'app',
    components: {
        'header-container': HeaderContainer,
        'footer-container': FooterContainer,
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

.header-margin {
    margin-bottom: 90px;
}

</style>