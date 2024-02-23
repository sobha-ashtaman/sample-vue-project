<script setup>
    import LayoutAdmin from './../../layouts/LayoutAdmin.vue'
    import axios from 'axios';
    import { onBeforeMount, ref } from 'vue';
    import { useAuthStore } from '@/stores/auth';

    const auth = useAuthStore();
    const user = ref(null);

    onBeforeMount(async()=>{
        user.value = await auth.getUser();
        
        console.log(user.value);
    })
</script>

<template>
    <layout-admin>
        <h3>Dashboard</h3>
        <p v-if="user">Welcome {{user.name}}</p>
    </layout-admin>
</template>