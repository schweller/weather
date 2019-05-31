import { useFetchSubdivisions } from './SubdivisionsSelect'
import { renderHook, act } from 'react-hooks-testing-library'
import axios from 'axios'

jest.mock('axios')

describe('useFetchCountries', () => {
  test('should call axios one time', async () => {
    axios.mockResolvedValue({'data': []})

    const { result } = renderHook(() => useFetchSubdivisions())

    act(() => result.current.setSubdivisions(
      [{
        'name': 'California',
        'capital': 'Sacramento'
      }]
    ))

    expect(axios).toHaveBeenCalledTimes(1)
    expect(result.current.subdivisions.length).toBe(1)
  })
})
