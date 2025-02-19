<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {useAuthStore} from "../../store/authStore.ts"
  import {onMounted, ref, onBeforeMount} from "vue";
  import {useModelStore} from "../../store/modelStore.ts";
  import {daisyUiThemes} from "../themes";
  import {useThemeStore} from "../../store/themeStore.ts";


  const themeStore = useThemeStore()
  const modelStore =   useModelStore()
  const authStore = useAuthStore()
  const router = useRouter()

  const userTheme = ref(themeStore.getCurrentTheme)

  function onLogout() {
    authStore.logout()
    router.push("/login")
  }

  function onModelChange(event : any) {
    modelStore.setChosenModel(event.target.value)
  }


  onBeforeMount(() => {
    document.querySelector("html")!.dataset.theme = userTheme.value
  })
  onMounted(() => {
      modelStore.fetchModels()

  })
</script>

<template>


  <div class="navbar bg-base-100">
    <div class="flex-1">
      <template v-if="authStore.isAuthenticated">
        <label for="my-drawer" class="cursor-pointer">
          <img src="/drawer.png" alt="" width=32>
        </label>
      </template>
      <h1 class="btn btn-ghost text-xl">ChatBotSIO</h1>
    </div>

    <select class="select w-full max-w-xs" v-model="userTheme" @change="themeStore.changeTheme(userTheme)">
      <option :selected="userTheme === theme" :key="theme" v-for="theme in daisyUiThemes">{{theme}}</option>
    </select>

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
           <li><RouterLink to="/profile">Profile</RouterLink></li>
           <li @click="onLogout"><a>Logout</a></li>
         </template>
        </ul>
      </div>
    </div>
  </div>
</template>

