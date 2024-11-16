<template>
    <div>
        <q-card class="q-mb-md" style="overflow: hidden;">
        <postRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import postRead from 'src/views/lists/posts/PostRead.vue'

export default {
    name: 'Post-read-controller',
    components: {
        postRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
