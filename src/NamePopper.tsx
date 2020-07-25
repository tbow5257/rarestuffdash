import React from "react";
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper'
import {
    usePopupState,
    bindTrigger,
    bindPopper,
  } from 'material-ui-popup-state/hooks'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'

  

type PopoverPopupStateProps = {
    name: string,
    youtubeURL: string,
    discogsURL: string,
}


export default function NamePopper({name, youtubeURL, discogsURL}: PopoverPopupStateProps) {
    const popupState = usePopupState({
      variant: 'popper',
      popupId: 'demoPopper',
    })
    return (
      <div>
        <Button variant="outlined" {...bindTrigger(popupState)}>
          {name}
        </Button>
        <Popper
          {...bindPopper(popupState)} transition
        >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={500}>
            <Paper>
              <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                <Button href={youtubeURL} rel="noreferrer noopener"  target="_blank">Youtube</Button>
                <Button href={discogsURL} rel="noreferrer noopener"  target="_blank">Discogs</Button>
              </ButtonGroup>
            </Paper>
          </Fade>
        )}
        </Popper>
      </div>
    )
  }
  