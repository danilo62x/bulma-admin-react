import { useState, type ReactNode } from 'react'

interface CarouselProps {
  slides: ReactNode[]
  indicator?: boolean
  arrow?: boolean
}

export default function Carousel({
  slides,
  indicator = true,
  arrow = true,
}: CarouselProps) {
  const [current, setCurrent] = useState(0)

  function prev() {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  }
  function next() {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))
  }

  return (
    <div className="tx-carousel">
      <div
        className="tx-carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="tx-carousel-slide-wrapper">
            {s}
          </div>
        ))}
      </div>
      {arrow && (
        <>
          <button
            type="button"
            className="tx-carousel-arrow is-left"
            onClick={prev}
            aria-label="Anterior"
          >
            <span className="mdi mdi-chevron-left" />
          </button>
          <button
            type="button"
            className="tx-carousel-arrow is-right"
            onClick={next}
            aria-label="Próximo"
          >
            <span className="mdi mdi-chevron-right" />
          </button>
        </>
      )}
      {indicator && (
        <div className="tx-carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`tx-carousel-dot ${i === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
