<template>
    <section class="container">
        <div class="row intro-container">
            <div class="col-xs-12 col-sm-4 flexbox-info">
                <h2>Nos distingue la calidad</h2>
                <p>Nuestros productos son fabricados en nuestra moderna planta industrial por profesionales altamente especializados, mediante procesos estandarizados seg&uacute;n normas ISO 9001, bajo estrictos controles de calidad, y utilizando unicamente los mejores insumos disponinbles.</p>
                <p>
                    <a class="btn btn-default" href="#" role="button">Vea nuestra planta &raquo;</a>
                </p>
            </div>
            <div class="col-xs-12 col-sm-4 flexbox-info">
                <h2>Nos avala la experiencia</h2>
                <p>Mesquita Hnos es una empresa pionera en el mercado con 30 años de experiencia en la fabricaci&oacute;n de puertas de seguridad, puertas cortafuego, y protecciones blindadas antiasalto.</p>
                <p>
                    <a class="btn btn-default" href="#" role="button">Conozca m&aacute;s sobre nosotros &raquo;</a>
                </p>
            </div>
            <div class="col-xs-12 col-sm-4 flexbox-info">
                <h2>Nuestro trabajo nos representa</h2>
                <p>Trabajamos desde siempre con las m&aacute;s reconocidas empresas, y siempre agradecemos esa confianza brindando nuestro mejor trabajo.</p>
                <p>
                    <a class="btn btn-default" href="#" role="button"> Conozca nuestras obras &raquo;</a>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'intro',
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>

.intro-container {
    margin-top: 40px;
    min-height: 300px;
    .flexbox-info {
        min-height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}

</style>