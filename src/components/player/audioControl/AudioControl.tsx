import React, { FC, memo, RefObject, SyntheticEvent, useCallback } from 'react'
import { Slider } from '../slider'

import './AudioControl.scss'
import { mocksAudio } from '../../../assets/mockAudio'
import cn from 'classnames'
import { helpers } from '../../../utils/helpers'

type Props = {
  percentage: number
  currentIndxSound: number
  audioChange: (value: number) => void
  audioRef?: RefObject<HTMLAudioElement>
  endedEvent: () => void
  isPlaying: boolean
}

export const AudioControl: FC<Props> = memo((props) => {
  const { audioRef, audioChange, percentage, currentIndxSound, endedEvent, isPlaying } = props

  const moveHandleAudioChange = useCallback(
    (value: number) => {
      const audio = audioRef?.current
      if (audio) {
        audio.currentTime = (audio.duration / 100) * value
      }
      audioChange(value)
    },
    [audioChange, audioRef],
  )

  const getCurrDuration = useCallback(
    (e: SyntheticEvent<HTMLAudioElement, Event>) => {
      const percent = helpers.toFixedCustom((e.currentTarget.currentTime / e.currentTarget.duration) * 100, 2)
      audioChange(+percent)
    },
    [audioChange],
  )

  const canplayEvent = () => {
    if (audioRef?.current && isPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div className={cn('audio__control', { hide: !isPlaying })}>
      <Slider percentage={percentage} onChange={moveHandleAudioChange} isAudioControl />
      <audio
        ref={audioRef}
        onEnded={endedEvent}
        onCanPlay={canplayEvent}
        src={mocksAudio[currentIndxSound].sound}
        key={mocksAudio[currentIndxSound].name}
        onTimeUpdate={getCurrDuration}
      />
    </div>
  )
})
