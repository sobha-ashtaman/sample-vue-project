import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', ()=>{
    const processing_login = ref(false);
    const login_errors = ref(null);
    const router = useRouter();
    const currentUser = ref(null);
    const login = async (credentials)=>{
        await axios.post(`${import.meta.env.VITE_API_URL}/login`, {email: credentials.email.value, password: credentials.password.value})
        .then((response)=>{
            processing_login.value = false;
            localStorage.setItem('_token', response.data.data.token);
            router.push('/admin/dashboard');
        }).catch((error)=>{
            if(error.response){
                login_errors.value = error.response.data.message;
            }
            processing_login.value = false;
        })
    }

    const getUser = async() => {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_token')}`
            }
        })
        .then((response)=>{
            currentUser.value =  response.data.data.user;
            console.log(currentUser.value);
        }).catch((error)=>{
            return false;
        })
    }

    const logOut = ()=>{
        localStorage.removeItem('_token');
        router.push('/admin');
    }

    return {login, processing_login, login_errors, getUser, currentUser};
})