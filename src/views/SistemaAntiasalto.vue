<template>
    <section class="container">
        <sistema-antiasalto-carousel></sistema-antiasalto-carousel>
        <sistema-antiasalto-intro class="small-margin"></sistema-antiasalto-intro>
    </section>
</template>

<script>

import SistemaAntiasaltoCarousel from '@/components/SistemaAntiasaltoCarousel';
import SistemaAntiasaltoIntro from '@/components/SistemaAntiasaltoIntro';

export default {
    name: 'sistema-antiasalto',
    components: {
        'sistema-antiasalto-carousel': SistemaAntiasaltoCarousel,
        'sistema-antiasalto-intro': SistemaAntiasaltoIntro,
    },
};
</script>

<style lang="scss" scoped>

.small-margin {
    margin-top: 50px;
}

</style>


