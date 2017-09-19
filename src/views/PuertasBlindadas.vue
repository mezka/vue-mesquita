<template>
    <section class="container">
        <puertas-blindadas-carousel></puertas-blindadas-carousel>
        <puertas-blindadas-intro></puertas-blindadas-intro>
        <puertas-blindadas-featurettes></puertas-blindadas-featurettes>
    </section>
</template>

<script>

import PuertasBlindadasCarousel from '@/components/PuertasBlindadasCarousel';
import PuertasBlindadasIntro from '@/components/PuertasBlindadasIntro';
import PuertasBlindadasFeaturettes from '@/components/PuertasBlindadasFeaturettes';

export default {
    name: 'puertas-blindadas',
    components: {
        'puertas-blindadas-carousel': PuertasBlindadasCarousel,
        'puertas-blindadas-intro': PuertasBlindadasIntro,
        'puertas-blindadas-featurettes': PuertasBlindadasFeaturettes,
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped>
puertas-blindadas-intro,
puertas-blindadas-featurettes {
    margin-top: 50px;
}
</style>


