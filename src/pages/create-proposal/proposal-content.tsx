import { Button, Paper, TextField } from '@material-ui/core'
import {
  ArrowBack,
  ChatBubbleOutline,
  Check,
  Close,
  ThumbDown,
} from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import { statusStyles, useStyles } from './proposal-style'

const ProposalContent = () => {
  const classes = useStyles()
  const status = statusStyles()

  return (
    <>
      <Link
        to="#"
        style={{
          fontSize: '12px',
          textTransform: 'uppercase',
          fontWeight: 800,
        }}
        className={classes.link}
        onClick={() => console.log('click')}
      >
        <ArrowBack style={{ fontSize: '18px', marginRight: '8px' }} />
        Foo dev team
      </Link>
      <Paper
        style={{
          display: 'flex',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      >
        <div className={classes.parChange}>
          <div className={classes.info}>
            <p>#5</p>
            <span
              className={`${status.marker} green`}
              style={{ margin: '0 22px' }}
            >
              Submited
            </span>
            <span className={`${status.marker} orange`}>Unfinilized</span>
          </div>
          <div>
            <h1 style={{ marginBottom: '25px' }}>Parameter Change Proposal</h1>
            <p className="text" style={{ fontSize: '18px' }}>
              MaxValidators=50 to MaxValidators=75 / This proposal will increase
              the number of active validator to 75 in the regen network. <br />{' '}
              <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={classes.grayBlock}>
            <h3>Parameter change</h3>
            <div className="values">
              <div>
                <h4 style={{ marginBottom: '10px' }}>Old value</h4>
                <p
                  className="text"
                  style={{
                    backgroundColor: '#F8DAD4',
                    width: '30px',
                    textAlign: 'center',
                  }}
                >
                  50
                </p>
              </div>
              <div style={{ marginRight: '190px' }}>
                <h4 style={{ marginBottom: '10px' }}>New value</h4>
                <p
                  className="text"
                  style={{
                    backgroundColor: '#DCF0E3',
                    width: '30px',
                    textAlign: 'center',
                  }}
                >
                  75
                </p>
              </div>
            </div>
            <div className="values">
              <div>
                <h4 style={{ marginBottom: '10px' }}>key</h4>
                <p className="text">MaxValidators</p>
              </div>
              <div style={{ marginRight: '200px' }}>
                <h4 style={{ marginBottom: '10px' }}>subspace</h4>
                <p className="text">Staking</p>
              </div>
            </div>
          </div>
          <Link
            to="#"
            className={classes.link}
            onClick={() => console.log('click')}
          >
            <ChatBubbleOutline
              style={{ fontSize: '18px', marginRight: '8px' }}
            />
            View discussion on group forum»
          </Link>
        </div>
        <div className={classes.voting}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              marginBottom: '35px',
            }}
          >
            <h3>Voting group:</h3>
            <p style={{ marginLeft: '10px' }}>Foo Dev Team</p>
          </div>
          <Doughnut
            data={{
              labels: ['No', 'Abstain', 'Yes'],
              datasets: [
                {
                  label: 'My First Dataset',
                  data: [25.1, 4.9, 65],
                  backgroundColor: ['#F2B5A8', '#FFE7AD', '#B9E1C7'],
                  hoverOffset: 5,
                },
              ],
            }}
          />
          <p style={{ marginBottom: '30px', marginTop: '40px' }}>
            Voting closes Nov 29zth 2021, 12:00:35 AM
          </p>
          <div style={{ width: '100%' }}>
            <div className={classes.btnBox}>
              <Button variant="outlined" className={`${status.button} green`}>
                <Check style={{ fontSize: '20px', marginRight: '5px' }} />
                Vote Yes
              </Button>
              <Button variant="outlined" className={`${status.button} red`}>
                <Close style={{ fontSize: '20px', marginRight: '5px' }} />
                Vote No
              </Button>
            </div>
            <div className={classes.btnBox}>
              <Button variant="outlined" className={`${status.button} yellow`}>
                Abstain
              </Button>
              <Button variant="outlined" className={`${status.button} orange`}>
                <ThumbDown style={{ fontSize: '20px', marginRight: '5px' }} />
                veto
              </Button>
            </div>
          </div>
        </div>
      </Paper>
      <Paper
        style={{
          borderRadius: '10px',
          padding: '45px 40px',
          marginBottom: '20px',
        }}
      >
        <h2>Proposal Details</h2>
        <div style={{ display: 'flex', marginTop: '55px' }}>
          <div className={classes.propDetails}>
            <h4>Proposer</h4>
            <p className="text">
              regen1gjvu75cq6qxyrtdv66lx9xe92jw9gqdeh64c6g...
            </p>
            <h4>height</h4>
            <p className="text">1,361,617</p>
            <h4>Submit Time</h4>
            <p className="text">14 days ago (Oct 29th 2021 11:43:32 AM )</p>
            <h4>Voting Start Time</h4>
            <p className="text">12 days ago (Oct 29th 2021 12:00:35 AM )</p>
            <h4>Voting End Time</h4>
            <p className="text">in 2 days (Nov 29th 2021 12:00:35 AM )</p>
          </div>
          <div className={classes.content}>
            <h4>content</h4>
            <TextField
              style={{
                backgroundColor: '#FAFAFA',
                padding: '12px',
              }}
              fullWidth
              multiline
              rows={15}
            />
          </div>
        </div>
      </Paper>
    </>
  )
}

export default ProposalContent