<script setup>

import {ref} from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const auth = useAuthStore();

const login_email = ref("");
const password = ref("");

const rules = {
  login_email: {required, email},
  password: {required}
}

const validate = useVuelidate(rules, {login_email, password});

const login = ()=>{
  const result = validate.value.$validate();
  result.then((response) => {
    if(response) { 
      auth.processing_login = true;
      auth.login({email: login_email, password});
    }
  }).catch((err) => {
    console.log(err);
  })
  
}
</script>
<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="d-flex align-items-center justify-content-center h-100 flex-wrap">
            <div>
                
                <h1>Welcome Back!</h1>
                <p>Login in to your account to access dashboard</p>
                <div class="alert alert-danger" role="alert" v-if="auth.login_errors">
                  {{auth.login_errors}}
                </div>
                <form @submit.prevent="">
                  <!-- Email input -->
                  <div class="form-outline mb-3">
                      <label>Email Address</label>
                      <input type="email" class="form-control" v-model="login_email"/>
                      <span v-for="(error, index) in validate.login_email.$errors" :key="index">
                        {{ error.$message }}
                      </span>
                  </div>
        
                  <!-- Password input -->
                  <div class="form-outline mb-3">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="password" />
                  </div>
        
                  <!-- Submit button -->
                  <button @click="login" class="btn btn-primary btn-block" :disabled="auth.processing_login">{{auth.processing_login?'Processing..':'Sign In'}}</button>
        
                </form>
              </div>
            <div>
              <img src="./../../assets/lock.jpg" class="img-fluid" alt="Login image">
            </div>
          </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

</style>