<template>

 <section class="container">

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <h2 class="featurette-heading">Puertas Cortafuego</h2>
                <p class="lead">Las puertas cortafuego o puertas ignifugas están concebidas para la protección contra incendios sin permitir
                    el paso del humo y las llamas, a su vez limitando la temperatura externa del acceso a la puerta.<br>                    Este producto se entrega acompañado del ensayo de homologación con su correspondiente número de serie
                    que otorga el INTI a través de su unidad técnica de fuego y materiales ignifugos, requisito exigido por
                    todas las compañías aseguradoras, ART y aprobaciones municipales de la Ciudad Autónoma de Buenos Aires.</p>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive center-block" src="../assets/featurettes/puerta_cortafuego.png" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7 col-md-push-5">
                <h2 class="featurette-heading">Sistema Antiasalto</h2>
                <p class="lead">Es un cerramiento blindado anti-asalto conformado por distintos modulos blindados independientes diseñado
                    para entes recaudadores, entre ellos mostradores blindados fabricados con CRISTALES DE SEGURIDAD de 22mm
                    de espesor, que constituyen una barrera de seguridad entre los terceros que visitan su local y sus empleados.</p>
            </div>
            <div class="col-md-5 col-md-pull-7">
                <img class="featurette-image img-responsive center-block" src="../assets/featurettes/mostrador_blindado_antibala.jpg" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <h2 class="featurette-heading">Puertas Blindadas</h2>
                <p class="lead">En Mesquita Hnos le ofrecemos el sistema más confiable de protección blindada</p>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive center-block" src="../assets/featurettes/puerta_blindada.jpg" alt="Generic placeholder image">
            </div>
        </div>

    </section>

</template>

<script>
export default {
    name: 'home-featurettes',
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>

.featurette {
    margin-bottom: 50px;
    .featurette-heading {
        font-size: 50px;
        font-weight: 300;
    }
    .lead {
        color: #5a5a5a;
    }
}

</style>