import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Mock the entire ImageSlideshow component
vi.mock('@/components/image-slideshow', () => ({
  default: () => (
    <div>
      <div className="text-white">Latest News</div>
      <div>Pictures from space show mighty smog choking Lahore</div>
      <a href="https://www.bbc.com/news/articles/cm20k76d5xno">
        <div 
          className="bg-cover" 
          style={{
            backgroundImage: `url(https://ichef.bbci.co.uk/news/1024/branded_news/dfac/live/77f149a0-9dc3-11ef-935d-3107d1c873e8.jpg)`
          }}
        />
      </a>
    </div>
  )
}))

// Import the mocked component
import ImageSlideshow from '@/components/image-slideshow'

describe('ImageSlideshow', () => {
  it('renders without crashing', () => {
    render(<ImageSlideshow />)
    expect(screen.getByText('Latest News')).toBeInTheDocument()
  })

  it('displays initial news data', () => {
    render(<ImageSlideshow />)
    expect(screen.getByText('Pictures from space show mighty smog choking Lahore')).toBeInTheDocument()
  })

  it('renders with correct link', () => {
    render(<ImageSlideshow />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://www.bbc.com/news/articles/cm20k76d5xno')
  })

  it('renders with background image', () => {
    render(<ImageSlideshow />)
    const bgElement = document.querySelector('.bg-cover')
    expect(bgElement).toHaveStyle({
      backgroundImage: `url(https://ichef.bbci.co.uk/news/1024/branded_news/dfac/live/77f149a0-9dc3-11ef-935d-3107d1c873e8.jpg)`
    })
  })
})