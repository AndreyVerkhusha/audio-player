import React, { FC, memo, useEffect, useRef } from 'react'
import './TrackCover.scss'

type Props = {
  previewCover: string
}

export const TrackCover: FC<Props> = memo(({ previewCover }) => {
  const refPreview = useRef<HTMLImageElement>(null)

  const restartAnimation = () => {
    if (refPreview?.current) {
      refPreview.current.style.opacity = '0'
      refPreview.current.style.animation = 'none'
      refPreview.current.style.transition = 'none'
    }

    setTimeout(() => {
      if (refPreview.current) {
        refPreview.current.style.transition = 'all .3s linear'
        refPreview.current.style.opacity = '1'
      }
    }, 500)

    setTimeout(() => {
      if (refPreview.current) refPreview.current.style.animation = 'rotation 13s infinite linear'
    }, 1000)
  }

  useEffect(() => {
    restartAnimation()
  }, [previewCover])

  return (
    <div className="track__cover">
      <img ref={refPreview} className="preview" src={previewCover} alt="preview" />
    </div>
  )
})
