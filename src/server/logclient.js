import { getServerIP, getPort } from "../auth/access";
import axios from 'axios'

const url = `http://${getServerIP()}:${getPort()}/`
export default url;

let metadata = {}
let projects = []

async function loadMetadata(updateCallback){
    await axios.get(url).then(res => {
        metadata = res.data;
        console.log(metadata);
        console.log("Loading Projects");
        loadProjects(updateCallback);
    });

}

function loadProjects(updateCallback){
    metadata["projects"].forEach(async function(project) {
        await axios.get(url + project.replace(/\s+/g, '')).then(res => {
            projects.push(res.data);
            console.log(res.data);
            updateCallback()
        });
    });

    
}

export function setup(updateCallback){
    console.log("Loading Server Metadata");
    loadMetadata(updateCallback);
}

export function getTitles(){
    return metadata["projects"];
}

export function getProjects(){
    return projects;
}

export function getProject(projectName){
    projects.forEach(project => {
        if(projectName == project["title"]){
            console.log(project);
            return project;
        }
    });
}

export function updateProject(projectName){

    let payload = getProject(projectName);

    axios.post(url + projectName.replace(/\s+/g, ''), payload).then(res => {
        console.log(res.data);
    });
}

export function createProject(projectName){
    let payload = {projectName: projectName}

    axios.post(url + 'add', payload).then(res => {
        console.log(res.data);
    });
}

export function deleteProject(projectName){
    let payload = {projectName: projectName}

    axios.post(url + 'delete', payload).then(res => {
        console.log(res.data);
    });
}