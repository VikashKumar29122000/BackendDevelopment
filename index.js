const http=require('http');
const express=require('express');
const app=express();
const morgan= require('morgan');
const bodyParser=require('body-parser');


const hostname='localhost';
const port=3000;

app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text-html');
    next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());





app.get('/dishes',(req,res,next)=>{
    res.end('Will send all dishes');
});
app.post('/dishes',(req,res,next)=>{
    res.end(`Will add the dish: ${req.body.name} with description: ${req.body.description}`);
});
app.put('/dishes',(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported');
});
app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting all the dishes');
});
app.get('/dishes/:dishID',(req,res,next)=>{
    res.end(`Will send the dish with id: ${req.params.dishID}`);
});
app.post('/dishes/:dishID',(req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported at dish with id: '+ req.params.dishID);
});
app.put('/dishes/:dishID',(req,res,next)=>{
    res.write('Updating the dish with dishID: '+ req.params.dishID+'\n');

    res.end('Will update the dish with id: '+req.params.dishID);
});
app.delete('/dishes/:dishID',(req,res,next)=>{
    res.end('Deleting the dish wiht id: '+req.params.dishID);
});



app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});


const server=http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
 