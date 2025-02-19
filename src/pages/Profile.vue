<script setup lang="ts">

  import {ref} from "vue";
  import {useAuthStore} from "../../store/authStore.ts";
  import Alert from "../components/Alert.vue";
  const newUserNameRef = ref("")

  const oldPasswordRef =ref("")
  const newPasswordRef= ref("")

  const authStore = useAuthStore()

  const errorUpdateUsernameRef = ref(false)
  const successUpdateUsernameRef = ref(false)

  const onSubmitNewUserName = async () => {
    const response = await  fetch(import.meta.env.VITE_UPDATE_USERNAME, {
      method : "PUT",
      headers : {"Content-Type" : "application/json", Authorization: `Bearer ${authStore.token}`},
      body : JSON.stringify({newUsername : newUserNameRef.value})
    })

    if (!response.ok) {
      errorUpdateUsernameRef.value = true;
      return
    }
    successUpdateUsernameRef.value = true

  }
</script>

<template>
  <Alert v-if="errorUpdateUsernameRef" value="Erreur lors de la mise à jour de votre nom d'utilisateur" class="alert-error"/>
  <Alert v-if="successUpdateUsernameRef" value="Mise à jour de votre nom d'utilisateur validé" class="alert-success"/>

  <h1>Page de profile</h1>

  <div class="w-1/3 mx-auto bordered rounded-2xl p-6 bg-error">
    <h2 class="text-center">Update username</h2>
    <form class="mx-auto" @submit.prevent="onSubmitNewUserName">
      <div>
        <label for="username">Username</label>
        <input v-model="newUserNameRef" id="username" type="text" class="input input-bordered w-full" required />
      </div>
      <button type="submit" class="btn btn-warning my-4">Update</button>
    </form>
  </div>




  <div class="my-6 w-1/3 mx-auto bordered rounded-2xl p-6 bg-error">
    <h2 class="text-center">Update password</h2>
    <form class="mx-auto" @submit.prevent="">
      <div>
        <label for="old-password">Old Password</label>
        <input v-model="oldPasswordRef" id="old-password" type="password" class="input input-bordered w-full" required />
      </div>

      <div>
        <label for="new-password">New Password</label>
        <input v-model="newPasswordRef" id="new-password" type="password" class="input input-bordered w-full" required />
      </div>
      <button type="submit" class="btn btn-warning my-4">Update</button>
    </form>
  </div>



</template>

<style scoped>

</style>