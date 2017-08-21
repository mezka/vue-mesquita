<template>
    <header class="container-fluid header-container">
        <header  class="small-header row">
            <div class="col-xs-10 header-logo-whitespace">
                <logo></logo>
            </div>
            <div class="col-xs-2 flexbox-hamburger hidden-lg hidden-md hidden-sm">
                <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            </div>
        </header>
    
        <header class="row big-header">
            <div class="col-sm-3 hidden-xs header-logo-whitespace">
                <logo></logo>
            </div>
            <ul class="col-xs-12 col-sm-9 flex-nav-container">
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
    data(){
        return {};
    },
    components: {
        Logo,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
    display: none;
    height: 90px;
    background-color: white;
}

.flex-nav-container {
    color: #000;
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
    }

    .flex-nav-container {
        height: inherit;
        border-top: 0;
        box-shadow: none;
        font-size: 1.6rem;
        font-weight: bold;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        a {
            color: black;
        }
    }
}
</style>
