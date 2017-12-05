<template>
    <div>
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

<style>

.header-margin {
    margin-bottom: 90px;
}

</style>