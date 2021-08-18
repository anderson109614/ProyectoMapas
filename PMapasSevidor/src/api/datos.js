const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");


// GET all productos
router.get('/productos', async (req, res) => {

  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Productos");

    const cursor = await collection.find({}, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });

    res.json(items);


  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
// GET An cliente ci
router.get('/clientes/:ci', async (req, res) => {
  const { ci } = req.params;
  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Clientes");

    const cursor = await collection.find({ Cedula: { $eq: ci } }, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });

    res.json(items);


  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
//GuardarCliente
router.post('/Clientes', async (req, res) => {

  console.log(req.body);
  const { Nombre,
    Cedula,
    Tienda,
    Direccion } = req.body;

  try {

    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Clientes");

    const result = await collection.insertOne({ "Nombre": Nombre, "Cedula": Cedula, "Tienda": Tienda, "Direccion": Direccion });
    res.json(result);
  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
//Guardar Pedido
router.post('/Pedido', async (req, res) => {

  console.log(req.body);
  const { Nombre,
    Cedula,
    Tienda,
    Direccion } = req.body;

  try {

    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Pedidos");

    const result = await collection.insertOne(req.body);
    res.json(result);
  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
// GET pedidos
router.get('/Pedido/:fil', async (req, res) => {
  const { fil} = req.params;
  var sep=fil.split('*');
  var date=sep[0];
  var uuid=sep[1];
  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Pedidos");

    const cursor = await collection.find({ $and: [ { Date: { $eq: date } }, { UUID: { $eq: uuid } } ] }, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });

    res.json(items);


  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
// GET pedidos All
router.get('/Pedido', async (req, res) => {
 /* const { fil} = req.params;
  var sep=fil.split('*');
  var date=sep[0];
  var uuid=sep[1];*/
  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Pedidos");

    const cursor = await collection.find({  }, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });

    res.json(items);


  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
// GET all Dispocitivos
router.get('/Dispositivos', async (req, res) => {

  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Dispositivos");

    const cursor = await collection.find({}, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });

    res.json(items);


  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
// GET pedidos
router.get('/Puntos/:fil', async (req, res) => {
  const { fil} = req.params;
  var sep=fil.split('*');
  var date=sep[0];
  var uuid=sep[1];
  try {
    await client.connect();
    const database = client.db("dbPMapas");
    const collection = database.collection("Ubicaciones");

    const cursor = await collection.find({ $and: [ { date: { $eq: date } }, { UUID: { $eq: uuid } } ] }, {});

    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });

    res.json(items);


  } catch (e) {
    console.log("Error: " + e);
  } finally {
    client.close();
  }




});
module.exports = router;