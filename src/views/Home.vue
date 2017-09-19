<template>
    <div class="main">
        <hero></hero>
        <intro></intro>
        <home-featurettes></home-featurettes>
        <location-container></location-container>
        <footer-container></footer-container>
    </div>
</template>

<script>
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import HomeFeaturettes from '@/components/HomeFeaturettes';
import LocationContainer from '@/components/LocationContainer';
import FooterContainer from '@/components/FooterContainer';

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
        'footer-container': FooterContainer,
    },
};
</script>