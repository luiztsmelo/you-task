import { describe, expect, it } from 'vitest'
import store from '../src/store'

describe('Getters', () => {
  it('startedTasksGroupedByDay calculates correctly', () => {
    const startedTasksGroupedByDay = store.getters['task/startedTasksGroupedByDay']

    expect(startedTasksGroupedByDay).toStrictEqual({
      '2022-08-02T03:00:00.000Z': [
        {
          startDate: '2022-08-02T03:00:00.000Z',
          text: 'Lavar carro',
          priority: 'LOW',
          dueDate: '2022-10-02T03:00:00.000Z',
          done: false,
          doneDate: null
        }
      ],
      '2022-08-17T03:00:00.000Z': [
        {
          startDate: '2022-08-17T03:00:00.000Z',
          text: 'Comprar roupa',
          priority: 'MEDIUM',
          dueDate: null,
          done: true,
          doneDate: '2022-11-07T03:00:00.000Z'
        }
      ],
      '2022-08-13T03:00:00.000Z': [
        {
          startDate: '2022-08-13T03:00:00.000Z',
          text: 'Aprender inglês',
          priority: 'HIGH',
          dueDate: '2023-02-22T03:00:00.000Z',
          done: true,
          doneDate: '2022-08-17T03:00:00.000Z'
        }
      ]
    })
  })

  it('doneTasksGroupedByDay calculates correctly', () => {
    const doneTasksGroupedByDay = store.getters['task/doneTasksGroupedByDay']

    expect(doneTasksGroupedByDay).toStrictEqual({
      null: [
        {
          startDate: '2022-08-02T03:00:00.000Z',
          text: 'Lavar carro',
          priority: 'LOW',
          dueDate: '2022-10-02T03:00:00.000Z',
          done: false,
          doneDate: null
        }
      ],
      '2022-11-07T03:00:00.000Z': [
        {
          startDate: '2022-08-17T03:00:00.000Z',
          text: 'Comprar roupa',
          priority: 'MEDIUM',
          dueDate: null,
          done: true,
          doneDate: '2022-11-07T03:00:00.000Z'
        }
      ],
      '2022-08-17T03:00:00.000Z': [
        {
          startDate: '2022-08-13T03:00:00.000Z',
          text: 'Aprender inglês',
          priority: 'HIGH',
          dueDate: '2023-02-22T03:00:00.000Z',
          done: true,
          doneDate: '2022-08-17T03:00:00.000Z'
        }
      ]
    })
  })
})