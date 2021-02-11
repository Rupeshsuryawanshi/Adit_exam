  var express = require('express');

var router = express.Router();

var mysql = require('mysql')


router.post('/addEmploye',(req,res ,next)=>{
  try{
let reqObj=req.body;
console.log(reqObj);
req.getConnection(function(err,conn) {
  if (!!err) {
    console.error('SQL Connection error: ', err);
    return next(err);
} else {
  
  
    conn.query("SELECT * FROM employee_data WHERE employe_id='"+reqObj.employe_id+"'", function (err, result) {

      if (err) throw err;
      else{
        if(result.length>0){
          res.send({status:"true",msg:"employe is Already working one of company ",data:result[0]});
        }
        else{
          
          var sql="INSERT INTO employee_data (employe_id,employee_name,company_name,role) VALUES ('"+reqObj.employe_id+"','"+reqObj.employee_name+"','"+reqObj.company_name+"','"+reqObj.role+"')"
          conn.query(sql, function (err, resultInsert) {
           if(err){
             
            res.send({status:"false",msg:"invalid data", "err":err})
           } 
           else {
             console.log(resultInsert);
            //  res.send({status:"true",msg:"success",data:resultInsert})
            conn.query("SELECT * FROM employee_data WHERE id='"+resultInsert.insertId+"'", function (err, resultNewUser) {
                if(err) 
                {
                  res.send({status:"false",msg:"Query error", "err":err})
                } else {
                  res.send({status:"true",msg:"success",data:resultNewUser[0]})
                }
            })
            
           } //last inserted data
           
           
       })
            
            
        } //insert data check

                   
                   
                }
   
    }); //data is check
  }
  }); //connection check

  
  }
catch(ex){
console.log("error",ex);
}

})




router.put('/update_employe', function (req, res) {

  try{
    let reqObj=req.body;
    console.log(reqObj);
    req.getConnection(function(err,conn) {
      if (!!err) {
        console.error('SQL Connection error: ', err);
        return next(err);
    } else {
      
      
      conn.query('UPDATE `employee_data` SET `employee_name`=?,`company_name`=?,`role`=? where `employe_id`=?', [req.body.employee_name,req.body.company_name, req.body.role, req.body.employe_id], function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      }); //data is check
      }
      }); //connection check
    
      
      }
    catch(ex){
    console.log("error",ex);
    }
  
});

router.delete('/delete_Employee',(req,res,next)=>{

  try{
    let reqObj=req.body;
    console.log(reqObj);
    req.getConnection(function(err,conn) {
      if (!!err) {
        console.error('SQL Connection error: ', err);
        return next(err);
    } else {
      
      
      conn.query('DELETE FROM `employee_data` WHERE `employe_id`=?', [req.body.employe_id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
      }); //data is check
      }
      }); //connection check
    
      
      }
    catch(ex){
    console.log("error",ex);
    }


})
module.exports = router;