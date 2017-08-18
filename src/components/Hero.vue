<template>
    <section class="container-fluid hero-container">
        <div class="container heading-container">
            <h1>MESQUITA HNOS</h1>
            <p>EQUIPAMIENTOS DE SEGURIDAD S.A.</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'hero',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hero-container {
    margin-top: 90px;
    height: 70vh;
    background-image: url('../assets/ventana_blindada.jpg');
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.heading-container {
    color: white;
    width: auto;
    border-radius: 5px;
    text-align: center;
    h1 {
        font-size: 5rem;
        font-weight: 600;
    }
    p {
        font-size: 1rem;
    }
}
</style>
