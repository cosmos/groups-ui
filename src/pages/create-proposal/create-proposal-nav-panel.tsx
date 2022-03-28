import React from "react";
import {Button, makeStyles, SvgIcon} from "@material-ui/core";
import {PrimaryButton} from "../../components/primary-button";
import {ReactComponent as ArrowIcon} from "../../icons/arrow.svg";

const useStyles = makeStyles((theme) => ({
    container: {
        height: '120px',
        width: '100%',
        padding: '35px 200px',
        bottom: 0,
        left: 0,
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)'
    },
    backButton: {
        height: '50px'
    },
    backButtonArrow: {
        transform: 'matrix(0, -1, -1, 0, 0, 0)',
        stroke: '#B1CAEC',
        // marginTop: '5px'
    },
    progressBarContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#D2D5D9',
        height: '8px'
    },
    progressBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: '#3D7ACF',
        height: '8px'
    }
}))

interface Props {
    buttonLabel: string
    onClick: () => void
    enableBackButton?: boolean
    onBackClick?: () => void
    progress: number
}

const CreateProposalNavPanel: React.FC<Props> = ({buttonLabel, onClick, enableBackButton, onBackClick, progress}) => {
  const classes = useStyles()

  return (
      <div className={classes.container}>
          <Button
              style={{visibility: enableBackButton ? 'visible' : 'hidden'}}
              className={classes.backButton}
              variant="outlined"
              color="primary"
              onClick={() => onBackClick()}
          >
              <SvgIcon component={ArrowIcon} className={classes.backButtonArrow}/>
          </Button>

          <PrimaryButton onClick={ onClick }>{buttonLabel}</PrimaryButton>

          <div className={classes.progressBarContainer}>
            <div className={classes.progressBar} style={{width: progress * 100 + '%'}}/>
          </div>
      </div>
  )
}

export default CreateProposalNavPanel
