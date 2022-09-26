<template lang="pug">
.task(@click="store.commit('task/CHECK_TASK', task)")
  v-checkbox(hide-details color="green" v-model="task.done")

  .body-1(:class="{ 'task__done': task.done }") {{ task.text }}

  v-chip(size="small" :color="taskPriorityIconColor" :style="{ opacity: task.done ? '0.333' : '' }") {{ taskPriorityText }}
    v-tooltip(activator="parent" location="top") Priority

  v-chip(size="small" color="grey" :style="{ opacity: task.done ? '0.333' : '' }")
    v-tooltip(activator="parent" location="top") Start Date
    v-icon(start icon="mdi-calendar-start" size="16")
    | {{ startDateFormatted }}

  v-chip(size="small" color="secondary" :style="{ opacity: task.done ? '0.333' : '' }" v-if="task.dueDate")
    v-tooltip(activator="parent" location="top") Due Date
    v-icon(start icon="mdi-calendar-end" size="16")
    | {{ dueDateFormatted }}
  div(v-else)

  v-btn.ml-3(flat size="x-small" icon @click.stop="store.commit('task/DELETE_TASK', task)")
    v-tooltip(activator="parent" location="top") Delete Task
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

const startDateFormatted = computed(() => dayjs(props.task.startDate).format('DD/MM/YYYY'))
const dueDateFormatted = computed(() => dayjs(props.task.dueDate).format('DD/MM/YYYY'))

const taskPriorityText = computed(() => {
  switch (props.task.priority) {
    case 'LOW': return '3'
    case 'MEDIUM': return '2'
    case 'HIGH': return '1'
    default: return ''
  }
})

const taskPriorityIconColor = computed(() => {
  switch (props.task.priority) {
    case 'LOW': return 'green'
    case 'MEDIUM': return 'yellow'
    case 'HIGH': return 'red'
    default: return ''
  }
})
</script>

<style lang="scss" scoped>
.task {
  display: grid;
  grid-template-columns: 40px 1fr auto auto auto auto;
  gap: 6px;
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