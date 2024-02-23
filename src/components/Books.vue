<script setup>

import { defineProps, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Card from "./Card.vue";

const {booksobj} = defineProps(['booksobj']);
const loadMoreText = ref('Load More');
const books = ref(null);
const nextLink = ref(null);

onMounted(()=>{
    books.value = booksobj.data;
    nextLink.value = booksobj.links.next;
})

const loadMore = async ()=>{
    loadMoreText.value = "Loading...";
    const response = await axios.get(nextLink.value);
    books.value.push(...response.data.data);
    nextLink.value = response.data.links.next;
    loadMoreText.value = "Load More";
}
</script>

<template>
    <div class="row">
        <div class="col-3" v-for="book in books" :key="book.id">
          <Card :book="book"/>
        </div>
    </div>
    <div class="row" v-if="nextLink">
        <div class="text-center mt-3 mb-3">
            <button class="btn btn-secondary" :disabled="loadMoreText=='Loading...'" @click="loadMore">{{loadMoreText}}</button>
        </div>
    </div>
</template>