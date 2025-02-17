<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {useAuthStore} from "../../store/authStore.ts"
  import {onMounted} from "vue";
  import {useModelStore} from "../../store/modelStore.ts";

  const modelStore =   useModelStore()
  const authStore = useAuthStore()
  const router = useRouter()

  function onLogout() {
    authStore.logout()
    router.push("/login")
  }

  function onModelChange(event : any) {
    modelStore.setChosenModel(event.target.value)
  }


  onMounted(() => {
      modelStore.fetchModels()
  })
</script>

<template>


  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <select  @change="onModelChange($event)" v-if="authStore.isAuthenticated"  class="select w-full max-w-xs">
      <option :selected="modelStore.chosenModel === model" :value="model" :key="model" v-for="model in modelStore.modelsList" >{{model}}</option>
    </select>

    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">


            <template v-if="!authStore.isAuthenticated">
              <li><RouterLink to="/register">Register</RouterLink></li>
              <li><RouterLink to="/login">Login</RouterLink></li>
            </template>

         <template v-if="authStore.isAuthenticated">
           <li><a>Profile</a></li>
           <li @click="onLogout"><a>Logout</a></li>
         </template>
        </ul>
      </div>
    </div>
  </div>
</template>

