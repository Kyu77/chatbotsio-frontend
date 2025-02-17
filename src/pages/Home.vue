<script setup lang="ts">
import { Marked } from "marked"
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';


const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, _info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
);



import {computed, ref, onMounted} from "vue";
import {useAuthStore} from "../../store/authStore.ts";
import {useModelStore} from "../../store/modelStore.ts";
import Alert from "../components/Alert.vue";

const authStore = useAuthStore()
const modelStore = useModelStore()

const disbleSubmitButton = ref(false)
const userInput = ref("")
const messages = ref([])
const chatId = ref("")
const errorChat = ref(false)
const chatHistories = ref([])



async function getHistory() {
  const response = await fetch(import.meta.env.VITE_HISTORY_ENDPOINT, {
    headers: {Authorization: `Bearer ${authStore.token}`},
  })
  if(!response.ok) return alert("Erreur chargement historique")
  chatHistories.value = await response.json()
}


async  function onSubmit () {
  disbleSubmitButton.value = true
  const userMessage = {content: userInput.value, role: 'user'}
  userInput.value = ""

  // @ts-ignore
  messages.value.push(userMessage)

  const body = JSON.stringify({
    chatId: chatId.value,
    aiModel: modelStore.chosenModel,
    contents: messages.value
  })


  const response = await fetch(import.meta.env.VITE_CHAT_ENDPOINT, {
    method: "POST",
    headers: {Authorization: `Bearer ${authStore.token}`, 'Content-Type' : 'application/json'},
    body: body
  })

  if (!response.ok) {
    errorChat.value = true
    return
  }

  const modelMessage = {content: '', role: 'assistant'}
  // @ts-ignore
  messages.value.push(modelMessage)

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()


  while (true) {
    const {done, value} = await reader.read()
    if (done) {
      break
    }

    const text = decoder.decode(value)
    modelMessage.content += text
    messages.value = [...messages.value]
  }

  disbleSubmitButton.value = false

}

const bubblePosition = computed(() => (role: string) => role === 'user' ? 'chat-end' : 'chat-start'); 
onMounted(() => getHistory())

</script>

<template>


  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Alert v-if="errorChat" value="Erreur Stream chat" class="alert-error"/>

      <main class=" rounded p-10 my-10 min-h-[70vh] max-h-[70vh] overflow-scroll ">
        <div v-for="message in messages" :key="Date.now()"   class="chat" :class="bubblePosition(message.role!)">
          <div class="chat-bubble " v-html="marked.parse(message.content!)"></div>
        </div>
      </main>
      <form @submit.prevent="onSubmit"
            class=" relative bottom-0 left-0 right-0 w-2/3 mx-auto flex items-center gap-2 justify-center">
        <textarea v-model="userInput"  class="textarea w-full h-[48px] textarea-bordered" placeholder="CHAT HERE !!"></textarea>

        <button :disabled="disbleSubmitButton"  type="submit" class="btn btn-outline btn-accent">Send</button>
      </form>
      <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
         <template v-if="chatHistories.length > 0">
          <li v-for="history in chatHistories">
            <RouterLink to="">{{ history.title }}</RouterLink>
          </li>
         </template>
         <template v-else><span>Historique vide</span></template>
       
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>