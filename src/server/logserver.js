import {getPort} from './auth/access.js'

import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()

const port = getPort();

let metadata = []

function getDefaultProject(projectName){
    let defaultProject = {
        title: projectName,
        alias: projectName,
        description: "Describe the project!",
        completed: false,
        logs: [
            {
                logTitle: "An Example Log Title",
                log: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum molestie nunc nec elementum. Nam consectetur magna vel diam ultrices posuere. Ut porttitor orci eu tortor venenatis, ac commodo libero molestie. Proin eu felis faucibus, congue dolor et, eleifend tortor. Donec vel cursus lorem, eget condimentum diam. Donec vehicula augue tortor. Curabitur in ex sit amet dui ornare consequat id sit amet ipsum. Sed sit amet egestas sem, eget commodo risus. Aliquam in velit vehicula mauris luctus suscipit. Maecenas consequat tellus diam, at tincidunt magna feugiat eu. Vestibulum vulputate metus in convallis bibendum.",
                date: "01/01/2000"
            }
        ]
    }
    return defaultProject;
}


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
            fs.open(`./projects/${project}.json`, 'r', (err, code) => {
                if(err) throw err;
                console.log(`Created ${project} with code ${code}`);
            });

            fs.readFile(`./projects/${project}.json`, (err, data) => {
                try{
                    JSON.parse(data);
                    console.log(`Validated ${project} Existence`)
                } catch(e){
                    fs.writeFile(`./projects/${project}.json`, JSON.stringify(getDefaultProject(project)), () => {
                        console.log(`Initialized ${project}`);
                    });
                }
            })
        });

        prepServer()

    });
}

function prepServer(){
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    app.post("/add", (req, res) => {
        metadata["projects"].push(req.body.projectName);
        console.log(`Added Project ${req.body.projectName}`);
        fs.writeFile("./projects.json", JSON.stringify(metadata), err => {
            if(err) throw err;
        });
        fs.writeFile(`./projects/${req.body.projectName}.json`, JSON.stringify(getDefaultProject(req.body.projectName)), err => {
            if(err) throw err;
        });
        res.end("Success");
    });

    app.post("/delete", (req, res) => {
        let index = metadata["projects"].indexOf(req.body.projectName);
        if(index > -1){
            metadata["projects"].splice(index, 1);
        }
        fs.writeFile("./projects.json", JSON.stringify(metadata), err => {
            if(err) throw err;
        });
        fs.unlink(`/projects/${req.body.projectName}`, () => {
            console.log(`Removed Project ${req.body.projectName}`)
        });
        res.end("Success");
    });

    app.get("/", (req, res) => {
        res.send(JSON.stringify(metadata));
    });

    metadata["projects"].forEach(project => {
        app.get(`/${project.replace(/\s+/g, '')}`, (req, res) => {
            fs.readFile(`./projects/${project}.json`, (err, data) => {
                if(err) throw err;
                let projectData = JSON.parse(data);
                res.send(JSON.stringify(projectData));
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

function main(){
    prep()
}

main();