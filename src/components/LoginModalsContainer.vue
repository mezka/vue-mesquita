<template>
  <div class="login-modals-container">
    <sweet-modal class="container-fluid" ref="loginModal">
        <login-container v-on:openLoginFailure="openLoginFailure" v-on:closeLogin="closeLogin"></login-container>
    </sweet-modal>
    <sweet-modal ref="loginFailure" icon="warning">
        {{errorMsg}}
    </sweet-modal>
  </div>
</template>

<script>
import LoginContainer from '@/components/LoginContainer';
import { SweetModal } from 'sweet-modal-vue';

export default {
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
};
</script>

<style lang="scss" scoped>

</style>
