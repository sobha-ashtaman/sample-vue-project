<script setup>
  import Books from './../components/Books.vue'
  import LayoutDefault from './../layouts/LayoutDefault.vue'
  import { onBeforeMount, ref, watch } from 'vue'
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router';

  const booksobj = ref(null);
  const route = useRoute();
  const router = useRouter();
  const keyword = ref("");
  const search_key = ref("");

  onBeforeMount(() => {
    fetchBooks();
  })

  watch(route, ()=>{
    fetchBooks();
  })

  const clearSearch = ()=>{
    keyword.value = "";
    router.push('/search/'+keyword.value);
  }

  async function fetchBooks() {
    keyword.value = route.params.keyword;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/books?keyword=${keyword.value}`);
    booksobj.value = response.data;
    search_key.value = Math.random();
  }


</script>

<template>
  <layout-default>
    <main>
      <div class="row">
          <p v-if="keyword">Showing search result of <span class="text-success">{{keyword}}</span> <a class="text-secondary" @click="clearSearch"><i class="fas fa-times-circle"></i></a></p>
      </div>
      <books v-if="booksobj" :booksobj="booksobj" :key="search_key"></books>
    </main>
  </layout-default>
</template>

<style scoped>
</style>
