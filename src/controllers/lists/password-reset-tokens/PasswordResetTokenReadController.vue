<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <passwordResetTokenRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import passwordResetTokenRead from 'src/views/lists/password-reset-tokens/PasswordResetTokenRead.vue'

export default {
    name: 'PasswordResetToken-read-controller',
    components: {
        passwordResetTokenRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
