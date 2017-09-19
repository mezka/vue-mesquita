<template>
    <section>
        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <div class="text-container">
                    <h2 class="featurette-heading">Protecci&oacute;n blindada y bastidor met&aacute;lico reforzado</h2>
                    <p class="lead">Doble Protecci&oacute;n blindada de 2.1 mm de espesor fijada perimetralmente a un bastidor met&aacute;lico reforzado preparado para la contenci&oacute;n de cerraduras y bisagras</p>
                </div>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive center-block" src="../assets/components/puertas-blindadas-featurettes/bastidor-metalico-reforzado.jpg" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7 col-md-push-5">
                <div class="text-container">
                    <h2 class="featurette-heading">Sistema de cierre multi-cerrojo</h2>
                    <p class="lead">Sistema de cierre multicerrojo desarrollado por 10 pernos de bloqueo de 25 mm de penetraci&oacute;n por lado, comandado por un cilindro computado con 5 llaves de alta seguridad</p>
                </div>
            </div>
            <div class="col-md-5 col-md-pull-7">
                <img class="featurette-image img-responsive center-block" src="../assets/components/puertas-blindadas-featurettes/cerrojo-multianclaje.jpg" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <div class="text-container">
                    <h2 class="featurette-heading">Cerraduras de dise&ntilde;o sobresaliente</h2>
                    <p class="lead">De acero de alta resistencia, protege el cilindro europerfil y las cerraduras de los intentos de rotura. Es antipalanca, antitaladro, y antigiro.</p>
                </div>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive center-block" src="../assets/components/home-featurettes/puerta_blindada.jpg" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7 col-md-push-5">
                <div class="text-container">
                    <h2 class="featurette-heading">Jerarquizaci&oacute;n para personal de servicio</h2>
                    <p class="lead">Llaves parciales para personal de servicio que no consiguen ingresar cuando el propietario decide el cierre total de la puerta</p>
                </div>
            </div>
            <div class="col-md-5 col-md-pull-7">
                <img class="featurette-image img-responsive center-block" src="../assets/components/puertas-blindadas-featurettes/jerarquizacion.jpg" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <div class="text-container">
                    <h2 class="featurette-heading">Pernos de anclaje en sector de bisagras</h2>
                    <p class="lead">4 pernos de anclaje en el sector de bisagras.</p>
                </div>

            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive center-block" src="../assets/components/puertas-blindadas-featurettes/perno-anclaje.png" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7 col-md-push-5">
                <div class="text-container">
                    <h2 class="featurette-heading">Sistema de apertura anti-panico</h2>
                    <p class="lead">Permite abrir y cerrar desde su interior sin la necesidad de accionamiento de llaves en cerraduras.</p>
                </div>
            </div>
            <div class="col-md-5 col-md-pull-7">
                <img class="featurette-image img-responsive center-block" src="../assets/components/puertas-blindadas-featurettes/manivela-cilindro.jpg" alt="Generic placeholder image">
            </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
            <div class="col-md-7">
                <div class="text-container">
                    <h2 class="featurette-heading">Escudo protector de cilindro computado</h2>
                    <p class="lead">De acero de alta resistencia, protege el cilindro europerfil y las cerraduras de los intentos de rotura. Es antipalanca, antitaladro, y antigiro.</p>
                </div>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-responsive center-block" src="../assets/components/puertas-blindadas-featurettes/protector-cilindro.jpg" alt="Generic placeholder image">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'puertas-blindadas-featurettes',
};
</script>
<style lang="scss" scoped>
.featurette-image {
    width: 250px;
}

.featurette {

    display: flex;

    .col-md-7 {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.text-container{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

</style>


