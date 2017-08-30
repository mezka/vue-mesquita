<template>
    <header class="container-fluid header-container">
        <header class="small-header row">
            <div class="col-xs-10 header-logo-whitespace">
                <logo :class="{ 'inverted': inverted }"></logo>
            </div>
            <div class="col-xs-2 flexbox-hamburger hidden-lg hidden-md hidden-sm" @click="handleClick">
                <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            </div>
        </header>

        <header :class="{ 'inverted': inverted, 'active': active }" class="row big-header">
            <div class="col-sm-3 hidden-xs header-logo-whitespace">
                <logo :class="{ 'inverted': inverted }"></logo>
            </div>
                <ul role="navigation" class="col-xs-12 col-sm-9 flex-nav-container" :class="{ 'active': active }">
                    <li>
                        <a href="#">INICIO</a>
                    </li>
                    <li>
                        <a href="/puertas/puerta-blindada.html">PUERTAS BLINDADAS</a>
                    </li>
                    <li>
                        <a href="#">PUERTAS CORTAFUEGO</a>
                    </li>
                    <li>
                        <a href="/sistema-antiasalto/sistema-antiasalto.html">SISTEMA ANTIASALTO</a>
                    </li>
                    <li>
                        <a href="#">PRESUPUESTO</a>
                    </li>
                </ul>
        </header>
    </header>
</template>

<script>
import Logo from '@/components/Logo';


export default {
    name: 'header-container',
    data() {
        return {
            inverted: false,
            active: false,
        };
    },
    components: {
        Logo,
    },
    methods: {
        handleScroll() {
            const distanceFromTop = 90;
            if (window.scrollY >= distanceFromTop && this.inverted === false) {
                this.inverted = true;
            } else if (window.scrollY < distanceFromTop && this.inverted === true) {
                this.inverted = false;
            }
        },
        handleClick() {
            this.active = !this.active;
        },
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header-container {
    position: relative;
}

.small-header {
    height: 90px;
    position: fixed;
    z-index: 10;
    background-color: white;
    width: 100%;
}

//HEADER-LOGO-WHITESPACE
.header-logo-whitespace {
    height: inherit;
}

//END HEADER-LOGO-WHITESPACE
.flexbox-hamburger {
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.big-header {
    height: 90px;
    background-color: white;
}

.flex-nav-container {
    height: inherit;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    border-top: solid 1px gainsboro;
    box-shadow: 0 3px 9px -3px #ccc;
    font-family: 'Open Sans', sans-serif;
    li {
        text-align: center;
        a {
            text-decoration: none;
            color: #000;
            &:hover {
                text-decoration: underline;
                color: #FBAA51;
            }
        }
    }
}

@media (max-width: 768px) {

    .big-header {
        height: 0px;
        position: fixed;
        width: 100%;
        overflow: hidden;
        transition: height 1000ms;
        margin-top: 90px;

        &.active {
            height: 250px;
        }
    }
}

@media (min-width: 768px) {
    .small-header {
        display: none;
    }

    .big-header {
        position: fixed;
        top: 0;
        margin-top: 0;
        z-index: 5;
        display: block;
        width: 100%;
        background-color: white;
        transition: background-color .4s;

        &.inverted {
            background-color: #222;
            li {
                a {
                    color: white;
                }
            }
        }
    }

    .flex-nav-container {
        border-top: 0;
        box-shadow: none;
        font-size: 1.6rem;
        font-weight: bold;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
}
</style>
