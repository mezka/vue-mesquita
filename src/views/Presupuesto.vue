<template>
    <div class="container">
        <div class="form-container">
            <h2>Solicite un presupuesto</h2>
            <contact-form></contact-form>
        </div>
    </div>
</template>

<script>
import ContactForm from '@/components/ContactForm';

export default {
  name: 'presupuesto',
  components:{
      ContactForm,
  }
};
</script>

<style lang="scss" scoped>

</style>