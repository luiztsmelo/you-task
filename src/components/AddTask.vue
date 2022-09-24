<template lang="pug">
.add-task.mt-2
  v-btn#add-task-form-btn(small variant="text" color="primary" prepend-icon="mdi-plus-circle" @click="showForm = true" v-if="!showForm") Add Task

  v-scroll-y-transition(hide-on-leave)
    .form.pa-3(v-if="showForm")
      v-form(ref="form" v-model="valid" lazy-validation)
        v-text-field#task-text-input(variant="underlined" :counter="100" :rules="textRules" v-model="task.text" label="Task" placeholder="e.g., Get a job" required)

        div(style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;")
          v-select(variant="underlined" :items="['1', '2', '3']" v-model="task.priority" label="Priority" required)

          date-picker(mode="date" :model-config="datePickerModelConfig" color="indigo" v-model="task.startDate")
            template(v-slot="{ showPopover }")
              v-text-field(variant="underlined" label="Start Date" prepend-inner-icon="mdi-calendar-start" @click="showPopover" v-model="task.startDate")

          date-picker(mode="date" :min-date="dueDateMinDate" :model-config="datePickerModelConfig" color="indigo" v-model="task.dueDate" )
            template(v-slot="{ showPopover }")
              v-text-field(variant="underlined" label="Due Date" prepend-inner-icon="mdi-calendar-end" @click="showPopover" v-model="task.dueDate")

      .actions
        v-btn.mr-2(variant="text" color="black" @click="showForm = false") Cancel
        v-btn#add-task-btn(color="primary" :disabled="!valid" @click="addTask") Add Task
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import vuetify from '@/plugins/vuetify'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import customParseFormat from 'dayjs/plugin/customParseFormat'
console.log(vuetify)
dayjs.extend(customParseFormat)

const store = useStore()

const datePickerModelConfig = {
  type: 'string',
  mask: 'DD/MM/YYYY'
}

const showForm = ref(false)

const valid = ref(false)

const textRules = [
  (v: string) => !!v || 'Task text is required',
  (v: string) => (v && v.length <= 100) || 'Task text must be less than 100 characters'
]

const initialTask = {
  text: '',
  priority: '1',
  startDate: dayjs().format('DD/MM/YYYY'),
  dueDate: '',
  done: false,
  doneAt: null
}

const task = reactive({ ...initialTask })

const dueDateMinDate = computed(() => {
  return task.startDate ? dayjs(task.startDate, 'DD/MM/YYYY').toDate() : new Date()
})

const addTask = () => {
  task.startDate = dayjs(task.startDate, 'DD/MM/YYYY').toISOString()
  if (task.dueDate) task.dueDate = dayjs(task.dueDate, 'DD/MM/YYYY').toISOString()
  
  store.commit('task/ADD_TASK', JSON.parse(JSON.stringify(task)))

  Object.assign(task, initialTask)

  showForm.value = false
}
</script>

<style lang="scss" scoped>
.add-task {
  display: flex;
  flex-direction: column;
  width: 100%;

  .form {
    display: flex;
    flex-direction: column;
    background-color: rgb(247, 247, 247);
    border-radius: 4px;
    width: 100%;

    .actions {
      display: flex;
      justify-content: end;
    }
  }
}
</style>