const express = require('express')
const app = express();
app.get('/',function(req,res){
    res.send("Hello from Express")

})
app.listen(5000,function(){
    console.log("Express server running")
})