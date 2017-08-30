<template>
    <div class="flexbox-logo">
        <img class="logo" alt="mesquita-logo" />
    </div>
</template>


<script>

export default {
    name: 'logo',
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>
.flexbox-logo {
    height: inherit;
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
}

.logo {
    content: url('../assets/logos/mesquita.svg');
}

@media(min-width: 768px) {

    &.inverted {
        .logo {
            content: url('../assets/logos/mesquita_inverted.svg');
        }
    }
}
</style>
