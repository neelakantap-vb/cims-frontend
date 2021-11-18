import {useState} from "react";

const initialFormValues = {
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
}

const contactSchema = {
    title:"",
    firstName:"",
    lastName:"",
    email:"",
    contactNumber:"",
    otherContactNumber:"",
};

const initialContacts = [
    {label: 'Primary Contact', title: 'primaryContact'},
    {label: 'Secondary Contact', title: 'secondaryContact'},
    {label: 'Tertiary Contact', title: 'tertiaryContact'}
];

const fields = [
    {id: 'title', label: 'Title'},
    {id: 'firstName', label: 'First name'},
    {id: 'lastName', label: 'Last name'},
    {id: 'email', label: 'Email address'},
    {id: 'contactNumber', label: 'Contact Number'},
    {id: 'otherContactNumber', label: 'Other contact number'}
];

export default function UseForm() {

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

    const [contacts, setContacts] = useState(initialContacts);
    const [formData,setformData] = useState(initialFormValues);

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
        setformData(new_form);
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

    return {
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
    }
}