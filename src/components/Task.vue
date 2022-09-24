<template lang="pug">
.task(@click="store.commit('task/CHECK_TASK', task)")
  v-checkbox(hide-details color="green" v-model="task.done")

  .body-1(:class="{ 'task__done': task.done }") {{ task.text }}

  v-chip(color="green" :style="{ opacity: task.done ? '0.333' : '' }") {{ task.priority }}

  v-chip(color="secondary" :style="{ opacity: task.done ? '0.333' : '' }" v-if="task.dueDate")
    v-icon(start icon="mdi-calendar-end" size="16")
    | {{ dueDateFormatted }}
  div(v-else)

  v-btn.ml-3(flat size="x-small" icon @click="store.commit('task/DELETE_TASK', task)")
    v-icon(color="red") mdi-delete-outline
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'

const store = useStore()

const props = defineProps({
  task: {
    type: Object, 
    required: true 
  }
})

const dueDateFormatted = computed(() => dayjs(props.task.dueDate).format('DD/MM/YYYY'))
</script>

<style lang="scss" scoped>
.task {
  display: grid;
  grid-template-columns: 40px 1fr auto auto auto;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid #DADADA;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgb(247, 247, 247);
  }

  .task__done {
    text-decoration: line-through;
    opacity: 0.333;
  }
}
</style>