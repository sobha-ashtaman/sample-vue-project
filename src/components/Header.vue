<script setup>
import {ref} from "vue";
import { useRouter, RouterLink } from "vue-router";

const search = ref("");
const error = ref("");
const router = useRouter();

const performSearch = ()=>{
    if(search.value == ""){
        error.value = "Please enter a keyword to search.";
        return false;
    }
    else{
        error.value = "";
        const search_value = search.value;
        search.value = "";
        router.push('/search/'+search_value);
    }
}
</script>
<template>
    <header>
        <div class="logo">
            <router-link to="/"><h1>BOOKSTORE</h1></router-link>
            <!-- <RouterLink :to='/' ><h1>BOOKSTORE</h1></RouterLink > -->
        </div>
        <div class="search">
            <input type="text" v-model.trim="search"><button @click="performSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
            <span class="error d-block" v-if="error !=''">{{error}}</span>
        </div>
    </header>
</template>

<style scoped>

.error{
    color: rgba(255, 0, 0, 0.601);
}

header{
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

header h1{
    margin: 0;
    color: #9cad6a;
}

header .search input{
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 2px;
    background-color: #fff;
    width: 250px;
}

header .search button{
    width: 35px;
    height: 40px;
    background: #f87646;
    border: none;
    color: #fff;
}
</style>