<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router"
import Alert from "../components/Alert.vue";
import {useAuthStore} from "../../store/authStore.ts";

const router = useRouter()
const authStore = useAuthStore()
const errorLoginRef = ref(false)
const emailRef = ref("")
const passwordRef = ref("")


async function onSubmit () {
  const data = {
    email : emailRef.value,
    password : passwordRef.value
  }

  const response = await  fetch(import.meta.env.VITE_LOGIN_ENDPOINT, {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(data)
  })

  if(!response.ok) {
    errorLoginRef.value = true
    return
  }
  const resData = await  response.json()
  authStore.setToken(resData.token)

  await router.push("/")

}

</script>

<template>
  <Alert v-if="errorLoginRef" class="alert-error" value="Erreur lors de la connexion"/>
  <h1 class="text-4xl text-center">Login page</h1>
  <form class="w-1/2 mx-auto" @submit.prevent="onSubmit">
    <div>
      <label for="email">Email</label>
      <input v-model="emailRef" id="email" type="email" class="input input-bordered w-full" />
    </div>

    <div>
      <label for="password">Password</label>
      <input v-model="passwordRef" id="password" type="password" class="input input-bordered w-full" />
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<style scoped>

</style>