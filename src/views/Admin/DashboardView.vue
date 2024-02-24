<script setup>
    import LayoutAdmin from './../../layouts/LayoutAdmin.vue'
    import { onBeforeMount, ref, watch } from 'vue';
    import { useAuthStore } from '@/stores/auth';

    const auth = useAuthStore();
    const user = ref(null);

    onBeforeMount(async()=>{
        auth.getUser();
    })

    watch(
        () => auth.currentUser,
        () => {
            user.value = auth.currentUser;
        },
    )
</script>

<template>
    <layout-admin>
        <h3>Dashboard</h3>
        <p v-if="user">Welcome {{user.name}}</p>
    </layout-admin>
</template>