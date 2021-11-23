import { createStore } from "redux";

const initialState = {
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
        }
    }
};

const cimsState = {
    form :JSON.parse(JSON.stringify(initialState)),
    errors: JSON.parse(JSON.stringify(initialState))
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

const store = createStore(formReducer);

export default store;