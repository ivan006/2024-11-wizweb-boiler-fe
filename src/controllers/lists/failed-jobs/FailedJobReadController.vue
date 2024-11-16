<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <failedJobRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import failedJobRead from 'src/views/lists/failed-jobs/FailedJobRead.vue'

export default {
    name: 'FailedJob-read-controller',
    components: {
        failedJobRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
