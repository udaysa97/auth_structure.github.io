const express = require('express');
const app = express();
const port = 8000;



app.listen(port,(err)=>{
    if(err){
        console.log(`Error while hosting: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
})