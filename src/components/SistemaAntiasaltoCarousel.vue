<template>
    <agile>
        <div class="slide slide--1">
            <h3>slide 1</h3>
        </div>
        <div class="slide slide--2">
            <h3>slide n</h3>
        </div>
    </agile>
</template>

<script>

export default {
    name: 'sistema-antiasalto-carousel',
};

</script>

<style lang="scss" scoped>
.slide {
    color: #fff;
    height: 1040px;
    position: relative;

    &--1 {
        background-image: url('../assets/components/sistema-antiasalto-carousel/ventana-blindada.jpg');
    }


    h3 {
        font-size: 32px;
        font-weight: 300;
        left: 50%;
        margin: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
