<template>
    <agile :infinite="false">
        <div class="slide slide--1">
            <h3>slide asd</h3>
        </div>
        <div class="slide slide--2">
            <h3>slide n</h3>
        </div>
    </agile>
</template>

<script>

export default {
    name: 'puertas-blindadas-carousel',
};

</script>

<style lang="scss">
.agile {
    &__dots {
        bottom: 0;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
    }

    &__dot {
        button {
            background-color: transparent;
            border: 1px solid #fff;

            &:hover {
                background-color: #fff;
            }
        }

        &--current {
            button {
                background-color: #fff;
            }
        }
    }

    &__arrow {
        height: 100%;
        top: 0;
        width: 80px;

        &:hover {
            background-color: rgba(#000, .5);

            #arrow-svg {
                fill: #fff;
            }
        }

        &[disabled] {
            display: none;
        }

        #arrow-svg {
            fill: rgba(#fff, .4);
            height: 25px;
        }
    }
}

.slide {
    background: {
        position: center;
        size: cover;
    }
    height: 1073px;

    &:before {
        background-color: rgba(#000, .2);
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    &--1 {
        background-image: url(../assets/components/puertas-blindadas-carousel/puerta-blindada-front.jpg);
    }
}
</style>
