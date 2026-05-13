'use client'

import { useState } from 'react'

const DISCORD_LOGO =
  'https://cdn.discordapp.com/attachments/1420846052512370690/1504076749166608434/Captura_de_ecra_2026-05-06_175911-Photoroom.png?ex=6a05ac21&is=6a045aa1&hm=b6c99ffef87f11232d33b8037575aed7cf7b3d02f9fc59147d12af107cac85f2&'

interface LogoImageProps {
  className?: string
}

export default function LogoImage({ className = 'w-10 h-10' }: LogoImageProps) {
  const [src, setSrc] = useState(DISCORD_LOGO)
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Logo O Guga Barbearia"
      className={`object-contain ${className}`}
      onError={() => {
        if (src === DISCORD_LOGO) {
          // Discord URL expired — try local file
          setSrc('/logo.png')
        } else {
          setFailed(true)
        }
      }}
    />
  )
}
