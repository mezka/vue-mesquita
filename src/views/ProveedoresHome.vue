<template>
  <div class="proveedores-home-wrapper">
    <h2>Bienvenido al portal de proveedores</h2>

    <div class="welcome-container">
        <p>Bienvenido, {{userfirstname + ' ' + userlastname}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'proveedores-home',
    data() {
        return {
            userfirstname: '',
            userlastname: '',
        };
    },
};
</script>

<style lang="scss" scoped>

</style>


