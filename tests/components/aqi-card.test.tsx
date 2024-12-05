import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AQICard from '@/components/aqi-card'
import * as api from '@/app/api/fetchAqiData/fetchAqi'

vi.mock('@/app/api/fetchAqiData/fetchAqi', () => ({
  useAQIData: vi.fn()
}))

describe('AQICard', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  it('shows loading state', () => {
    vi.mocked(api.useAQIData).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    })

    render(<AQICard city="Lahore" />, { wrapper })
    expect(screen.getByText(/Loading AQI data/i)).toBeInTheDocument()
  })

  it('displays AQI data successfully', () => {
    vi.mocked(api.useAQIData).mockReturnValue({
      data: {
        aqi: 45,
        weather: {
          tp: 25,
          hu: 60,
        },
        weatherIcon: '01d'
      },
      isLoading: false,
      error: null
    })

    render(<AQICard city="Lahore" />, { wrapper })
    
    expect(screen.getByText(/45/)).toBeInTheDocument()
    expect(screen.getByText(/Temperature: 25°C/i)).toBeInTheDocument()
    expect(screen.getByText(/Humidity: 60%/i)).toBeInTheDocument()
  })

  it('handles error state', () => {
    vi.mocked(api.useAQIData).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Error fetching AQI data')
    })

    render(<AQICard city="Lahore" />, { wrapper })
    expect(screen.getByText(/Error fetching AQI data/i)).toBeInTheDocument()
  })
})
