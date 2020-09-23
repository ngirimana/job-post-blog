const { Router } = require('express');
const express = require('express');
const db=require('../config/database');
const Gig=require('../models/Gig');
const { Sequelize } = require('sequelize');
const Op=Sequelize.Op;


const router=express.Router();

//add gigs
router.get('/',(req,res)=>
    Gig.findAll()
    .then(gigs=>{
       
        res.render('gigs',{
            gigs
        })
    })
    .catch(err=>{console.log(err)}));
    //display add gig form
    router.get('/add',(req,res)=>res.render('add'));
//add gigs
router.post('/add',(req,res)=>{
    let {title,technologies,budget,description,contact_email}=req.body;
    let errors=[];
    if(!title){
        errors.push({text:'Please add a title'});
    }
    if(!technologies){
        errors.push({text:'Please add some technologies'});
    }
    if(!description){
        errors.push({text:'Please add a description'});
    }
    if(!contact_email){
        errors.push({text:'Please add a contact_email'});
    }
    if(!budget){
        budget='Unknown'
    }
    else{
        budget=`$${budget}`;
    }
    //make lowercase
    technologies = technologies.toLowerCase().replace(/,/g,',');
    //check errors
    if(errors.length){
        res.render('add',{
            errors,
            title,technologies,description,budget,contact_email
        })
    }
    else{
        Gig.create({
            title,technologies,description,budget,contact_email
        })
        .then(gig=>res.redirect('/gigs'))
        .catch(err=>console.log(err));
    
    }
   
});
//search  for gigs
router.get('/search',(req,res)=>{
    let {term} = req.query;
    term=term.toLowerCase();
    Gig.findAll({where:{technologies:{[Op.like]:'%'+ term + '%'}}})
    .then(gigs=>res.render('gigs',{gigs}))
    .catch()

})

module.exports=router;