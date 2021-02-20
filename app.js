var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var http = require("http");
var cors = require('cors');
var server = http.createServer(app);
var port = 4000;
var mongoose = require("mongoose");
var Employee = require("./controllers/employee")
mongoose.connect("mongodb://localhost:27017/salestoolapp")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors({
    origin: ['https://localhost', 'http://localhost', 'https://localhost:4200', 'http://localhost:4200'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  
  }));
  
app.get("/getuserinfo",(request,response)=>{
    console.log("iiireq-->",request.query.id);
    User.find({},(err,data)=>{
        if(err){
            response.json({status:500,message:"internal error"})
            }else{
                response.json({status:200,message:"success",result:data})
            }
    })
})
 
app.post("/login",(request,response)=>{
    console.log("iiireq-->",request.body);
    User.findOne({email:request.body.email},(err,data)=>{
        if(err){
            response.json({status:500,message:"internal error"})
            }else if(!data.password == request.body.password){
                response.json({status:506,message:"Password does not match"})
            }else{
                response.json({status:200,data:data})
            }
    })
})


app.post("/adduser",(req,res)=>{
        User.create(req.body,(err,data)=>{
            if(err){
                res.json({status:500,message:"internal error"})
                }else{
             res.json({status:200,message:" user added successfully"})
                }
        })
    })
app.delete("/removeuser/:id",(req,res)=>{
console.log("req.params",req.params)
    User.remove({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({status:500,message:"internal error"})
            }else{
         res.json({status:200,message:"Remove user successfully"})
            }
    })
})

app.put("/updateuser",(req,res)=>{
    console.log("req.body",req.body)
    User.update({_id:req.body._id},{$set:req.body},(err,data)=>{
        if(err){
            res.json({status:500,message:"internal error"})
            }else{
         res.json({status:200,message:"update user successfully"})
            }
    })
})
app.post("/addemployee",(req, res)=>{
    console.log("req.body",req.body);
    Employee.addEmployee(req.body).then((data)=>{
        res.json({status:200,message:"Employee created successfully"})
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})
app.get("/getemployee",(req, res)=>{
    console.log("req.body",req.body);
    Employee.getAllEmployee(req.body).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})
app.post("/getsearchemployee",(req, res)=>{
    console.log("req.body",req.body);
    Employee.getSearchEmployee(req.body).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})
app.post("/getsortemployee",(req, res)=>{
    console.log("req.body",req.body);
    Employee.getSortEmployee(req.body).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})

app.delete("/deleteemployee/:id",(req, res)=>{
    console.log("req.body",req.params);
    Employee.deleteEmployee(req.params).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})
app.post("/updateemployee",(req, res)=>{
    console.log("req.body",req.body);
    Employee.updateEmployee(req.body).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})
app.post("/checkempdata",(req, res)=>{
    console.log("req.body",req.body);
    Employee.checkEmpData(req.body).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({status:500,message:"internal error"})

    })
})
server.listen(port,()=>{
console.log("App started : ",port);
})







