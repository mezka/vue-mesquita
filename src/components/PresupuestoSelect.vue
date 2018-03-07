<template>
        <select @input="presupuestoChange($event.target.value)">
            <option :value="-1"></option>
            <option v-for="(presupuesto, presupuestoIndex) in presupuestos" :value="presupuestoIndex">
                {{presupuesto.presupuestoid + ' - ' + presupuesto.presupuestocreateddate}}
            </option>
    </select>
</template>

<script>
export default {
    name: 'presupuesto-select',
    props: ['presupuestos'],
    methods: {
        presupuestoChange(presupuestoIndex){
            if(presupuestoIndex !== '-1'){
                this.$emit('presupuestoChange', this.presupuestos[presupuestoIndex]);
            } else {
                this.$emit('presupuestoChange', {});
            }
        }
    }
}
</script>

<style lang="scss">

</style>
