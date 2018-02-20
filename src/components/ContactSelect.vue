<template>
    <select @input="contactChange($event.target.value)">
        <option :value="-1"></option>
        <option v-for="(clientcontact, contactIndex) in clientcontacts" :value="contactIndex">
            {{clientcontact.contactname}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'contact-select',
    methods: {
        contactChange(contactIndex){
            console.log(contactIndex);
                this.$emit('contactChange', contactIndex);
        }
    },
    props: ['clientcontacts'],
}
</script>

<style lang="scss" scoped>

</style>


