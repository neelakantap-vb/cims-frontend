import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Switch from '@mui/material/Switch';
import { Box, Tab, Grid, TextField, Button, MenuItem, Menu, FormControl } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
    AddRounded as AddRoundedIcon
} from '@mui/icons-material';
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

})

function CreateForm(){

    const [store,setStore] = useState("")
    const [login,setLogin] = useState(true)

    useEffect(() =>{
        authStore()
    },[])

    const authStore= ()=>{

        let store = localStorage.getItem('authorization')
        if(store && login)
        {setLogin(true)
         setStore(store) 
         console.log(store)  
        }   
    }

    const classes = useStyles()
    const url = "http://localhost:4000/cims"
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);     
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }; 
    const [value, setValue] = useState('primaryContact');
    const initialContacts = [
        {label: 'Primary Contact', title: 'primaryContact'},
        {label: 'Secondary Contact', title: 'secondaryContact'},
        {label: 'Tertiary Contact', title: 'tertiaryContact'}
    ];
    const contactSchema = {
        title:"",
        firstName:"",
        lastName:"",
        email:"",
        contactNumber:"",
        otherContactNumber:"",
    };
    const [contacts, setContacts] = useState(initialContacts);

    //
    const [addOthers, setAddOthers] = useState(true);

    const [formData,setformData] = useState({
        designation:"",
        brandname:"",
        clientname:"",
        domain:"",
        baselocation:"",
        companyaddress:"",
        contacts:{
            primaryContact:{
                title:"",
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                otherContactNumber:"",
            },
            secondaryContact:{
                title:"",
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                otherContactNumber:"",
            },
            tertiaryContact:{
                title:"",
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                otherContactNumber:"",
            },
            otherContact1:{
                title:"",
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                otherContactNumber:"",
            }
        }

    })

    const [n, setN] = useState(Object.keys(formData.contacts).length);
    const setContactFormvalue=(e)=>{
        let new_form = {...formData}
        e.target.id?
        new_form['contacts'][e.target.name][e.target.id] = e.target.value:
        new_form[e.target.name] = e.target.value;
        console.log(Object.keys(new_form.contacts).length);
        if (new_form.contacts[`otherContact${n-3}`].email!=='' && Object.keys(new_form.contacts).length <= n){
            new_form['contacts'] = {...new_form['contacts'], [`otherContact${n-2}`]:{...contactSchema}};
            setN(Object.keys(new_form.contacts).length);
        }
        setformData(new_form);
        console.log(new_form)
    }

    const handleAddOthers = () => {
        let new_form = {...formData}
        new_form['contacts'] = {...new_form['contacts'], [`otherContact${n-2}`]:{...contactSchema}};
        const d = {label: `Other Contact ${n-2}`, title: `otherContact${n-2}`}
        setformData(new_form)
        setContacts([...initialContacts, {...d}]);
        setValue(d.title);
        setN(Object.keys(new_form.contacts).length);
        setAddOthers(true)
    };

    const fields = [
        {id: 'title', label: 'Title'},
        {id: 'firstName', label: 'First name'},
        {id: 'lastName', label: 'Last name'},
        {id: 'email', label: 'Email address'},
        {id: 'contactNumber', label: 'Contact Number'},
        {id: 'otherContactNumber', label: 'Other contact number'}
    ];

    const inputField = fields.map(field => {
        const data = formData.contacts[value];
        return(
            <Grid item xs={4} key={`${value}.${field.id}`}>
                <TextField 
                    variant="outlined"
                    label={field.label}
                    name={value}
                    id={field.id}
                    value={data[field.id]}
                    onChange={setContactFormvalue}
                    fullWidth
                    size="small"
                />
            </Grid>
        );
    });

    const setformvalue=(e)=>{
        let new_form = {...formData}
        new_form[e.target.name] = e.target.value
        setformData(new_form)
        console.log(new_form)
    }

    const handleOthers = (e) => {
        const d = e.currentTarget.dataset;
        setContacts([...initialContacts, {...d}]);
        setValue(d.title);
        handleClose();
    };
    
    const submitForm = async(e) =>{
        e.preventDefault()
        console.log(formData)
        // let token = "Bearer "+ store
        const token = localStorage.getItem('authorization')
        try {
            await axios.post('http://localhost:4000/cims', {formData},  
                                                    {headers: {
                                                        'authorization': `bearer ${token}`
                                                        }}) 
            .then(res=>console.log(res))   
        } catch (error) {
            console.log(error)
        }      
    }

    const tabs = contacts.map(contact =>
        <Tab key={contact.title} label={contact.label} value={contact.title}/>
    );

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

                        <div className="right-float-fields">
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

                        <div className="right-float-fields">
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
                        <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={value}>
                            <Box sx={{ borderTop: 2, borderBottom: 2, borderColor: 'divider' }}>
                                <TabList onChange={(e, newValue) => setValue(newValue)}>
                                    {tabs}

                                    <Grid>
                                    <FormControl size="small">
                                        <Button 
                                            size="small" 
                                            id="othersBtn" 
                                            sx={{color: 'gray', borderColor: 'white'}} 
                                            variant="outlined"
                                            aria-haspopup="true"
                                            aria-controls="others"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <KeyboardArrowDownRoundedIcon sx={{fontSize: "2.5rem"}}/>
                                        </Button>
                                        <Menu
                                            id='others'
                                            sx={{maxHeight: 230, overflow: 'visible'}}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'othersBtn',
                                            }}
                                        >
                                            {[...Array(n-3)].map((e, i) => {
                                                return(
                                                    <MenuItem
                                                        key={i+1}
                                                        data-label={`Other Contact ${i+1}`}
                                                        data-title={`otherContact${i+1}`}
                                                        onClick={handleOthers}
                                                    >
                                                    {`Other Contact ${i+1}`}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Menu>
                                    </FormControl>
                                    </Grid>            
                                    <Grid container>
                                        <Button
                                            id="addOthersBtn" 
                                            sx={{color: 'gray', borderColor: 'white'}} 
                                            variant={addOthers?"contained":"outlined"}
                                            onClick={handleAddOthers}
                                            disabled={addOthers}
                                        >
                                            <AddRoundedIcon sx={{fontSize: "2rem"}} />
                                        </Button>
                                    </Grid>
                                </TabList>
                            </Box>
                            <TabPanel value={value}>
                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {inputField}
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box> 
                    </div>
                
                </div>

            </div>
        </>
    )
}

export default CreateForm
