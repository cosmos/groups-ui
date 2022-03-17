import {
    Backdrop,
    Button, createStyles,
    Fade,
    FormControl,
    IconButton,
    InputLabel, makeStyles,
    MenuItem, Modal,
    Paper,
    Select,
    TextField, Theme
} from "@material-ui/core";
import React from "react";
import {observer} from "mobx-react-lite";
import {Close} from "@material-ui/icons";
import {Chain, chainListProvider} from "./chain-list-provider";
import {useStores} from "../../shared-state/repo";
import {ChainInfo} from "@keplr-wallet/types";
import {Currency} from "@keplr-wallet/types/src/currency";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 178,
            height: 52,
            fontSize: '12px',
            fontWeight: 800,
        },
        regenChainInput: {
            fontFamily: 'Mulish',
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: '12px',
            lineHeight: '15px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#202020',
            display: 'flex',
            alignItems: 'center',
        },
        menuItem: {
            fontFamily: " 'Lato' ",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: '37px'
        },
        addChainBtn: {
            backgroundColor: 'transparent',
            fontFamily: " 'Lato' ",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: '37px',
            justifyContent: 'start',
            paddingLeft: '16px'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '130px'
        },
        modalPaper: {
            padding: '43px 30px',
            width: '556px',
            marginTop: '100px',

            "& h2": {
                fontWeight: 900,
                fontSize: "32px",
                lineHeight: '44px',
                textAlign: 'center',
                marginBottom: '57px'
            },

            "& h3": {
                fontFamily: " 'Lato' ",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: '26px',
                marginBottom: '10px',
                marginTop: '43px'
            }
        },
        addBtn: {
            fontWeight: 800,
            fontSize: '18px',
            lineHeight: '22px',
            padding: '10px 40px',
            marginLeft: '20px'
        }
    }),
);

const ChainSelector: React.FC = observer(() => {
    const { chainInfo, setChainInfo } = useStores().chainInfoStore

    const implementChain = async (chain: Chain) => {
        const currency: Currency = {
            ...chainInfo.stakeCurrency,
            coinDenom: chain.coinDenom,
            coinMinimalDenom: chain.coinMinimalDenom
        }
        const updatedChainInfo: ChainInfo = {
            ...chainInfo,
            ...chain,
            stakeCurrency: currency,
            currencies: [{ ...currency }],
            feeCurrencies: [{ ...currency }]
        }

        await setChainInfo(updatedChainInfo);
    }

    const handleChainChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
        const chainId = event.target.value as string
        if (chainId === "+") return // skip "+ new chain" option

        const chain = chainListProvider().find((chain: Chain) => chain.chainId === chainId)
        implementChain(chain)
    }

    const handleAddChain = () => {
        // todo: do we need to save in localstore all added chains?
        // todo check for the uniq name. We are using name as key for items, it should be uniq or we need to change a key
        implementChain(newChain)
        setAllChainList( [...chainListProvider(), newChain])
        setOpen(false)
    }

    const [allChainList, setAllChainList] = React.useState([...chainListProvider(), chainInfo]);
    const [open, setOpen] = React.useState(false);
    const [newChain, setNewChain] = React.useState<Chain | undefined>(undefined);
    const [presetChainId, setPresetChainId] = React.useState<string | undefined>(undefined);

    const handlePresetChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
        const chainId = event.target.value as string
        const presetChainInfo = chainListProvider().find((chain: Chain) => chain.chainId === chainId)

        setPresetChainId(presetChainInfo.chainId)
        setNewChain({...presetChainInfo})
    }

    const handleOpen = async () => {
        setNewChain({
                chainId: chainInfo.chainId,
                chainName: chainInfo.chainName,
                rpc: chainInfo.rpc,
                rest: chainInfo.rest,
                coinDenom: chainInfo.stakeCurrency.coinDenom,
                coinMinimalDenom: chainInfo.stakeCurrency.coinMinimalDenom
        })
        setPresetChainId(chainInfo.chainId)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label" className={classes.regenChainInput}>regen chain</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={chainInfo.chainId}
                    onChange={handleChainChanged}
                    label="REGEN CHAIN"
                >
                    { allChainList.map( (chain: Chain) =>
                        <MenuItem key={chain.chainName} value={chain.chainId} className={classes.menuItem}>{chain.chainName}</MenuItem>
                    )}

                    <MenuItem key="+" value="+" style={{ padding: '0' }}>
                        <Button className={classes.addChainBtn}
                                fullWidth
                                onClick={handleOpen}>
                            + new chain
                        </Button>
                    </MenuItem>
                </Select>
            </FormControl>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{ overflowY: 'scroll' }}
            >
                <Fade in={open}>
                    <Paper className={classes.modalPaper}>
                        <IconButton style={{ marginLeft: '90%' }} onClick={handleClose}><Close /></IconButton>
                        <h2>Add chain</h2>
                        <div>
                            <h3>RPC endpoint</h3>
                            <TextField variant="outlined" fullWidth value={newChain?.rpc}
                                       onChange={ e => {
                                           const value = e.target.value
                                           setNewChain((chain) => ({...chain, rpc: value}))
                                       }}
                            />
                            <h3>REST endpoint</h3>
                            <TextField variant="outlined" fullWidth value={newChain?.rest}
                                       onChange={ e => {
                                           const value = e.target.value
                                           setNewChain((chain) => ({...chain, rest: value}))
                                       }}
                            />
                            <h3>Chain Name</h3>
                            <TextField variant="outlined" fullWidth value={newChain?.chainName}
                                       onChange={ e => {
                                           const value = e.target.value
                                           setNewChain((chain) => ({...chain, chainName: value}))
                                       }}
                            />
                            <h3>Chain ID</h3>
                            <TextField variant="outlined" fullWidth value={newChain?.chainId}
                                       onChange={ e => {
                                           const value = e.target.value
                                           setNewChain((chain) => ({...chain, chainId: value}))
                                       }}
                            />
                            <h3>Coin Denom</h3>
                            <TextField variant="outlined" fullWidth value={newChain?.coinDenom}
                                       onChange={ e => {
                                           const value = e.target.value
                                           setNewChain((chain) => ({...chain, coinDenom: value}))
                                       }}
                            />
                            <h3>Coin Minimal Denom</h3>
                            <TextField variant="outlined" fullWidth value={newChain?.coinMinimalDenom}
                                       onChange={ e => {
                                           const value = e.target.value
                                           setNewChain((chain) => ({...chain, coinMinimalDenom: value}))
                                       }}
                            />
                            <h3>Select chain preset:</h3>
                            <FormControl variant="outlined" fullWidth style={{ marginBottom: '50px' }}>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={presetChainId}
                                    onChange={handlePresetChanged}
                                    fullWidth
                                >
                                    { chainListProvider().map( (chain: Chain) =>
                                        <MenuItem key={chain.chainName} value={chain.chainId} className={classes.menuItem}>{chain.chainName}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button onClick={handleClose}>
                                    cancel
                                </Button>
                                <Button
                                    onClick={handleAddChain}
                                    variant="contained"
                                    color="primary"
                                    className={classes.addBtn}
                                >
                                    add chain
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Fade>
            </Modal>
        </>
    )
})

export default ChainSelector;
