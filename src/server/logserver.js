import {getPort, getServerIP, guid} from './auth/access.js'

import express from 'express'
import fs from 'fs'
import cors from 'cors'
import https from 'https'

const app = express()

const port = getPort();

const privKey = fs.readFileSync(`C:/Certbot/live/${getServerIP()}/privKey.pem`, 'utf8')
const cert = fs.readFileSync(`C:/Certbot/live/${getServerIP()}/fullchain.pem`, 'utf8')

let serveData = {}

function getDefaultProject(projectName){
    let defaultProject = {
        title: projectName,
        id: guid(),
        description: "Describe the project!",
        completed: false,
        logs: [
            {
                logTitle: "An Example Log Title",
                id: guid(),
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
        serveData["metadata"] = JSON.parse(data);
        console.log("Projects Loaded from File");

        console.log("Validating project files");

        serveData["metadata"]["titles"].forEach(project => {
            fs.open(`./projects/${project}.json`, 'r', (err, code) => {
                try{
                    console.log(`Created ${project} with code ${code}`);
                } catch(e){
                    console.log("File not found, will be created during existence validation");
                }
            });

            serveData["projects"] = [];

            fs.readFile(`./projects/${project}.json`, (err, data) => {
                try{

                    let parsedProject = JSON.parse(data);
                    
                    if(!parsedProject["id"]){
                        parsedProject["id"] = guid();
                    }

                    serveData["projects"].push(parsedProject);

                    console.log(`Validated ${project} Existence`);
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
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json({limit: '50mb'}));
    app.use(cors());

    app.post("/add", (req, res) => {

        if(!serveData.metadata.titles.includes(req.body.projectName.trim())){
            serveData.metadata.titles.push(req.body.projectName);
            console.log(`Added Project ${req.body.projectName}`);
            fs.writeFile("./projects.json", JSON.stringify(serveData.metadata), err => {
                if(err) throw err;
            });
            fs.writeFile(`./projects/${req.body.projectName}.json`, JSON.stringify(getDefaultProject(req.body.projectName)), err => {
                if(err) throw err;
            });
            serveData.projects.push(getDefaultProject(req.body.projectName));

            res.end("Success");
        } else {
            res.end("Already Exists");
        }
    });

    app.post("/delete", (req, res) => {
        let index = serveData.metadata.titles.indexOf(req.body.projectName);
        if(index > -1){
            serveData.metadata.titles.splice(index, 1);
        }
        fs.writeFile("./projects.json", JSON.stringify(serveData.metadata), err => {
            if(err) throw err;
        });
        fs.unlink(`./projects/${req.body.projectName}`, () => {
            console.log(`Removed Project ${req.body.projectName}`)
        });
        serveData.projects = serveData.projects.filter(e =>{
            return e.title != req.body.projectName;
        });

        res.end("Success");
    });

    app.get("/", (req, res) => {
        res.send(JSON.stringify(serveData));
    });

    app.post("/", (req, res) => {

        console.log(req.body);

        fs.writeFile(`./projects/${req.body.project.title}.json`, JSON.stringify(req.body.project), err => {
            if(err) throw err;
            console.log(`Updated project ${req.body.project.title}`);

            serveData.projects = serveData.projects.filter(e => {
                return e.title != req.body.project.title;
            });

            serveData.projects.push(req.body.project);

            res.send("Success");
        });
    });
    
    let credentials = {key: privKey, cert: cert};
    var server = https.createServer(credentials, app);
    
    server.listen(port);
}

function main(){
    prep()
}

main();