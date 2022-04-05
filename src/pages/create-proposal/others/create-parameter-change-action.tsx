import React, {useEffect} from "react";
import {FormControl, FormGroup, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {useStyles} from "../create-proposal-styles";
import {ParameterChangeActionData} from "../../../shared-state/create-proposal-store";

export const CreateParameterChangeAction: React.FC<{id: symbol}> = ({id}) => {
    const classes = useStyles()
    const {updateAction, newProposal, parameters} = useStores().createProposalStore

    const initialData = newProposal.actions.find( a => a.id === id).data as ParameterChangeActionData
    const [module, setModule] = React.useState(initialData.module)
    const [parameter, setParameter] = React.useState(initialData.parameter)
    const [value, setValue] = React.useState(initialData.value)

    useEffect(() => {
        updateAction(id, {
            module,
            parameter,
            value
        } as ParameterChangeActionData)
    }, [module, parameter, value])


    const handleModuleChange = (event) => {
        setModule(event.target.value)
    }

    const handleParameterChange = (event) => {
        setParameter(event.target.value)
    }

    const handleValueChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <Paper elevation={0} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
            <div className={classes.paperHead}>
                <h2>Parameter Change</h2>
            </div>
            <div className={classes.paperBody}>
              <div className="marginB">
                  <p className={classes.paperTitle}>Module</p>
                  <FormControl variant="outlined" fullWidth>
                      <Select
                          fullWidth
                          placeholder="Select module"
                          value={module}
                          onChange={handleModuleChange}
                      >
                          { Object.keys(parameters).map( param => (
                              <MenuItem key={param} value={param}>{param}</MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </div>
              <div className="marginB">
                  <p className={classes.paperTitle}>Parameter</p>
                  <FormControl variant="outlined" fullWidth>
                      <Select
                          fullWidth
                          placeholder="Select parameter"
                          value={parameter}
                          onChange={handleParameterChange}
                      >
                          { parameters[module]?.map( param => (
                              <MenuItem key={param} value={param}>{param}</MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </div>

              <div className="marginB">
                  <p className={classes.paperTitle}>Value</p>
                  <FormGroup row >
                      <TextField variant="outlined" style={{width: '100%'}}
                                 value={value} onChange={handleValueChange}/>
                  </FormGroup>
              </div>
            </div>
        </Paper>
    )
}
