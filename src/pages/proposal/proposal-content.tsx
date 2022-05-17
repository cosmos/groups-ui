import { Paper, TextField } from '@material-ui/core'
import { ArrowBack, ChatBubbleOutline } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { statusStyles, useStyles } from './proposal-style'
import ProposalChart from './proposal-chart'
import { useStores } from '../../shared-state/repo'
import { Proposal } from '../../generated/cosmos/group/v1/types'
import { Group } from '../../shared-state/groups-store'
import moment from 'moment'
import { Routes } from '../../routes'

const ProposalContent = ({ proposalId, groupId }) => {
    const classes = useStyles()
    const status = statusStyles()
    const [proposal, setProposal] = React.useState<Proposal>()
    const [group, setGroup] = React.useState<Group>()
    const { fetchProposalById } = useStores().proposalsStore
    const { fetchGroupById } = useStores().groupsStore
    const history = useHistory()

    useEffect(() => {
        fetchProposalById(proposalId).then(proposal => setProposal(proposal))
        fetchGroupById(groupId).then(g => setGroup(g))
    }, [])
    return (
        <>
            <Link
                to="#"
                style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    fontWeight: 800
                }}
                className={classes.link}
                onClick={() => history.push(Routes.GROUPS_ADMIN_VIEW.replace(':id', groupId.toString()))}
            >
                <ArrowBack style={{ fontSize: '18px', marginRight: '8px' }}/>
                {group?.metadata?.name}
            </Link>
            <Paper
                style={{
                    display: 'flex',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}
            >
                <div className={classes.parChange}>
                    <div className={classes.info}>
                        <p>#{proposal?.id}</p>
                        <span
                            className={`${status.marker} green`}
                            style={{ margin: '0 22px' }}
                        >
              {proposal?.status}
            </span>
                        <span className={`${status.marker} orange`}>Unfinilized</span>
                    </div>
                    <div>
                        <h1 style={{ marginBottom: '25px' }}>{proposal?.metadata}</h1>
                        <p className="text" style={{ fontSize: '18px' }}>
                            MaxValidators=50 to MaxValidators=75 / This proposal will increase
                            the number of active validator to 75 in the regen network. <br/>{' '}
                            <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
                                        textAlign: 'center'
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
                                        textAlign: 'center'
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
                <ProposalChart proposalId={proposalId}/>
            </Paper>
            <Paper
                style={{
                    borderRadius: '10px',
                    padding: '45px 40px',
                    marginBottom: '20px'
                }}
            >
                <h2>Proposal Details</h2>
                <div style={{ display: 'flex', marginTop: '55px' }}>
                    <div className={classes.propDetails}>
                        <h4>Proposer</h4>
                        <p className="text">
                            {proposal?.proposers.join(', ')}
                        </p>
                        <h4>height</h4>
                        <p className="text">{'?'}</p>
                        <h4>Submit Time</h4>
                        <p className="text">{proposal && `${moment(proposal.submit_time).fromNow()} (${proposal.submit_time})`}</p>
                        <h4>Voting Start Time</h4>
                        <p className="text">?</p>
                        {proposal && proposal.voting_period_end &&
                        <>
                            <h4>Voting End Time</h4>
                            <p className="text">{proposal && `${moment(proposal.voting_period_end).fromNow()} (${proposal.voting_period_end})`}</p>
                        </>
                        }

                    </div>
                    <div className={classes.content}>
                        <h4>content</h4>
                        <TextField
                            style={{
                                backgroundColor: '#FAFAFA',
                                padding: '12px'
                            }}
                            fullWidth
                            multiline
                            rows={15}
                            value={proposal && JSON.stringify(proposal.messages, null, 2)}
                        />
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default ProposalContent
