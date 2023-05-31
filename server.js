const mongo = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";


async function createToDoCollection() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("Organizer");
    
    await db.createCollection("ToDos");
    console.log("Collection created!");
    
    client.close();
  } catch (err) {
    if (err.code === 48) {
      console.log("Collection already exists!");
    } else {
      console.error(err);
    }
  }
}

createToDoCollection();

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

app.use(bodyParser.json());

app.get("/todos", async function (req, res) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect(); // Connect to the MongoDB server
    const todosCollection = client.db('Organizer').collection('ToDos');
    
    const result = await todosCollection.find().toArray()
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching the todos.");
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

app.get("/todos/:id", async function (req, res) {
  const toDoId = req.params.id;
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect(); // Connect to the MongoDB server
    const todosCollection = client.db('Organizer').collection('ToDos');
    const o_id =  new ObjectId(toDoId);
    const result = await todosCollection.findOne({ _id: o_id })
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching the todo.");
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});


app.post("/todos", async function (req, res) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect(); // Connect to the MongoDB server

    const task = req.body;
    const todosCollection = client.db('Organizer').collection('ToDos');

    await todosCollection.insertOne(task);
    res.send('Todo created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while saving the todo.");
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});


app.put("/todos/:id", async function (req, res) {
  const toDoId=req.params.id;
  const updatedToDo = {
    $set: { 
      completed: req.body.completed, 
      title: req.body.title,
      description: req.body.description 
    },
  };
  
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect(); // Connect to the MongoDB server
    const todosCollection = client.db('Organizer').collection('ToDos');
    const o_id =  new ObjectId(toDoId);
    await todosCollection.updateOne({ _id: o_id }, updatedToDo)
    res.send("Todo updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while updating the todo.");
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

app.delete("/todos/:id", async function (req, res) {
  const toDoId=req.params.id;
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect(); // Connect to the MongoDB server
    const todosCollection = client.db('Organizer').collection('ToDos');
    const o_id =  new ObjectId(toDoId);
     await todosCollection.deleteOne({ _id: o_id })
    res.send("Todo deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while deleting the todo.");
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
