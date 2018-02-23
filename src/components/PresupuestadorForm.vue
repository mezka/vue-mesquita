<template>
    <div>
        <p>
            <label for="presupuestopaymethod">
                <span class="asterisk">*</span> Forma de pago:</label>
            <select v-model="presupuesto.presupuestopaymethod">
                <option v-for="formadepago in formasdepago" :value="formadepago.formadepagoid">
                    {{formadepago.formadepagoname}}
                </option>
            </select>
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

    beforeMount(){
        axios.get('/api/formasdepago')
        .then(response => {
            console.log(response.data);
            this.formasdepago = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    },
    
    data(){
        return{
            presupuesto: {
                presupuestopaymethod: '',
                presupuestooc: '',
            },
            formasdepago: [],
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
