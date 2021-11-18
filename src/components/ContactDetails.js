import React from "react";
import { Box, Tab, Grid, TextField, Button, MenuItem, Menu, FormControl } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
         AddRounded as AddRoundedIcon
} from '@mui/icons-material';
import UseForm from "./UseForm";

export default function ContactDetails() {
    
    const {
        fields,
        formData,
        value,
        setformvalue,
        contacts,
        setValue,
        open,
        handleClick,
        anchorEl,
        handleClose,
        n,
        handleOthers,
        addOthers,
        handleAddOthers
    } = UseForm();

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
                    autoomplete="none"
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