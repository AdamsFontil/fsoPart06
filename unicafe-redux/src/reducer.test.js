import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('should handle the GOOD action', () => {
    const action = { type: 'GOOD' }
    const initialState = { good: 0, ok: 0, bad: 0 }
    const expectedState = { good: 1, ok: 0, bad: 0 }
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  test('should handle the OK action', () => {
    const action = { type: 'OK' }
    const initialState = { good: 0, ok: 0, bad: 0 }
    const expectedState = { good: 0, ok: 1, bad: 0 }
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  test('should handle the BAD action', () => {
    const action = { type: 'BAD' }
    const initialState = { good: 0, ok: 0, bad: 0 }
    const expectedState = { good: 0, ok: 0, bad: 1 }
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  test('should handle the RESET action', () => {
    const action = { type: 'RESET' }
    const initialState = { good: 1, ok: 2, bad: 3 }
    const expectedState = { good: 0, ok: 0, bad: 0 }
    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })
  test('should arrive at specific result', () => {
    const initialState = { good: 0, ok: 0, bad: 0 }

    // Dispatch a sequence of actions
    const action1 = { type: 'GOOD' }
    const action2 = { type: 'OK' }
    const action3 = { type: 'BAD' }
    const action4 = { type: 'GOOD' }
    const action5 = { type: 'OK' }
    const action6 = { type: 'GOOD' }
    const action7 = { type: 'OK' }
    const action8 = { type: 'GOOD' }
    const action9 = { type: 'BAD' }
    const action10 = { type: 'GOOD' }
    const action11 = { type: 'OK' }
    const actionSequence = [action1, action2, action3, action4, action5, action6, action7, action8, action9,action10,action11]

    // Apply the actions to the reducer
    const finalState = actionSequence.reduce(counterReducer, initialState)

    // Check if the final state matches the expected state
    const expectedState = { good: 5, ok: 4, bad: 2 }
    expect(finalState).toEqual(expectedState)
  })
})
