<template>
    <div class="flexbox-logo">
        <img class="mesquita-logo" :class="{ inverted: isInverted }" alt="mesquita-logo" />
    </div>
</template>


<script>

export default {
    name: 'logo',
    data() {
        return {
            isInverted: false,
        };
    },
    methods: {
        tryChangeLogo() {
            const distanceFromTop = 50;
            if (window.scrollY >= distanceFromTop) {
                this.isInverted = true;
            } else {
                this.isInverted = false;
            }
        },
    },
    created() {
        window.addEventListener('scroll', this.tryChangeLogo);
    },
    destroyed() {
        window.removeEventListener('scroll', this.tryChangeLogo);
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

.mesquita-logo {
    content: url('../assets/logos/mesquita.svg');
}
@media(min-width: 768px){
    .inverted {
        content: url('../assets/logos/mesquita_inverted.svg');
    }
}
</style>
