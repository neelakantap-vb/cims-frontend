import {useState, useEffect} from "react";
import axios from 'axios'
import { useSelector,useDispatch } from "react-redux";
import { createForm, setErrors, setCcode, setCountries, setLoc, resetForm } from "../store";
import { useNavigate } from "react-router-dom";

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
    {id: 'title', label: 'Title *'},
    {id: 'firstName', label: 'First name *'},
    {id: 'lastName', label: 'Last name *'},
    {id: 'email', label: 'Email address *'},
    {id: 'contactNumber', label: 'Contact Number *'},
    {id: 'otherContactNumber', label: 'Other contact number'}
];

const addressFields = [
    {name: 'addressLine1', label: 'Address Line 1 *'},
    {name: 'addressLine2', label: 'Address Line 2'},
    {name: 'country', label: 'Country *'},
    {name: 'pincode', label: 'Postal/Pin Code *'},
    {name: 'state', label: 'State *'},
    {name: 'district', label: 'District *'},
    {name: 'city', label: 'City *'},
    {name: 'landmark', label: 'Landmark'}
];

export default function UseForm() {
    const navigate = useNavigate();
    const formData = useSelector(state => state.form);
    const errors = useSelector(state => state.errors);
    const ccode = useSelector(state => state.ccode);
    const loc = useSelector(state => state.loc);

    const dispatch = useDispatch();

    async function fetchData() {
        const response = await fetch('http://localhost:4000/countries');
        const data = await response.json();
        dispatch(setCountries(data))
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                // temp['contacts'][type].title = fieldValues.title ? "" : "This field is required."
                // temp['contacts'][type].firstName = fieldValues.firstName ? "" : "This field is required."
                // temp['contacts'][type].lastName = fieldValues.lastName ? "" : "This field is required."
                // temp['contacts'][type].email = fieldValues.email ? "" : "This field is required."
                if (fieldValues.email)
                    temp['contacts'][type].email = (/^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/).test(fieldValues.email)
                    ? ""
                    : "Email is not valid."
                else
                    temp['contacts'][type].email = ''
                // temp['contacts'][type].contactNumber = fieldValues.contactNumber ? "" : "This field is required."
                if (fieldValues.contactNumber)
                    temp['contacts'][type].contactNumber = (/^[6-9][0-9]{9}$/).test(fieldValues.contactNumber)
                    ? ""
                    : "Contact number is not valid."
                else
                    temp['contacts'][type].contactNumber = ''
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
            fields.map((field) => field.id === 'otherContactNumber' ? true :
            formData['contacts'][type][field.id] !=='').every((x) => x)
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
        if ("addressLine1" in fieldValues)
            temp.addressLine1 = fieldValues.addressLine1 ? "" : "This field is required."
        if ("pincode" in fieldValues){
            temp.pincode = fieldValues.pincode ? "" : "This field is required."
            if (fieldValues.pincode){
                temp.pincode = (/^.{2,}$/).test(fieldValues.pincode)
                ? ""
                : "Pincode should have minimum 2 characters."
                if (errors.state)
                    temp.state = temp.pincode ? "This field is required." : ""
                if (errors.district)
                    temp.district = temp.pincode ? "This field is required." : ""
                if (errors.city)
                    temp.city = temp.pincode ? "This field is required." : ""
            }
        }
        if ("country" in fieldValues){
            temp.country = fieldValues.country || formData.country ? "" : "This field is required."
        }
        if ("state" in fieldValues)
            temp.state = fieldValues.state ? "" : "This field is required."
        if ("district" in fieldValues)
            temp.district = fieldValues.district || formData.district ? "" : "This field is required."
        if ("city" in fieldValues)
            temp.city = fieldValues.city || formData.city ? "" : "This field is required."
        setTimeout(() => {
            dispatch(setErrors({...temp}));
        }, 100)
    }

    const handelInvalidPincode = () => {
        let new_form = {...formData}
        new_form['city'] = '';
        new_form['district'] = '';
        new_form['state'] = '';
        new_form['pincode'] = '';
        dispatch(createForm(new_form));
    }

    // End handel errors
    
    const getAddressByPincode = async(pincode) => {
        console.log("In getAddressByPincode")
        try {
            await axios.get('http://localhost:4000/location',
                {headers: {
                    'pincode': pincode,
                    'country' : ccode
                }}
            ).then(res=>{
                if(res.data.status)
                    dispatch(setLoc(res.data))
                else if(!res.data.status && formData.city ===''){
                    window.alert("Invalid Pincode!")
                    handelInvalidPincode()
                }
            })
            
        } catch (error){
            console.log(error)
        }
        console.log("End getAddressByPincode")
    }

    const setformvalue=(e)=>{
        let new_form = {...formData}
        e.target.id?
        new_form['contacts'][e.target.name][e.target.id] = e.target.value:
        new_form[e.target.name] = e.target.value;
        if (e.target.name === 'pincode'){
            new_form['city'] = '';
            new_form['district'] = '';
            new_form['state'] = '';
        }
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

    const handelAddressOnBlur = (e) => {
        setformvalue(e);
        const data = e.target.value;
        if (data.length > 1 && formData.pincode !== '' && errors.pincode === ''){
            getAddressByPincode(data);
        }
    }

    const handelCountry = (e) => {
        let new_form = {...formData}
        const data = e.target.value;
        const name = e.target.name;
        if (name === 'country'){
            dispatch(setCcode(data.split('-')[1]));
            new_form['city'] = '';
            new_form['district'] = '';
            new_form['state'] = '';
            new_form['pincode'] = '';
        }
        new_form[name] = data;
        if (name === 'district' && data !== ''){
            new_form['state'] = loc.state;
            new_form['city'] = loc['districts'][data][0];
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
        }   
    }

    const validateOnSubmit = () => {
        const temp = {...errors}
        const data = {...formData}
        return(
        Object.keys(temp).map((key)=> {
            if (key==='contacts'){
                return Object.keys(temp['contacts']).map((cKey) => {
                    return Object.values(temp['contacts'][cKey]).every((x) => x==='')
                }).every((x) => x)
            }
            else{
                return temp[key] === ''
            }
        }).every((x) => x) &&
        Object.keys(data).map((key)=> {
            if (key==='contacts'){
                return ['primaryContact', 'secondaryContact'].map((cKey) => {
                    return fields.map((field) => field.id === 'otherContactNumber' ? true :
                        data['contacts'][cKey][field.id] !=='').every((x) => x)
                }).every((x) => x)
            }
            if (key ==='addressLine2' || key === 'landmark'){
                return true
            }
            return data[key] !== ''
        }).every((x) => x) &&
        Object.keys(data['contacts']).map((key) => {
            if (key === 'primaryContact' || key === 'secondaryContact')
                return true
            return fields.map((field) => field.id === 'otherContactNumber' ? true :
                data['contacts'][key][field.id] !=='').every((x) => x) || 
                fields.map((field) => data['contacts'][key][field.id] !=='').every((x) => x===false)
        }).every((x) => x))
    }

    // not active
    const submitForm = async(e) =>{
        e.preventDefault();
        if(validateOnSubmit()){
            // let token = "Bearer "+ store
            const token = localStorage.getItem('authorization')
            try {
                await axios.post('http://localhost:4000/cims', {formData},  
                                                        {headers: {
                                                            'authorization': `bearer ${token}`
                                                            }}) 
                .then(res=>{
                    if(res.status === 200){
                        dispatch(resetForm())
                        window.alert('Data added successfully!')
                        navigate("/")
                    }
                    else
                        window.alert('Error occured while adding the data!\nPlease contact the maintenance team.')
                })   
            } catch (error) {
                console.log(error)
            }
        }
        else
            window.alert('Some data missing!')
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
        submitForm,
        addressFields,
        handelCountry,
        handelAddressOnBlur,
        validateOnSubmit
    }
}