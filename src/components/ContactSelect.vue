<template>
    <select @input="contactChange($event.target.value)">
        <option :value="-1"></option>
        <option v-for="(clientContact, contactIndex) in presupuestoClientContacts" :value="contactIndex">
            {{clientContact.contactname}}
        </option>
    </select>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
    name: 'contact-select',


    // created(){
    //     this.$store.watch(
    //         (state)=>{
    //             return this.$store.getters.presupuestoClientContacts;
    //         },
    //         (val) =>{
    //         //something changed do something
    //             console.log('changed');
    //         },
    //         {
    //             deep:true
    //         }
    //     );
    // },

    computed: {
        ...mapState([
            'presupuestoClientContacts',
        ]),
    },

    methods: {

        ...mapMutations({
            changePresupuestoClientContact: 'CHANGE_PRESUPUESTO_CLIENT_SELECTED_CONTACT',
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


