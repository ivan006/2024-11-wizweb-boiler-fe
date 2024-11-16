<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <childRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import childRead from 'src/views/lists/children/ChildRead.vue'

export default {
    name: 'Child-read-controller',
    components: {
        childRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
