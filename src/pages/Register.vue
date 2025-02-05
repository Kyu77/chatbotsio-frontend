<script setup lang="ts">


import {ref} from "vue";

const usernameInput = ref("")
const emailInput = ref("")
const passwordInput = ref("")

async function onSubmit() {

  const data = {
    username : usernameInput.value,
    email : emailInput.value,
    password : passwordInput.value,
  }
 const response =  await fetch( import.meta.env.VITE_REGISTER_ENDPOINT, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  })

  if(!response.ok) return alert("Register Error")
  alert("Register OK")

}


</script>

<template>
  <h1 class="text-4xl text-center">Register page</h1>


  <form class="w-1/2 mx-auto" @submit.prevent="onSubmit">
     <div>
       <label for="username">Username</label>
       <input v-model="usernameInput" id="username" type="text" class="input input-bordered w-full" />
     </div>

    <div>
      <label for="email">Email</label>
      <input v-model="emailInput" id="email" type="email" class="input input-bordered w-full" />
    </div>

    <div>
      <label for="password">Password</label>
      <input v-model="passwordInput" id="password" type="password" class="input input-bordered w-full" />
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
  </form>
</template>

<style scoped>

</style>