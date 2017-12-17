let mysql = require('mysql')

let connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "chatbot"
  });

  function getElems(request, callback){
    connection.connect();
    
    connection.query(request, function (error, results, fields) {
        if (error) 
            callback(error,null);
        else
            callback(null,results);
    });
    
    connection.end();
  }

//   let selectQuery = 'SELECT * FROM salons'

//   getElems(selectQuery, function(err,data){
//     if (err) {
//         console.log("ERROR : ",err);            
//     } else {            
//         console.log("result from db is : ",data);   
//     }
//   })  
