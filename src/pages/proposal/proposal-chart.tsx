import {Button} from '@material-ui/core'
import {Check, Close, ThumbDown} from '@material-ui/icons'
import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import {statusStyles, useStyles} from './proposal-style'
import {useStores} from "../../shared-state/repo";
import {VoteOption} from "../../generated/cosmos/group/v1/types";

const ProposalChart = ({proposalId}) => {
  const classes = useStyles()
  const status = statusStyles()
    const { fetchProposalById, voteProposal } = useStores().proposalsStore

  return (
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
          <Button onClick={() => voteProposal(proposalId, VoteOption.VOTE_OPTION_YES, '')}
                  variant="outlined" className={`${status.button} green`}>
            <Check style={{ fontSize: '20px', marginRight: '5px' }} />
            Vote Yes
          </Button>
          <Button onClick={() => voteProposal(proposalId, VoteOption.VOTE_OPTION_NO, '')}
                  variant="outlined" className={`${status.button} red`}>
            <Close style={{ fontSize: '20px', marginRight: '5px' }} />
            Vote No
          </Button>
        </div>
        <div className={classes.btnBox}>
          <Button onClick={() => voteProposal(proposalId, VoteOption.VOTE_OPTION_ABSTAIN, '')}
                  variant="outlined" className={`${status.button} yellow`}>
            Abstain
          </Button>
          <Button onClick={() => voteProposal(proposalId, VoteOption.VOTE_OPTION_NO_WITH_VETO, '')}
                  variant="outlined" className={`${status.button} orange`}>
            <ThumbDown style={{ fontSize: '20px', marginRight: '5px' }} />
            veto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProposalChart
