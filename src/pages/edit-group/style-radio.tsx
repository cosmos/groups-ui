import * as React from 'react'
import { radioStyles } from './edity-group'
import clsx from 'clsx'
import { Radio, RadioProps } from '@material-ui/core'

export function StyledRadio(props: RadioProps) {
  const classes = radioStyles()

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
}
