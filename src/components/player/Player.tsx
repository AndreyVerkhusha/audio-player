import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ButtonsControl } from './buttonsControl'
import { SoundName } from './soundName'
import { VolumeControl } from './volumeControl'
import { AudioControl } from './audioControl'
import { mocksAudio } from '../../assets/mockAudio'
import { TrackCover } from './trackCover'
import { helpers } from '../../utils/helpers'

import './Player.scss'

export const Player = () => {
  const [percentageVolume, setPercentageVolume] = useState(20)
  const [percentageAudio, setPercentageAudio] = useState(0)
  const [currentIndxSound, setCurrentIndxSound] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const play = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      if (!isPlaying) {
        setIsPlaying(true)
        audio.play()
      }
      if (isPlaying) {
        setIsPlaying(false)
        audio.pause()
      }
    }
  }, [isPlaying])

  const changeCurrentSound = useCallback((orient: 'prev' | 'next') => {
    const soundsLength = mocksAudio.length
    setPercentageAudio(0)

    if (orient === 'next') {
      setCurrentIndxSound((prev) => (prev + 1) % soundsLength)
    }
    if (orient === 'prev') {
      setCurrentIndxSound((prev) => (prev - 1 + soundsLength) % soundsLength)
    }
  }, [])

  const volumeChange = useCallback((value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = helpers.toFixedCustom(value / 100, 2)
    }
    setPercentageVolume(value)
  }, [])

  const audioChange = useCallback((value: number) => {
    setPercentageAudio(value)
  }, [])

  const endedEvent = useCallback(() => {
    changeCurrentSound('next')
  }, [changeCurrentSound])

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = helpers.toFixedCustom(percentageVolume / 100, 2)
    }
  }, [audioRef, percentageVolume, currentIndxSound])

  return (
    <div className="player">
      <ButtonsControl controlPlay={play} isPlaying={isPlaying} changeSound={changeCurrentSound} />
      <div className="container">
        <VolumeControl percentage={percentageVolume} volumeChange={volumeChange} />
        <SoundName titleSound={mocksAudio[currentIndxSound].name} />
        <AudioControl
          endedEvent={endedEvent}
          currentIndxSound={currentIndxSound}
          audioRef={audioRef}
          percentage={percentageAudio}
          audioChange={audioChange}
          isPlaying={isPlaying}
        />
      </div>
      {isPlaying && <TrackCover previewCover={mocksAudio[currentIndxSound].preview} />}
    </div>
  )
}
