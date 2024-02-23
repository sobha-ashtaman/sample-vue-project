<script setup>
  import { onBeforeMount, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  import useErrorHandler from './../composables/useErrorHandler';
  import LayoutDefault from './../layouts/LayoutDefault.vue'

  const book = ref(null);
  const route = useRoute();
  const error_handler = useErrorHandler();

  onBeforeMount(async () => {
    const book_id = route.params.id;
    await axios.get(`${import.meta.env.VITE_API_URL}/books/view/${book_id}`).then((response)=>{
      book.value = response.data.data;
      console.log(book.value);
    }).catch((error) => error_handler.throwError(error));
   
  })


</script>

<template>
  <layout-default>
    <main v-if="book">
      <div class="row">
        <div class="col-4">
          <img :src="book.cover_image?book.cover_image:'./../assets/book.jpg'">
        </div>
        <div class="col-8">
          <div>
            <h1>{{book.title}}</h1>
            <h2>BY: <span>{{book.author.name}}</span></h2>
            <p>{{book.short_description}}</p>
          </div>
          <hr>
          <div>
            <p>Book: {{book.title}}</p>
            <p>Author: {{book.author.name}}</p>
            <p>Genre: <span class="badge bg-secondary" v-for="genre in book.genres" :key="genre.id">{{genre.name}}</span></p>
          </div>
        </div>
      </div>
      <div class="row">
        {{ book.description }}
      </div>
    </main>
  </layout-default>
</template>

<style scoped>
  .badge{
    margin-right: 2px;;
  }
</style>
