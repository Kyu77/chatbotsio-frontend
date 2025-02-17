<script setup lang="ts">
const props = defineProps(['value', 'class'])
</script>

<template>

  <div role="alert" class="alert" :class="props.class">
    <span>{{props.value}}</span>
  </div>
</template>

<style scoped>

</style>