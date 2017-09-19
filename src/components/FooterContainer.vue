<template>
    <div class="container-wrapper">
        <footer class="footer container">
            <div class="row">
                <div class="footer-address-container col-xs-6 col-sm-3">
                    <div class="text-container">
                        <h4 class="address-container-title">Fabrica</h4>
                        <p>
                            Direccion: Camino Gral Belgrano 2442<br> Tel: (011) 4954-2224<br> Tel: (011) 4223-0787<br> Tel: (011) 4223-2448<br>
                        </p>
                    </div>
                </div>

                <div class="footer-address-container col-xs-6 col-sm-3">
                    <div class="text-container">
                        <h4 class="address-container-title">Sucursal CABA</h4>
                        <p>
                            Direccion: Alsina 2501<br> Tel: (011) 4951-9812<br> Tel: (011) 4952-1254<br>
                        </p>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-5 col-sm-offset-1 email-container">
                    <div>
                        <div class="text-container">
                            <h4 class="address-container-title">Ventas - Protecciones blindadas y puertas cortafuego</h4>
                            <p>ventas@mesquita.com.ar</p>
                        </div>
                        <div class="text-container">
                            <h4 class="address-container-title">Ventas - Puertas blindadas</h4>
                            <p>info@mesquita.com.ar</p>
                        </div>
                        <div class="text-container">
                            <h4 class="address-container-title">Administracion</h4>
                            <p>administracion@mesquita.com.ar</p>
                        </div>
                    </div>
                </div>
            </div>

        </footer>

    </div>
</template>

<script>
export default {
    name: 'footer',
};
</script>

<style lang="scss" scoped>
.container-wrapper {
    background-color: #222222;
}

.footer {
    min-height: 130px;
}

.footer-address-container {

    display: flex;
    justify-content: center;

    margin-top: 15px;
}

.text-container {
    color: white;
}

.address-container-title {
    margin: 0;
    font-weight: bolder;
}

.email-container {

    margin-top: 20px;

    display: flex;
    justify-content: center;
}
</style>


