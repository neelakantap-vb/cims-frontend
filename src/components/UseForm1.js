import {useState} from "react";
// import axios from 'axios'
import { useSelector,useDispatch } from "react-redux";
import { createForm, setErrors } from "../store";

const contactSchema = {
    title:"",
    firstName:"",
    lastName:"",
    email:"",
    contactNumber:"",
    otherContactNumber:"",
};

const initialContacts = [
    {label: 'Primary Contact *', title: 'primaryContact'},
    {label: 'Secondary Contact *', title: 'secondaryContact'},
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
    console.log(useSelector(state => state));
    const formData = useSelector(state => state.form);
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();
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
    const [n, setN] = useState(Object.keys(formData.contacts).length);
    const [addOthers, setAddOthers] = useState(false);

    // Handel errors
    const validate = (type='', fieldValues) => {
        let temp = { ...errors }
        if ("title" in fieldValues)
            temp['contacts'][type].title = fieldValues.title ? "" : "This field is required."
        if ("firstName" in fieldValues)
            temp['contacts'][type].firstName = fieldValues.firstName ? "" : "This field is required."
        if ("lastName" in fieldValues)
            temp['contacts'][type].lastName = fieldValues.lastName ? "" : "This field is required."
        if ("email" in fieldValues) {
            temp['contacts'][type].email = fieldValues.email ? "" : "This field is required."
            if (fieldValues.email)
                temp['contacts'][type].email = (/^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/).test(fieldValues.email)
                ? ""
                : "Email is not valid."
        }
        if ("contactNumber" in fieldValues){
            temp['contacts'][type].contactNumber = fieldValues.contactNumber ? "" : "This field is required."
            if (fieldValues.contactNumber)
                temp['contacts'][type].contactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.contactNumber)
                ? ""
                : "Contact number is not valid."
        }
        if ("otherContactNumber" in fieldValues){
            if (fieldValues.otherContactNumber)
                temp['contacts'][type].otherContactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.otherContactNumber)
                ? ""
                : "Other contact number is not valid."
            else
                temp['contacts'][type].otherContactNumber = ''
        }
        dispatch(setErrors({...temp}));
    }

    const validateOptional = (type='', fieldValues) => {
        let temp = { ...errors }
        if (fieldValues.title || fieldValues.firstName || fieldValues.lastName ||
            fieldValues.email || fieldValues.contactNumber || fieldValues.otherContactNumber){
                temp['contacts'][type].title = fieldValues.title ? "" : "This field is required."
                temp['contacts'][type].firstName = fieldValues.firstName ? "" : "This field is required."
                temp['contacts'][type].lastName = fieldValues.lastName ? "" : "This field is required."
                temp['contacts'][type].email = fieldValues.email ? "" : "This field is required."
                if (fieldValues.email)
                    temp['contacts'][type].email = (/^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/).test(fieldValues.email)
                    ? ""
                    : "Email is not valid."
                temp['contacts'][type].contactNumber = fieldValues.contactNumber ? "" : "This field is required."
                if (fieldValues.contactNumber)
                    temp['contacts'][type].contactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.contactNumber)
                    ? ""
                    : "Contact number is not valid."
                if (fieldValues.otherContactNumber)
                    temp['contacts'][type].otherContactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.otherContactNumber)
                    ? ""
                    : "Other contact number is not valid."
                else
                    temp['contacts'][type].otherContactNumber = ''
        }
        else{
            temp['contacts'][type].title = ""
            temp['contacts'][type].firstName = ""
            temp['contacts'][type].lastName = ""
            temp['contacts'][type].email = ""
            temp['contacts'][type].contactNumber = ''
            temp['contacts'][type].otherContactNumber = ''
        }
        dispatch(setErrors({...temp}));
        return Object.values(temp['contacts'][type]).every((x) => x === "") &&
            formData['contacts'][type].email !== ""
    }

    const validateBasic = (fieldValues) => {
        let temp = { ...errors }
        if ("designation" in fieldValues)
            temp.designation = fieldValues.designation ? "" : "This field is required."
        if ("brandname" in fieldValues)
            temp.brandname = fieldValues.brandname ? "" : "This field is required."
        if ("clientname" in fieldValues)
            temp.clientname = fieldValues.clientname ? "" : "This field is required."
        if ("domain" in fieldValues)
            temp.domain = fieldValues.domain ? "" : "This field is required."
        if ("baselocation" in fieldValues)
            temp.baselocation = fieldValues.baselocation ? "" : "This field is required."
        if ("companyaddress" in fieldValues)
            temp.companyaddress = fieldValues.companyaddress ? "" : "This field is required."
        setTimeout(() => {
            dispatch(setErrors({...temp}));
        }, 100)
    }

    // End handel errors
    
    const setformvalue=(e)=>{
        let new_form = {...formData}
        e.target.id?
        new_form['contacts'][e.target.name][e.target.id] = e.target.value:
        new_form[e.target.name] = e.target.value;
        if (e.target.name === 'primaryContact' || e.target.name === 'secondaryContact')
            validate(e.target.name, { [e.target.id]: e.target.value });
        if (e.target.id && e.target.name !== 'primaryContact' && e.target.name !== 'secondaryContact')
            validateOptional(e.target.name, new_form['contacts'][e.target.name])
        if (!e.target.id)
            validateBasic({ [e.target.name]: e.target.value })

        if (validateOptional('tertiaryContact', new_form['contacts']['tertiaryContact'])){
            if(n===3 ? true : (validateOptional(`otherContact${n-3}`, new_form.contacts[`otherContact${n-3}`]) &&
                Object.keys(new_form.contacts).length <= n)){
                    setAddOthers(true)
            }
            else{
                setAddOthers(false)
            }
        }
        else{
            setAddOthers(false)
        }
        dispatch(createForm(new_form));
    }

    const handleAddOthers = () => {
        let new_form = {...formData}
        new_form['contacts'] = {...new_form['contacts'], [`otherContact${n-2}`]:{...contactSchema}};
        let new_errors = {...errors}
        new_errors['contacts'] = {...new_errors['contacts'], [`otherContact${n-2}`]:{...contactSchema}};
        const d = {label: `Other Contact ${n-2}`, title: `otherContact${n-2}`}
        dispatch(createForm(new_form));
        setContacts([...initialContacts, {...d}]);
        dispatch(setErrors(new_errors));
        setValue(d.title);
        setN(Object.keys(new_form.contacts).length);
        setAddOthers(false)
    };

    // Sam
    const [store,setStore] = useState("")
    const [login,setLogin] = useState(true)

    const authStore= ()=>{

        let store = localStorage.getItem('authorization')
        if(store && login)
        {setLogin(true)
         setStore(store) 
         console.log(store)  
        }   
    }

    const submitForm = async() =>{
        console.log(formData)
        // let token = "Bearer "+ store
        // const token = localStorage.getItem('authorization')
        // try {
        //     await axios.post('http://localhost:4000/cims', {formData},  
        //                                             {headers: {
        //                                                 'authorization': `bearer ${token}`
        //                                                 }}) 
        //     .then(res=>console.log(res))   
        // } catch (error) {
        //     console.log(error)
        // }      
    }

    //end Sam

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
        handleAddOthers,
        errors,

        authStore,
        submitForm
    }
}