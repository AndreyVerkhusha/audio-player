import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'

import './Slider.scss'
import cn from 'classnames'

type Props = {
  onChange: (value: number) => void
  percentage: number
  isAudioControl?: boolean
}

export const Slider: FC<Props> = memo(({ onChange, percentage, isAudioControl }) => {
  const [position, setPosition] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  const rangeRef = useRef<HTMLInputElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const rangeWidth = rangeRef.current?.getBoundingClientRect()?.width
  const thumbWidth = isAudioControl ? 0 : thumbRef.current?.getBoundingClientRect()?.width

  const handleChange = useCallback(
    (value: number) => {
      onChange(value)
    },
    [onChange],
  )

  useEffect(() => {
    if (rangeWidth && thumbWidth !== undefined) {
      const centerThumb = (thumbWidth / 100) * percentage * -1
      const centerProgressBar = thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
      setProgressBarWidth(centerProgressBar)
      setMarginLeft(centerThumb)
    }

    setPosition(percentage)
  }, [percentage, rangeWidth, thumbWidth])

  return (
    <div className="slider">
      <div className="slider__container">
        <div
          className="progress__bar"
          style={{
            width: `${progressBarWidth}px`,
          }}
        />
        <div
          className={cn('thumb', { hide: isAudioControl })}
          ref={thumbRef}
          style={{
            left: `${position}%`,
            marginLeft: `${marginLeft}px`,
          }}
        />
        <input
          className="range"
          value={position}
          ref={rangeRef}
          onChange={(e) => handleChange(Number(e.target.value))}
          type="range"
          step="0.1"
        />
      </div>
    </div>
  )
})
