const pool = require('../config/db.js');
const queries = require('./queries');
const express = require('express');
const getdata=(req,res)=> {
    pool.query(queries.getdata,(error, results) => {
            if (error) {
                // Handle the error here
                console.error('Error:', error.message);
                res.status(404).json({ error: 'cannot get data' });
                return; // Return to prevent further execution
            }
            res.status(200).json(results.rows);
        });
        
};   
    

const getDataById=(req,res)=>{
    const id=req.params.id;
   // pool.query(queries.checkIdExists,[id],(error,results)=>{
        //const noDataFound = !results.rows.length;
        //if(noDataFound){
          //  return res.status(200).json({a:"id does not  exist"});
    //}       
    pool.query(queries.getDataById,[id],(error, results) => {
        const noDataFound = !results.rows.length;
            if(noDataFound){
                return res.status(200).json({message:"id does not  exist"});
            }
            if (error) {
            // Handle the error here
            console.error('Error:', error.message);
            res.status(404).json({ error: "cannot get data"});
            return; // Return to prevent further execution
            }
            res.status(200).json(results.rows[0]);
    });
}

const addData=(req,res)=>{
    const data=req.body;
    // check if id exist
    //pool.query(queries.checkIdExists,[data.id],(error,results)=>{
      //  if(results.rows.length){
        //    res.status(200).send("id Entered already exist");
        //}
    pool.query(queries.addData,[data.id,data.dataset_id,data.type,data.name,data.validation_config,data.extraction_config,data.dedup_config,data.data_schema, data.denorm_config, data.router_config, data.dataset_config, data.tags, data.data_version, data.status,data.created_by, data.updated_by,data.created_date,data.updated_date,data.published_date],(error,results)=>{
        if (error) {
            // Handle the error here
            console.error('Error:', error.message);
            res.status(404).json({ error: 'cannot get data' });
            return; // Return to prevent further execution
        }
        res.status(201).json(data);
    });
        
    };
    


const removeData = (req,res)=>{
    const id=req.params.id;
    pool.query(queries.removeData,[id],(error,results)=>{
        if(error){
          res.status(404).json({message:"id you have entered does not exist in the database",data_id:id});
          return;
        }
     res.status(200).json({message:"data removed sucessfully",data_id:id});
    })
    };

const updateData = (req,res)=>{
   const id=req.params.id;
    //pool.query(queries.checkIdExists,[id],(error,results)=>{
       // const noDataFound =!results.rows.length;
        //if(noDataFound){
        //res.status(200).send("data does not exist in the database");
        //}
    
        const update_data=req.body;
    pool.query(queries.updateData,[ update_data.dataset_id,update_data.type,update_data.name,update_data.validation_config,update_data.extraction_config,update_data.dedup_config,update_data.data_schema,update_data.denorm_config,update_data.router_config,update_data.dataset_config,update_data.tags,update_data.data_version,update_data.status,update_data.created_by,update_data.updated_by,update_data.created_date,update_data.updated_date,update_data.published_date,id],(error,results)=>{
        if (error) {
            // Handle the error here
            console.error('Error:', error.message);
            res.status(404).json({ error: 'cannot update data' });
            return; // Return to prevent further execution
        }
        res.status(200).json({message:"data updated sucessfully",data:update_data});
    })
};

const patchData = (req, res) => {
    const id = req.params.id;
    const values = req.body;
    const keys = Object.keys(values);
    const value = Object.values(values);
    let str = '';
    keys.forEach((key, index) => {
        str += `${key} = $${index + 1}`;
        if (index < keys.length - 1) {
            str += ',';
        }
    });

    const sqlQuery = `UPDATE datasets SET ${str} WHERE id=${id}`;
    

    pool.query(sqlQuery, [value,id], (error, results) => {
        if (error) {
            // Handle the error here
            console.error('Error:', error.message);
            res.status(404).json({ error: 'cannot patch data' });
            return; // Return to prevent further execution
        }
        res.status(200).json({message:"data patched successfully",updated_values:"results"});
    });
};


module.exports = {
    getdata,
    getDataById,
    addData,
    removeData,
    updateData,
    patchData,
    
    
};