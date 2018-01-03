<template>
    <div class="portal-proveedores-wrapper">
        <header-container-proveedores class="header-margin"></header-container-proveedores>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderContainerProveedores from '@/components/HeaderContainerProveedores';

export default {
    name: 'portal-proveedores',
    components: {
        'header-container-proveedores': HeaderContainerProveedores,
    },
};
</script>

<style lang="scss" scoped>

</style>

