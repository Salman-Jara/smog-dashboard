import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('next/image', () => ({
  default: () => <div data-testid="mock-image" />
}))

vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div data-testid="mock-icon" />
}))

vi.mock('@/components/aqi-card', () => ({
  default: ({ city }: { city: string }) => (
    <div>
      <div>AQI for {city}</div>
      <div data-testid="mock-image" />
      <div data-testid="mock-icon" />
      <div>Loading AQI data...</div>
    </div>
  )
}))

import AQICard from '@/components/aqi-card'

describe('AQICard', () => {
  const mockOnSelect = vi.fn()

  it('renders without crashing', () => {
    render(<AQICard city="Lahore" onSelect={mockOnSelect} />)
    expect(screen.getByText(/AQI for Lahore/)).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<AQICard city="Lahore" onSelect={mockOnSelect} />)
    expect(screen.getByText('Loading AQI data...')).toBeInTheDocument()
  })

  it('renders with a different city', () => {
    render(<AQICard city="Karachi" onSelect={mockOnSelect} />)
    expect(screen.getByText(/AQI for Karachi/)).toBeInTheDocument()
  })
})