var Employee = require('../model/employee');
const methods = {};
methods.getAllEmployee = (empData) => {
    return new Promise((resolve, reject) => {
      //get all employee
        Employee.find({},(err,data)=>{
            if(err){
                reject({status:500})
            }else{
               resolve({status:200,data:data})
            }
        })
       
    });
}

methods.getSearchEmployee = (empData) => {
    return new Promise((resolve, reject) => {
            //find the employee based on keyword
        Employee.find(empData,(err,data)=>{
            if(err){
                reject({status:500})
            }else{
               resolve({status:200,data:data})
            }
        })
       
    });
}

methods.getSortEmployee = (empData) => {
    return new Promise((resolve, reject) => {
            //making sorting records based on fields
        let sortObj = {};
if(empData){
    
    sortObj = empData;
}else{
    sortObj = {_id:-1}
}
        
        Employee.find({}).sort(sortObj).exec((err,data)=>{
            if(err){
                reject({status:500})
            }else{
               resolve({status:200,data:data})
            }
        })
       
    });
}

methods.addEmployee = (empData) => {
    return new Promise((resolve, reject) => {
        //adding new Employee
        Employee.create(empData,(err,data)=>{
            if(err){
                reject({status:500})
            }else{
               resolve({status:200,data:data})
            }
        })
       
    });
}

methods.deleteEmployee = (empData) => {
    return new Promise((resolve, reject) => {
        //remove specific Employee

        Employee.remove({_id:empData.id},(err,data)=>{
            if(err){
                reject({status:500})
            }else{
               resolve({status:200,data:data})
            }
        })
       
    });
}
methods.updateEmployee = (empData) => {
    return new Promise((resolve, reject) => {
        //update specific Employee
        Employee.update({_id:empData.id},{$set:empData},(err,data)=>{
            if(err){
                reject({status:500})
            }else{
               resolve({status:200,data:data})
            }
        })
       
    });
}

methods.checkEmpData = (empData) => {
    return new Promise((resolve, reject) => {
        //update specific Employee
        Employee.find(empData,(err,data)=>{
            if(err){
                reject({status:500})
            }else{
                let is_data = data.length > 0 ? "already exist" : "Does not exist"
               resolve({status:200,data:is_data})
            }
        })
       
    });
}
module.exports = methods;