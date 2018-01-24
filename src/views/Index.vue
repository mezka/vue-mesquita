<template>
    <div>
        <header-container class="header-margin"></header-container>
        <router-view></router-view>
        <sweet-modal class="container-fluid" ref="loginModal">
            <login-container v-on:openLoginFailure="openLoginFailure" v-on:closeLogin="closeLogin"></login-container>
        </sweet-modal>

        <sweet-modal ref="loginFailure" icon="warning">
            {{errorMsg}}
        </sweet-modal>

        <footer-container></footer-container>
    </div>
</template>

<script>
import HeaderContainer from '@/components/HeaderContainer';
import FooterContainer from '@/components/FooterContainer';
import LoginContainer from '@/components/LoginContainer';
import { SweetModal } from 'sweet-modal-vue';

export default {
    name: 'app',
    data() {
        return {
            errorMsg: '',
        };
    },
    beforeRouteUpdate: (to, from, next) => {
        if (this.loginModal) {
            this.openLogin();
        }

        next();
    },
    methods: {
        openLogin() {
            this.$refs.loginModal.open();
        },
        closeLogin() {
            this.$refs.loginModal.close();
        },
        openLoginFailure(payload) {
            this.errorMsg = payload.error[0];
            this.$refs.loginFailure.open();
            setTimeout(() => this.$refs.loginFailure.close(), 2500);
        },
    },
    components: {
        HeaderContainer,
        FooterContainer,
        SweetModal,
        LoginContainer,
    },
    props: ['loginModal'],
};
</script>

<style>
.header-margin {
    margin-bottom: 90px;
}
</style>
