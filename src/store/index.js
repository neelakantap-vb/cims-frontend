import { createStore } from "redux";

const initialState = {
    designation:"",
    brandname:"",
    clientname:"",
    domain:"",
    baselocation:"",
    addressLine1:"",
    addressLine2:"",
    pincode:"",
    country:"",
    state:"",
    district:"",
    city:"",
    landmark:"",
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
        }
    }
};

const cimsState = {
    form: {...JSON.parse(JSON.stringify(initialState)), country:"India-in"},
    errors: JSON.parse(JSON.stringify(initialState)),
    countries: {},
    ccode: 'in',
    loc: {
        state: "",
        districts: {
            "":[""]
        }
    }
}

const formReducer = (state = cimsState, action) => {
    if (action.type === 'createForm'){
        return {...state,
            form: action.payload
        };
    }
    else if(action.type === 'setErrors'){
        return {...state,
            errors: action.payload
        };
    }
    else if(action.type === 'setLoc'){
        const data = action.payload;
        const stateName = data['state'];
        const districtName = Object.keys(data['districts'])[0];
        const cityName = data['districts'][districtName][0];
        return {...state,
            loc: data,
            form: {...state.form, state: stateName, district: districtName, city:cityName}
        };
    }
    else if(action.type === 'setCcode'){
        return {...state,
            ccode: action.payload
        };
    }
    else if(action.type === 'resetForm'){
        return {
            ...state,
            form :{...JSON.parse(JSON.stringify(initialState)), country:"India-in"},
            errors: JSON.parse(JSON.stringify(initialState)),
            ccode: 'in',
            loc: {
                state: "",
                districts: {
                    "":[""]
                }
            }
        };
    }
    else if(action.type === 'setCountries'){
        return {
            ...state,
            countries: action.payload
        };
    }
    return state;
}

export const createForm = (data) => ({
    type: 'createForm',
    payload: data
});

export const setErrors = (data) => ({
    type: 'setErrors',
    payload: data
});

export const setLoc = (data) => ({
    type: 'setLoc',
    payload: data
});

export const setCcode = (data) => ({
    type: 'setCcode',
    payload: data
});

export const setCountries = (data) => ({
    type: 'setCountries',
    payload: data
});

export const resetForm = () => ({
    type: 'resetForm'
});

const store = createStore(formReducer);

export default store;