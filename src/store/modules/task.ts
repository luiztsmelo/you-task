import dayjs from 'dayjs'
import { groupBy } from 'lodash'

export default {
  state: () => ({ 
    tasks: [
      {
        startDate: '2022-08-02T03:00:00.000Z',
        text: 'Lavar carro',
        priority: '1',
        dueDate: '2022-10-02T03:00:00.000Z',
        done: false,
        doneAt: null
      },
      {
        startDate: '2022-08-17T03:00:00.000Z',
        text: 'Comprar roupa',
        priority: '2',
        dueDate: null,
        done: true,
        doneAt: '2022-11-07T03:00:00.000Z'
      },
      {
        startDate: '2022-08-13T03:00:00.000Z',
        text: 'Aprender inglês',
        priority: '3',
        dueDate: '2023-02-22T03:00:00.000Z',
        done: true,
        doneAt: '2022-08-17T03:00:00.000Z'
      }
    ]
  }),
  getters: {
    startedTasksGroupedByDay (state) {
      return groupBy(state.tasks, 'startDate')
    },
    doneTasksGroupedByDay (state) {
      return groupBy(state.tasks, 'doneAt')
    }
  },
  mutations: {
    ADD_TASK (state, task) {
      state.tasks.push(task)
    },
    DELETE_TASK (state, task) {
      state.tasks = state.tasks.filter(_task => _task !== task)
    },
    CHECK_TASK (state, task) {
      const taskFound = state.tasks.find(_task => _task === task)

      if (taskFound) {
        if (taskFound.done) {
          taskFound.done = false
          taskFound.doneAt = null
        } else {
          taskFound.done = true
          taskFound.doneAt = dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`).toISOString()
        }
      }
    }
  },
  actions: {
  }
}
