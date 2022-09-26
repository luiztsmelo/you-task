<template lang="pug">
apexchart(type="bar" height="320" :options="chartOptions" :series="series")
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { uniq } from 'lodash'
import dayjs from 'dayjs'

const store = useStore()

const categories = computed(() => {
  const startedTasksDates = Object.keys(store.getters['task/startedTasksGroupedByDay'])
  const doneTasksDates = Object.keys(store.getters['task/doneTasksGroupedByDay'])
  
  const categories = uniq(startedTasksDates.concat(doneTasksDates).filter(date => date !== 'null'))

  const categoriesSorted = categories.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())

  return categoriesSorted
})

const startedTasksSeriesData = computed(() => {
  const startedTasksSeriesData = []

  for (let date of categories.value) {
    const tasksByDayEntries = Object.entries(store.getters['task/startedTasksGroupedByDay'])

    if (tasksByDayEntries.some(tasksByDayEntry => tasksByDayEntry[0] === date)) {
      for (const tasksByDayEntry of tasksByDayEntries) {
        if (tasksByDayEntry[0] === date) {
          startedTasksSeriesData.push(tasksByDayEntry[1].length)
        }
      }
    } else {
      startedTasksSeriesData.push(0)
    }
  }

  return startedTasksSeriesData
})

const doneTasksSeriesData = computed(() => {
  const doneTasksSeriesData = []

  for (const date of categories.value) {
    const tasksByDayEntries = Object.entries(store.getters['task/doneTasksGroupedByDay'])

    if (tasksByDayEntries.some(tasksByDayEntry => tasksByDayEntry[0] === date)) {
      for (const tasksByDayEntry of tasksByDayEntries) {
        if (tasksByDayEntry[0] === date) {
          doneTasksSeriesData.push(tasksByDayEntry[1].length)
        }
      }
    } else {
      doneTasksSeriesData.push(0)
    }
  }

  return doneTasksSeriesData
})

const series = computed(() => {
  return [{
    name: 'Started',
    data: startedTasksSeriesData.value
  }, {
    name: 'Done',
    data: doneTasksSeriesData.value
  }]
})

const chartOptions = computed(() => {
  return {
    chart: {
      fontFamily: 'Outfit, Arial',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '40%'
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [
      '#072ac8', '#09bc8a'
    ],
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories.value,
      labels: {
        formatter: (date: string) => {
          return dayjs(date).format('DD/MM/YYYY')
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          return Math.round(val)
        }
      }
    },
    fill: {
      opacity: 1
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
    