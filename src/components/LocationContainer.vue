<template>
  <section class="container-fluid location-container">
        <div class="row">
            <div class="col-xs-12 col-sm-6 location location-gba">
                <div class="address-container">
                    <h3>Gran Buenos Aires - Fabrica</h3>
                    <address>
                        Camino Gral Belgrano 2442<br> Florencio Varela, CP 1885<br> Tel: (011) 4954-2224<br> Tel: (011) 4223-0787
                        <br> Tel: (011) 4223-2448
                    </address>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 location location-caba">
                <div class="address-container">
                    <h3>Ciudad de Buenos Aires - Sucursal</h3>
                    <address>
                        Alsina 2501<br> Ciudad de Buenos Aires, CP 1090<br> Tel: (011) 4951-9812<br> Tel: (011) 4952-1254<br>
                    </address>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'location-container',
    components: {
    },
};
</script>

<style lang="scss" scoped>

.location-container {
    .row {
        height: 240px;
        .location {
            display: flex;
            justify-content: center;
            align-items: center;
            height: inherit;
            padding: 0;
        }
        .location-gba {
            background: url('../assets/locations/location-gba.jpg') no-repeat center center;
            background-size: cover;
        }
        .location-caba {
            background: url('../assets/locations/location-caba.jpg') no-repeat center center;
            background-size: cover;
        }
    }
}

.address-container {
    background-color: #141E21;
    opacity: .85;
    box-sizing: border-box;
    padding: 20px;
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: .1em;
    height: 80%;
    min-width: 50%;
    color: white;
    address {
        margin: 0;
    }
    h3 {
        margin-top: 0;
        font-weight: bold;
    }
}

</style>


