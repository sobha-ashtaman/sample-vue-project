<script setup>

import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const {book} = defineProps(['book']);

</script>

<template>
    <div class="card item">
        <img :src="book.cover_image?book.cover_image:'./../assets/book.jpg'" class="card-img-top" alt="...">
        <div class="card-body">
            <h2>{{book.title}}</h2>
            <p>By : {{book.author.name}}</p>
            <RouterLink :to="'/book/'+book.id">View Details <i class="fa-solid fa-arrow-right"></i></RouterLink>
        </div>
    </div>
</template>

<style scoped>
.item img{
    max-height: 300px;
}

.item h2{
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px;
}

.item p{
    margin: 0;
    color: #f86c38;
}

.item a{
    margin-top: 10px;
    text-decoration: none;
    color: #9cad6a;
    float: right;
}
</style>