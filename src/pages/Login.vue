<script setup lang="ts">

</script>

<template>
  <h1 class="text-4xl text-center">Login page</h1>


  <form class="w-1/2 mx-auto ">


    <div>
      <label for="email">Email</label>
      <input id="email" type="email" class="input input-bordered w-full" />
    </div>

    <div>
      <label for="password">Password</label>
      <input id="password" type="password" class="input input-bordered w-full" />
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<style scoped>

</style>