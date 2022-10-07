import React from 'react'
import { Paper, Zoom, Container, Box, Grid, Typography, Button, TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const EditCustomer = () => {


     const [customerDetail,setCustomerDetail] = useState({
        firstname: "",
        lastname: "",
        email:"",
    });


    const navigate = useNavigate();
    const location = useLocation();

    const userId = location.pathname.split("/",[3]);
    console.log(userId);
  

    const handleChange=(e)=>{

        setCustomerDetail((prev)=> ({...prev, [e.target.name] : e.target.value}));
    }

    
    const url = "http://localhost:8800/users/"+userId[2];

    console.log("ws",url)

    const onsubmit= async e=>{

        if(customerDetail.firstname.trim() === "" ){
            alert("enter first name")
             return false;
           }
 
           if(customerDetail.lastname.trim() === "" ){
             alert("enter last name")
              return false;
            }
 
            if(customerDetail.email.trim() === "" ){
             alert("enter email")
              return false;
            }

        e.preventDefault()
        try{
            await axios.put(url, customerDetail)
            navigate("/")

        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const res = await axios.get(url);
                setCustomerDetail(res.data[0])
                console.log(res.data)
                console.log("d",customerDetail);

            }catch(err){
                console.log(err)
            }
        }


        fetchUser();
    },[])



    

    return (
        <>
            <Container>
                <Box sx={{ my: 2 }}>

                    <Paper elevation={3} style={{ marginTop: "30px", }}>





                        <Grid xs={12} lg={12}>

                            <Typography style={{ paddingLeft: "12px",paddingTop:"12px" }}>
                                Update Customer Detail
                            </Typography>

                            <hr/>



                            <Grid xs={12} lg={12} style={{ padding: "12px" }}>
                                <Grid item xs={6} lg={6}>
                                    <Typography className="font14 greyfirstheading" gutterBottom variant="subtitle1">
                                        First Name *
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <TextField className="w-100"
                                            type="text"
                                            name="firstname"
                                            variant="outlined"
                                            placeholder="Enter First Name"
                                          value={customerDetail.firstname}
                                          onChange= {handleChange}

                                        />
                                    </Typography>
                                </Grid>

                            </Grid>

                            <Grid container xs={12} style={{ padding: "12px" }}>

                                <Grid item xs={6} lg={6}>
                                    <Typography className="font14 greyfirstheading" gutterBottom variant="subtitle1">
                                        Last Name *
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <TextField className="w-100"
                                            type="text"
                                            name="lastname"
                                            variant="outlined"
                                            placeholder="Enter Last Name"
                                        value={customerDetail.lastname}
                                        onChange= {handleChange}

                                        />
                                    </Typography>
                                </Grid>

                            </Grid>

                            <Grid container xs={12} style={{ padding: "12px" }}>

                                <Grid item xs={6} lg={6}>
                                    <Typography className="font14 greyfirstheading" gutterBottom variant="subtitle1">
                                        Email *
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <TextField className="w-100"
                                            type="text"
                                            name="email"
                                            variant="outlined"
                                            placeholder="Enter Email"
                                        value={customerDetail.email}
                                        onChange= {handleChange}

                                        />
                                    </Typography>
                                </Grid>

                            </Grid>

                            <Grid xs={12} lg={12} style={{padding:"12px"}}>
                                <Button
                                variant='contained'
                                onClick={onsubmit}>
                                    UPDATE
                                </Button>
                            </Grid>
                        </Grid>


                    </Paper>
                </Box>
            </Container>
        </>
    )
}


export default EditCustomer;