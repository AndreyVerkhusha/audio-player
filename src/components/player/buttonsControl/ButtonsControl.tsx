import React, { FC, memo } from 'react'
import { ReactComponent as Button } from '../../../assets/images/playerControls/prev.svg'
import { ReactComponent as Play } from '../../../assets/images/playerControls/play.svg'
import './ButtonsControl.scss'
import cn from 'classnames'

type Props = {
  isPlaying: boolean
  controlPlay: () => void
  changeSound: (orient: 'prev' | 'next') => void
}

export const ButtonsControl: FC<Props> = memo(({ controlPlay, changeSound, isPlaying }) => {
  return (
    <div className="buttons__control">
      <Button className="buttons__control item" onClick={() => changeSound('prev')} />
      <Play className={cn('buttons__control item', { play: isPlaying })} onClick={controlPlay} />
      <Button className="buttons__control item revert" onClick={() => changeSound('next')} />
    </div>
  )
})
