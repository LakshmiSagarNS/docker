const express = require('express');
const datasetsRoutes = require('../route/routes');
const app = express();
const port = 3000;
app.use(express.json());

app.get("/",(req,res)=>{res.send("Hello World");});
//express framework for handling request
app.use("/api/v1/datasets",datasetsRoutes);
// server connection creation
app.listen(port,() => console.log(`app listening on port ${port}`));
