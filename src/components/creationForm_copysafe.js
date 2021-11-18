import React, { useState } from 'react'
import { TextField, Typography } from '@mui/material'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import ContactDetails from './ContactDetails';
import '../styles/FormStyle.css'

const useStyles = makeStyles({  
    field1:{
        width:'98%',
        margin:'1%'
    },
    field2:{
        margin:'1%',
    },   
    field3:{
        width:'78%',
        margin:'1%'
    },
    lables:{
        marginLeft:'1%',
        marginTop:'1%'
    }
})

function CreateForm(){

    const classes = useStyles()
    const url = "http://localhost:4000/cims"
    const [formData,setformData] = useState({
        designation:"",
        brandname:"",
        clientname:"",
        domain:"",
        baselocation:"",
        companyaddress:"",
        primarycontact:{
            title:"",
            firstname:"",
            lastname:"",
            email:"",
            contact_number:"",
            othercontact_number:"",
        },
        secondarycontact:{
            title:"",
            firstname:"",
            lastname:"",
            email:"",
            contact_number:"",
            othercontact_number:"",
        },
        tertiarycontact:{
            title:"",
            firstname:"",
            lastname:"",
            email:"",
            contact_number:"",
            othercontact_number:"",

        },
        othercontacts:[]
    })

    const setformvalue=(e)=>{
        let new_form = {...formData}
        new_form[e.target.name] = e.target.value
        setformData(new_form)
        console.log(new_form)
    }

    const submitForm = async() =>{
        try {
            await axios.post(url , {formData}) 
            .then(res=>console.log(res))   
        } catch (error) {
            console.log(error)
        }
           
    }

    return(
        <>
            <div className="FormContainer">
              
                <div className="form-header">
                    <h2>
                        Client Information
                    </h2>
                    
                    <div className="header-end">
                        <div>
                            <p>Edit mode</p>
                            <Switch defaultChecked color="success" />
                        </div>
                    </div>
                </div>

                <div className="form-body">    
                    <form>
                        <Typography className={classes.lables}>
                            Legal Name of the entity
                        </Typography>
                        <TextField
                            className={classes.field1}
                            label="enter designation"
                            variant="outlined"
                            name="designation"
                            fullWidth
                            required
                            size="small"
                            onChange={(e)=>{setformvalue(e)}}
                            
                        />
                        <div className="align-form-fields">
                            <Typography>
                                Brand Name
                            </Typography>
                            <TextField
                                className={classes.field2}
                                label="enter name"
                                variant="outlined"
                                name="brandname"
                                fullWidth
                                required
                                size="small"
                                onChange={(e)=>{setformvalue(e)}}
                            />
                        </div>

                        <div className="align-form-fields">
                            <Typography>
                                Domain/Sector
                            </Typography>
                            <TextField
                                className={classes.field2}
                                label="enter domain/sector"
                                variant="outlined"
                                name="domain"
                                fullWidth
                                required
                                size="small"
                                onChange={(e)=>{setformvalue(e)}}
                            />
                        </div>

                        <div className="align-form-fields">
                            <Typography>
                                Base Location
                            </Typography>
                            <TextField
                                className={classes.field2}
                                label="enter location"
                                variant="outlined"
                                name="baselocation"
                                fullWidth
                                required
                                size="small"
                                onChange={(e)=>{setformvalue(e)}}
                            />
                        </div>

                        <div className="align-form-fields">
                            <Typography>
                                Active Client
                            </Typography>
                            <Box sx={{ minWidth: 120 }} className={classes.field2}>
                            <FormControl fullWidth>
                                <InputLabel id="label">Select a Client name</InputLabel>
                                <Select
                                name="clientname"
                                onChange={(e)=>{setformvalue(e)}}
                                size="small"
                                input={<OutlinedInput label="Select a Client name" />}
                                >
                                
                                <MenuItem value={"client 1"}>client 1</MenuItem>
                                <MenuItem value={"client 2"}>client 2</MenuItem>
                                <MenuItem value={"client 3"}>client 3</MenuItem>
                                </Select>
                            </FormControl>
                            </Box>
                        </div>

                        <Typography className={classes.lables}>
                            Complete address of the company
                        </Typography>
                        <TextField
                            className={classes.field3}
                            label="Enter location"
                            variant="outlined"
                            name="companyaddress"
                            fullWidth
                            required
                            size="small"
                            onChange={(e)=>{setformvalue(e)}}
                        />
                        <Button
                        onClick={submitForm}
                        type="submit"
                        variant="contained"
                        color="success"
                        id="save-btn"
                        className={classes.button}
                        >
                        save
                        </Button>
                        
                    </form>
                
                    <div className="contact-form">
                        <ContactDetails/>   
                    </div>
                
                </div>

            </div>
        </>
    )
}

export default CreateForm
