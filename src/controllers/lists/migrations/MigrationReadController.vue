<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <migrationRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import migrationRead from 'src/views/lists/migrations/MigrationRead.vue'

export default {
    name: 'Migration-read-controller',
    components: {
        migrationRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
