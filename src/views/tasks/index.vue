<template lang="pug">
.tasks-view.pa-6
  Logo(size="32")

  .tasks.mt-9
    h2.mt-6 Tasks

    .tasks-list
      Task(v-for="task in store.state.task.tasks" :task="task")

    AddTask

  .report.mt-12
    h2.mt-6 Report

    TasksReportChart
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import Logo from '@/components/Logo.vue'
import Task from '@/components/Task.vue'
import AddTask from '@/components/AddTask.vue'
import TasksReportChart from '@/components/TasksReportChart.vue'

const store = useStore()
</script>

<style lang="scss" scoped>
.tasks-view {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  .tasks {
    display: flex;
    flex-direction: column;
    width: 600px;

    .tasks-list {
      display: grid;
      grid-template-columns: 1fr;
    }
  }

  .report {
    display: flex;
    flex-direction: column;
    width: 600px;
  }
}
</style>