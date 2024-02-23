<script setup>
  import Books from './../components/Books.vue'
  import { onBeforeMount, ref } from 'vue'
  import axios from 'axios'
  import LayoutDefault from './../layouts/LayoutDefault.vue'

  const booksobj = ref(null);

  onBeforeMount(async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
    booksobj.value = response.data;
  })


</script>

<template>
  <layout-default>
    <main>
      <books v-if="booksobj" :booksobj="booksobj"></books>
    </main>
  </layout-default>
</template>

<style scoped>
</style>
