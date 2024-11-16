<template>
  <div>
    <SuperTable
      :model="Post"
      :templateListGrid="templateListGrid"
      :templateForm="templateForm"
      :viewAs="{
          show: [],
          default: 'grid'
        }"
      :forcedFilters="{
        'sponsor_id': session.user.clients[0].sponsor_id,
        // status:'active',
      }"
      hidePagination
      @clickRow="clickRow"
    />
    <!--:templateListTable="templateListTable"-->


  </div>
</template>

<script setup>
import Post from "src/models/orm-api/Post";
import {SuperTable} from "quicklists-vue-orm-ui";
import { useRouter } from 'vue-router';
const router = useRouter();

import {computed, ref} from 'vue';
import VueCookies from "vue-cookies";


const session = computed(() => {
  return VueCookies.get('VITE_AUTH');
});

const clickRow = (item) => {

  router.push({
    name: 'posts/:aId/:aName',
    params: {
      aId: item.id,
      aName: `${item.name}`,
    },
  })
}




const templateListGrid = ref({
  class: "q-pa-md",
  cols: [
    {
      width: 12,
      dataPoint: {
        field: "name",
      },
    },
  ],
});

const templateForm = ref({
  entityName: "Post",
  cols: [
    {
      width: 12,
      dataPoint: {
        field: "name",
      },
    },
  ],
});


</script>

<style scoped>

</style>
