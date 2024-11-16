<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <postList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import postList from 'src/views/lists/posts/PostList.vue'

export default {
    name: 'Post-list-controller',
    components: {
        postList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
