/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://xesswaffle:SXQk4JifXjRj8fs@logger.kcwzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/


/*function createProject(name){
    
    store.projects.forEach(project => {
        if(project.name == name){
            return;
        }
    });

    store.projects.push(
        {
            name: name,
            description: '',
            logs: [],
        }
    );
}

function addLog(name, log){

    store.projects.forEach(project => {
        if(project.name == name){
            project['logs'].push({date: Date().toLocaleString(), log: log});
        }
    });
    
}*/
