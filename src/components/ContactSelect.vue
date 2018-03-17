<template>
    <select @input="contactChange($event.target.value)">
        <option :value="-1"></option>
        <option v-for="(clientContact, contactIndex) in presupuestoClientContacts" :value="contactIndex">
            {{clientContact.contactname}}
        </option>
    </select>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'contact-select',

    computed: {
        ...mapGetters([
            'presupuestoClientContacts',
        ]),
    },

    methods: {

        ...mapMutations({
            changePresupuestoClientContact: 'CHANGE_PRESUPUESTO_CLIENT_CONTACT',
        }),


        contactChange(contactIndex){
            if(contactIndex !== '-1'){
                this.changePresupuestoClientContact(this.presupuestoClientContacts[contactIndex]);
            } else {
                this.changePresupuestoClientContact(this.presupuestoClientContacts[contactIndex]);
            }
            
        },
    },
}
</script>

<style lang="scss" scoped>

</style>


