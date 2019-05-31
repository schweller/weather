import { useWeatherFetch } from './Weather'
import { renderHook, act } from 'react-hooks-testing-library'
import axios from 'axios'

jest.mock('axios')

describe('useWeatherFetch', () => {
  test('should call axios one time', async () => {
    axios.mockResolvedValue({'data': 'rainy in Sacramento'})

    const { result } = renderHook(() => useWeatherFetch('USA', 'Sacramento'))

    act(() => result.current.setWeather('haze in Sacramento'))

    expect(axios).toHaveBeenCalledTimes(1)
    expect(result.current.weather).toBe('haze in Sacramento')
  })
})
