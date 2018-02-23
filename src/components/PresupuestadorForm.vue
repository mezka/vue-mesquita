<template>
    <div>
        <p>
            <label for="presupuestopaymethod">
                <span class="asterisk">*</span> Forma de pago:</label>
            <input v-model="presupuesto.presupuestopaymethod" class="inputText" type="text" id="presupuestopaymethod" name="presupuestopaymethod" required>
        </p>
        <p>
            <label for="presupuestooc">Orden de compra:</label>
            <input v-model="presupuesto.presupuestooc" class="inputText" type="text" id="presupuestooc" name="presupuestooc" required>
        </p>
    </div>
</template>


<script>

import axios from 'axios';

export default {
    name: 'presupuestador-form',
    
    data(){
        return{
            presupuesto: {
                presupuestopaymethod: '',
                presupuestooc: '',
            },
        }
    },
    watch: {
        presupuesto: {
            handler(newPresupuesto){
                this.$emit('presupuestoChanged', Object.assign({}, newPresupuesto));
            },
            deep: true
        },
    },
};

</script>

<style lang="scss" scoped>

</style>
