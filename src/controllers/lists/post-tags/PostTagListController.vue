<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <postTagList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import postTagList from 'src/views/lists/post-tags/PostTagList.vue'

export default {
    name: 'PostTag-list-controller',
    components: {
        postTagList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
