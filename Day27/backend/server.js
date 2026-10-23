const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.urlencoded({extend:true}))
app.use(express.json())
app.post('/',function(rwq,res){
    const data = rame.body.username;
    res.send(data)
});
app.listen(3000,function(){
    console.log("server port on run 3000")
});