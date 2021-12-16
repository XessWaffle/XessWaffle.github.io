import {getPort} from './auth/access.js'

import express from 'express'
import fs from 'fs'

const app = express()

const port = getPort();

let metadata = []

function prep(){

    fs.open("./projects.json", "r", (err, data) => {
        if(err) throw err;
        console.log(`Code ${data}`);
    });

    fs.readFile("./projects.json", (err, data) =>{
        if(err) throw err;
        metadata = JSON.parse(data);
        console.log("Projects Loaded from File " + JSON.stringify(metadata));

        console.log("Validating project files");

        metadata["projects"].forEach(project => {
            fs.open(`./projects/${project.replace()}.json`, 'w+', (err, code) => {
                if(err) throw err;
                console.log(`Validated ${project} with code ${code}`);
            });
        });

        prepServer()

    });
}

function prepServer(){
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.post("/", (req, res) => {
        metadata["projects"].push(req.body.projectName);
        console.log(`Added Project ${req.body.projectName}`);
        updateMetadata();
        res.end("Success");
    });

    app.get("/", (req, res) => {
        res.send(JSON.stringify(metadata));
    });

    metadata["projects"].forEach(project => {
        app.get(`/${project.replace(/\s+/g, '')}`, (req, res) => {
            fs.readFile(`./projects/${project}.json`, (err, data) => {
                if(err) throw err;
                res.send(JSON.stringify(data));
            });
        });

        app.post(`/${project.replace(/\s+/g, '')}`, (req, res) => {
            fs.writeFile(`./projects/${project}.json`, JSON.stringify(req.body.project), err => {
                if(err) throw err;
                console.log(`Updated project ${project}`)
                res.send("Success");
            });
        });
    });

    var server = app.listen(port, "0.0.0.0", () => {
        console.log(`LogServer started at http://${server.address().address}:${server.address().port}`);
    });

}

function updateMetadata(){
    fs.writeFile("./projects.json", JSON.stringify(metadata), err => {
        if(err) throw err;
    });
}

function main(){
    prep()
}

main();