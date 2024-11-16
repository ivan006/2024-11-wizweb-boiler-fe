<template>

    <div>
        <q-card class="q-mb-md" style="overflow: hidden;">
            <jobRead :id="id" />
        </q-card>
    </div>
</template>

<script>
import jobRead from 'src/views/lists/jobs/JobRead.vue'

export default {
    name: 'Job-read-controller',
    components: {
        jobRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
