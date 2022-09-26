import type { Task, TaskState } from '@/types/task'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'

export default {
  state: () => ({ 
    tasks: [
      {
        startDate: '2022-08-02T03:00:00.000Z',
        text: 'Lavar carro',
        priority: 'LOW',
        dueDate: '2022-10-02T03:00:00.000Z',
        done: false,
        doneDate: null
      },
      {
        startDate: '2022-08-17T03:00:00.000Z',
        text: 'Comprar roupa',
        priority: 'MEDIUM',
        dueDate: null,
        done: true,
        doneDate: '2022-11-07T03:00:00.000Z'
      },
      {
        startDate: '2022-08-13T03:00:00.000Z',
        text: 'Aprender inglês',
        priority: 'HIGH',
        dueDate: '2023-02-22T03:00:00.000Z',
        done: true,
        doneDate: '2022-08-17T03:00:00.000Z'
      }
    ] as Task[]
  }),
  getters: {
    startedTasksGroupedByDay (state: TaskState) {
      return groupBy(state.tasks, 'startDate')
    },
    doneTasksGroupedByDay (state: TaskState) {
      return groupBy(state.tasks, 'doneDate')
    }
  },
  mutations: {
    ADD_TASK (state: TaskState, task: Task) {
      state.tasks.push(task)
    },
    DELETE_TASK (state: TaskState, task: Task) {
      state.tasks = state.tasks.filter((_task: Task) => _task !== task)
    },
    CHECK_TASK (state: TaskState, task: Task) {
      const taskFound = state.tasks.find((_task: Task) => _task === task)

      if (taskFound) {
        if (taskFound.done) {
          taskFound.done = false
          taskFound.doneDate = null
        } else {
          taskFound.done = true
          taskFound.doneDate = dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`).toISOString()
        }
      }
    }
  },
  actions: {
  }
}
