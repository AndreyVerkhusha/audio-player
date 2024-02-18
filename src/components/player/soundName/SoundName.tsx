import React, { FC, memo } from 'react'
import './SoundName.scss'

export const SoundName: FC<{ titleSound: string }> = memo(({ titleSound }) => {
  return <div className="sound__name">{titleSound}</div>
})
