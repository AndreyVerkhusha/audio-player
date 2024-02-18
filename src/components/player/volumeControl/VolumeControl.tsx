import React, { FC, memo } from 'react'
import { Slider } from '../slider'

import { ReactComponent as VolumeCross } from '../../../assets/images/playerControls/volume-cross.svg'
import { ReactComponent as VolumeLoud } from '../../../assets/images/playerControls/volume-loud.svg'
import './VolumeControl.scss'

type Props = {
  volumeChange: (value: number) => void
  percentage: number
}

export const VolumeControl: FC<Props> = memo(({ volumeChange, percentage }) => {
  return (
    <div className="volume__control">
      <VolumeCross onClick={() => volumeChange(0)} />
      <Slider percentage={percentage} onChange={volumeChange} />
      <VolumeLoud onClick={() => volumeChange(100)} />
    </div>
  )
})
