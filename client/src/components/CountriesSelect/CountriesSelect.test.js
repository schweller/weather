import { useFetchCountries } from './CountriesSelect'
import { renderHook, act } from 'react-hooks-testing-library'
import axios from 'axios'

jest.mock('axios')

describe('useFetchCountries', () => {
  test('should call axios one time', async () => {
    axios.mockResolvedValue({'data': []})

    const { result } = renderHook(() => useFetchCountries())

    act(() => result.current.setCountries(
      [{
        'name': 'USA'
      }]
    ))

    expect(axios).toHaveBeenCalledTimes(1)
    expect(result.current.countries.length).toBe(1)
  })
})
