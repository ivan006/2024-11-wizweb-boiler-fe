<template>
  <div class="">
    <q-img
      :src="item.image ? item.image : ''"
      :ratio="16/5"
    >
      <div v-if="!item.image" class="absolute-full text-subtitle2 flex flex-center">
        Oops, no image found!
      </div>
    </q-img>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
});

</script>

<style scoped>

</style>
