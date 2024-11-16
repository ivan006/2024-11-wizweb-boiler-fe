<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <tagRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import tagRead from 'src/views/lists/tags/TagRead.vue'

export default {
    name: 'Tag-read-controller',
    components: {
        tagRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
