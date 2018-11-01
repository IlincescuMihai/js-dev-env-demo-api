var express =  require('express');
var cors = require('cors');
var sql = require('mssql');
const app = express();
app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello Mishu!')
});

const config = {
  user: 'mishu',
  password: 'dorina-Ursu0488',
  server: 'mishuserver.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'js-dev-env',

  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
}

sql.connect(config);

app.get('/users', function(req, res) {
  const request = new sql.Request();
  request.query('select * from users')
    .then(result =>{       
      res.json(result.recordset);
    });
  // Hard coding for simplicity. Pretend this hits a real database
  // res.json([
  //   {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
  //   {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
  //   {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  // ]);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port')); 
});