const express = require('express');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
//

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// Routes


app.use(require('./api/datos.js'));


// Starting the server
const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});


//web socket

const socketio = require('socket.io');
const io = socketio(server);


io.on('connection', (socket) => {
  console.log('new conection', socket.id);
  io.sockets.emit('welcome', 'hola');


  socket.on('transmicion:Ubicacion',async (datos) => {
    datos.id = socket.id;
    console.log(datos);
   await insertDispositivo(datos.UUID, datos.model, datos.manufacture);
   await insertUbicacion(datos.UUID, datos.Lat, datos.lon);
    socket.broadcast.emit('Ubicacion:' + datos.UUID, datos);
    socket.broadcast.emit('Ubicacion', datos);



  });
  socket.on('disconnect', (datos) => {
    console.log('deconeccion', socket.id);
    socket.broadcast.emit('Desconectar', socket.id);
  });



});
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function insertDispositivo(uuid, modelo, manofactura) {
  var retu = await ExtisteDis(uuid);
  console.log(retu);

  if (!retu) {
    try {

      await client.connect();
      const database = client.db("dbPMapas");
      const collection = database.collection("Dispositivos");

      const result = await collection.insertOne({ "UUID": uuid, "manufacture": manofactura, "model": modelo });
      console.log(JSON.stringify(result));
    } catch (e) {
      console.log("Error: " + e);
    } finally {
      client.close();
    }
  }

}
async function ExtisteDis(uuid) {
  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Dispositivos");

    const cursor = await collection.find({ UUID: { $eq: uuid } }, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });
    console.log("items",JSON.stringify(items));
    //return items;
    console.log("tamaño",items.length);
    if (items.length > 0) {
      return true;
    } else {
      return false;
    }

  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }
}
async function insertUbicacion(uuid, lat, lon) {




  try {

    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Ubicaciones");
    var currentdate = new Date();
    var dia = currentdate.getDate().toString();
    if (dia.length == 1) {
      dia = "0" + dia;
    }
    var mes = (currentdate.getMonth() + 1).toString();
    if (mes.length == 1) {
      mes = "0" + mes;
    }
    var date = currentdate.getFullYear() + "-" + mes + "-" + dia;
    var time = currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    const result = await collection.insertOne({ "UUID": uuid, "lat": lat, "lon": lon, "date": date,"time":time });
    console.log(JSON.stringify(result));
  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }



}

//insertDispositivo("1234","123","123");






    //import "./db";
//const mysqlConnection2 = require('./db.js');
/*
const mysqlConnection2 = require('./database.js');

function GuardarPunto(data) {
  const query = `INSERT INTO posiciones(
    Id_Dis,
    Latitud,
    Longitud,
    exactitud,
    Fecha)
    VALUES(?,?,?, ?,NOW());
`;



  mysqlConnection2.query(query, [data.Id, data.Lat, data.lon, data.exa], (err, rows, fields) => {
    if (!err) {
      console.log('punto guardado');
    } else {
      console.log(err);
    }
  });
}
-*/