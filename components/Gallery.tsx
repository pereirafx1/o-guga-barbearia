'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

// Curated barbershop gallery items using Unsplash
const gallery = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    alt: 'Corte de cabelo clássico',
    label: 'Corte Clássico',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
    alt: 'Barbeiro a trabalhar',
    label: 'Arte do Barbeiro',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
    alt: 'Tratamento de barba',
    label: 'Barba Perfeita',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=600&q=80',
    alt: 'Interior da barbearia',
    label: 'O Nosso Espaço',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80',
    alt: 'Fade moderno',
    label: 'Degradê Moderno',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=600&q=80',
    alt: 'Ferramentas de barbeiro',
    label: 'Ferramentas Premium',
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState<(typeof gallery)[0] | null>(null)

  return (
    <section id="galeria" className="py-28 bg-obsidian relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">Trabalhos</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3 mb-4">
            Galeria
          </h2>
          <div className="section-divider" />
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`relative overflow-hidden group ${
                i === 0 || i === 3 ? 'row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 || i === 3 ? 'auto' : '1' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                style={{ minHeight: i === 0 || i === 3 ? '400px' : '200px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-sans text-xs tracking-widest uppercase text-cream">{item.label}</span>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-300 pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 border border-gold/40 flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected.src.replace('w=600', 'w=1200')}
              alt={selected.alt}
              className="w-full max-h-[80vh] object-contain"
            />
            <p className="font-sans text-xs tracking-widest uppercase text-gold text-center mt-4">
              {selected.label}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
