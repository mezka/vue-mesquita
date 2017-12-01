<template>
        <div class="container">
            <div class="form-container">
                <h2>Solicite un presupuesto</h2>
                <div>
                    <div>
                        <p>Los campos del formulario marcados con (
                            <span class="asterisk">*</span>) son obligatorios</p>
                    </div>
                        <form method="post" class="contact_form">
                            <p>
                                <label for="name">
                                    <span class="asterisk">*</span> Nombre Completo:</label>
                                <input class="inputText" type="text" id="name" name="name" required>
                            </p>
                            <p>
                                <label for="tel">
                                    <span class="asterisk">*</span> Telefono:</label>
                                <input class="inputText" type="tel" id="tel" name="tel" required>
                            </p>
                            <p>
                                <label for="email">
                                    <span class="asterisk">*</span> E-mail:</label>
                                <input class="inputText" type="email" id="email" name="email" required>
                            </p>

                            <p>
                                <label for="address">Horario para contactarlo:</label>
                                <input class="inputText" type="text" id="time_to_contact" name="time_to_contact">
                            </p>

                            <p>
                                <label for="message">Comentarios opcionales:</label>
                                <textarea class="inputTextarea" cols="88" rows="6" id="message" name="message"></textarea>
                            </p>

                            <input class="button" type="submit" name="submit" value="Enviar Mensaje">
                        </form>
                </div>
        </div>
	</div>
	
</template>

<script>
export default {
    name: 'presupuesto',
};
</script>

<style lang="scss" scoped>

</style>