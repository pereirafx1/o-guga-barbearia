'use client'

interface LogoImageProps {
  className?: string
}

export default function LogoImage({ className = 'w-10 h-10' }: LogoImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Logo O Guga Barbearia"
      className={`object-contain ${className}`}
      onError={(e) => {
        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}
