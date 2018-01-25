<template>
    <div>
        <header-container class="header-margin"></header-container>
        <router-view></router-view>
        <sweet-modal v-on:close="modalClosed" class="container-fluid" ref="loginModal">
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
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.query.modal) {
                vm.openLogin();
            }
        });
    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.modal) {
            this.openLogin();
        }
        next();
    },
    methods: {
        modalClosed() {
            this.$router.replace({
                name: this.$route.name,
                query: { modal: false },
            });
        },

        openLogin() {
            this.$refs.loginModal.open();
        },
        closeLogin() {
            this.$refs.loginModal.close();
            this.$router.replace({
                name: this.$route.name,
                query: { modal: false },
            });
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
};
</script>

<style>
.header-margin {
    margin-bottom: 90px;
}
</style>
