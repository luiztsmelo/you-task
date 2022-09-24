<template lang="pug">
.logo(:style="`font-size: ${props.size}px`") #[strong You] #[s(style="font-weight: 300; opacity: 0.333") Task]
</template>

<script lang="ts" setup>
const props = defineProps({
  size: { 
    type: String || Number, 
    default: 22 
  }
})
</script>

<style lang="scss" scoped>
.logo {
  user-select: none;
}
</style>
    