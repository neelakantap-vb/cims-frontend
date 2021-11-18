import React, { useState } from "react";
import { Box, Tab, Grid, TextField, Button, MenuItem, Menu, FormControl } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
         AddRounded as AddRoundedIcon
} from '@mui/icons-material';

export default function ContactDetails() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }; 
    
    const handleOthers = (e) => {
        const d = e.currentTarget.dataset;
        setContacts([...initialContacts, {...d}]);
        setValue(d.title);
        handleClose();
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
    });

    const [n, setN] = useState(Object.keys(formData.contacts).length);
    const [addOthers, setAddOthers] = useState(true);
    
    const setformvalue=(e)=>{
        let new_form = {...formData}
        e.target.id?
        new_form['contacts'][e.target.name][e.target.id] = e.target.value:
        new_form[e.target.name] = e.target.value;
        if (new_form.contacts[`otherContact${n-3}`].email!=='' && Object.keys(new_form.contacts).length <= n){
            setAddOthers(false)
        }
        else{
            setAddOthers(true)
        }
        setformData(new_form)
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
            <Grid item xs={12} sm={6} md={4} key={`${value}.${field.id}`}>
                <TextField 
                    variant="outlined"
                    label={field.label}
                    name={value}
                    id={field.id}
                    value={data[field.id]}
                    onChange={setformvalue}
                    fullWidth
                    size="small"
                    autocomplete="none"
                />
            </Grid>
        );
    });

    const tabs = contacts.map(contact =>
        <Tab key={contact.title} label={contact.label} value={contact.title} sx={{textTransform: 'none'}}/>
    );

    return(
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{ borderTop: 2, borderBottom: 2, borderColor: 'divider' }}>
                    <TabList variant='scrollable' onChange={(e, newValue) => setValue(newValue)}>
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
    );
}