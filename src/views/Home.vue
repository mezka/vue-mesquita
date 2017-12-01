<template>
    <div class="main">
        <hero></hero>
        <intro></intro>
        <home-featurettes></home-featurettes>
        <location-container></location-container>
    </div>
</template>

<script>
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import HomeFeaturettes from '@/components/HomeFeaturettes';
import LocationContainer from '@/components/LocationContainer';

export default {
    name: 'home',
    data() {
        return {
        };
    },
    components: {
        hero: Hero,
        intro: Intro,
        'home-featurettes': HomeFeaturettes,
        'location-container': LocationContainer,
    },
};
</script>
