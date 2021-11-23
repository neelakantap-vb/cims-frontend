import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
// import axios from 'axios'
import '../styles/FormStyles.css'


import { useSelector } from "react-redux";


function EditButton() {


  return (
    <div>
      <Button variant="fab" color="purple" endIcon={<EditIcon />}>
        Edit
      </Button>
    </div>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(id, company_uid, company_name, primary_contact, action ) {
//   return { id, company_uid, company_name, primary_contact, action };
// }

function CIMSTable() {

    const client = useSelector(state => state.form);
  
//   useEffect(async()=>{
//     await axios.post('http://localhost:4000/login')
//     .then(data=>data)
//     .then(tokenObject=>{
//       console.log(tokenObject.data.Token)
//       localStorage.setItem('authorization',tokenObject.data.Token)
//     })

//     const token = localStorage.getItem('authorization')
//     await axios.get('http://localhost:4000/cims', {headers: {
//                                                       'authorization': `bearer ${token}`
//                                                       }})
//     .then(data=>data)
//     .then(list=>{
//       setclientsList(list.data)
//       console.log(list.data)
//     })
//   },[])

  
  return (

    <div className="FormContainer"> {/*//using form container's alignment*/}
        <TableContainer component={Paper} align="right" >
        <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">CompanyUID</StyledTableCell>
                <StyledTableCell align="left">Company Name</StyledTableCell>
                <StyledTableCell align="left">Primary Contact</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {/* {clientsList.map((client,idx) => ( */}
                <StyledTableRow key={client.id}>
                <StyledTableCell component="th" scope="client">
                    {/* {idx+1} */}
                </StyledTableCell>
                <StyledTableCell align="left">{client._id}</StyledTableCell>
                <StyledTableCell align="left">{client.brandname}</StyledTableCell>
                <StyledTableCell align="left">{client.contacts.primaryContact.title}</StyledTableCell>
                <StyledTableCell align="left">{EditButton()}</StyledTableCell>
                </StyledTableRow>
            {/* ))} */}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

export default CIMSTable;