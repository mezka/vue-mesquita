<template>
    <div>
        <select @input="accessoryChange($event.target.value)">
            <option :value="-1"></option>
            <option v-for="(productAccessory, productAccessoryIdx) in presupuestoProducts[presupuestoProductIdx].productaccessories" :value="productAccessoryIdx">
                {{productAccessory.productname}} - ${{productAccessory.productprice}}
            </option>
        </select>
    </div>
</template>


<script>

import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'accessory-select',
    props: ['presupuestoProductIdx', 'presupuestoProductAccIdx'],

    computed: {
        ...mapGetters([
        'presupuestoProducts',
        ])
    },

    methods: {

        ...mapMutations({
            removePresupuestoProductAccessory: 'REMOVE_PRESUPUESTO_PRODUCT_ACCESSORY',
            changePresupuestoProductAccessory: 'CHANGE_PRESUPUESTO_PRODUCT_ACCESSORY',
        }),

        accessoryChange(productAccessoryIdx) {

            if (productAccessoryIdx === '-1') {
                this.removePresupuestoProductAccessory({ presupuestoProductIdx: this.presupuestoProductIdx, presupuestoProductAccessory: this.presupuestoProductAccIdx });
            } else {
                this.changePresupuestoProductAccessory({ presupuestoProductIdx: this.presupuestoProductIdx, presupuestoProductAccessoryIdx: this.presupuestoProductAccIdx, presupuestoProductAccessory: this.presupuestoProducts[this.presupuestoProductIdx].productaccessories[productAccessoryIdx] });
            }

        },
    },
};
</script>

<style lang="scss" scoped>

</style>
