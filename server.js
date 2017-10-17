const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;
var app = express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();}
);

hbs.registerHelper('upperCase',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var time = new Date().toString();
  var text = `${time} ${req.method} ${req.url}`;

  console.log(text);
  fs.appendFile('server.log',text + '\n');
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintainance.hbs');
// })

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  //res.send('<h1>Hello There</h1>');
  res.render('home.hbs',{
    PageTitle : 'New Page',
    welcome : 'Welcome to node js',
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    PageTitle : 'New Page',

  });
})

app.get('/error',(req,res)=>{
  res.send({
    data: 'actual data',
    status: ' error occured',
  })
})

app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    PageTitle : "This is Project Page"
  })
})
app.listen(port,()=>{
  console.log(`Server is up on Port: ${port}`);
});
