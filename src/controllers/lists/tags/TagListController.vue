<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <tagList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import tagList from 'src/views/lists/tags/TagList.vue'

export default {
    name: 'Tag-list-controller',
    components: {
        tagList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
