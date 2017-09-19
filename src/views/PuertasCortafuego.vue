<template>
    <section class="container">
        <puertas-cortafuego-carousel></puertas-cortafuego-carousel>
        <puertas-cortafuego-intro class="small-margin"></puertas-cortafuego-intro>
        <puertas-cortafuego-featurettes class="small-margin"></puertas-cortafuego-featurettes>
    </section>
</template>

<script>

import PuertasCortafuegoCarousel from '@/components/PuertasCortafuegoCarousel';
import PuertasCortafuegoIntro from '@/components/PuertasCortafuegoIntro';
import PuertasCortafuegoFeaturettes from '@/components/PuertasCortafuegoFeaturettes';


export default {
    name: 'puertas-cortafuego',
    components: {
        'puertas-cortafuego-carousel': PuertasCortafuegoCarousel,
        'puertas-cortafuego-intro': PuertasCortafuegoIntro,
        'puertas-cortafuego-featurettes': PuertasCortafuegoFeaturettes,
    },
};
</script>

<style lang="scss" scoped>

.small-margin {
    margin-top: 50px;
}

</style>
