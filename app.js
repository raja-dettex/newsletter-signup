//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:"true"}));

app.get("/",function(req, res){
    res.sendFile(__dirname+"/signup.html");
});
app.get("/failure",function(req, res){
    res.sendFile(__dirname+"/failure.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
const lastName = req.body.lName;
const Email = req.body.email;
    console.log(firstName, lastName, Email);
    if(!firstName || !lastName || !Email){
        res.send("fail");
        
    }
    
   
    const data = {
        members:[
            {
                email_adress: Email,
                status: "subsribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const postData = JSON.stringify(data);

    const options = {
        url:"https://us1.api.mailchimp.com/3.0/lists/${list_id}",
        method:"POST",
        
        Headers: {
            "Authorization":"bearer  <token>"
        },
        body:postData,
    }

    request(options, function(err, response, body){
        
        if(err){
            
            res.send("failure");
        }
        else{
            if(response.statusCode===200){
                res.send("success");
            }
            else{
                
                res.redirect("/failure");
            }
        }

    });

   

});
app.post("/failure", function(req, res){
    res.redirect("/");
});














app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on 3000");
});



// const firstName = req.body.fName;
// const lastName = req.body.lName;
// const Email = req.body.email;
// const Data = {
//     members: [
//         {
//             email_adress: Email,
//             status: "subscribed",
//             merge_fields:{
//                 FNAME: firstName,
//                 LNAME: lastName,
//             }
//         }
//     ]
// };
// const jsonData = JSON.stringify(Data);
// const url = "https://us1.api.mailchimp.com/3.0/lists/{list_id}";
// const options = {
//     method:"POST",
// Auth:"api_key",
// }

//     https.request(url, options, function(response){
//         console.log(response.statusCode);
//         response.on("data", function(data){
//             console.log(JSON.parse(data));
//         });
//     }); 