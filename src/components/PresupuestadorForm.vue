<template>
    <div>
        <p>
            <label for="presupuestopaymethod">
                <span class="asterisk">*</span> Forma de pago:</label>
            <select v-model="presupuesto.presupuestopaymethod">
                <option v-for="formadepago in formasDePago" :value="formadepago.formadepagoid">
                    {{formadepago.formadepagoname}}
                </option>
            </select>
        </p>
        <p>
            <label for="presupuestooc">Orden de compra:</label>
            <input v-model="presupuestoOptions.presupuestooc" class="inputText" type="text" id="presupuestooc" name="presupuestooc" required>
        </p>
    </div>
</template>


<script>

import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'presupuestador-form',

    computed: {
        ...mapState([
            'presupuestoOptions',
            'formasDePago',
        ]),
    },
    
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
