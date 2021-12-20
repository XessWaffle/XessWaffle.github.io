import { getServerIP, getPort, guid } from "../auth/access";
import axios from 'axios'

const url = `https://${getServerIP()}:${getPort()}/`
export default url;

function getDefaultLog(){
    return {
        logTitle: "An Example Log Title",
        id: guid(),
        log: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum molestie nunc nec elementum. Nam consectetur magna vel diam ultrices posuere. Ut porttitor orci eu tortor venenatis, ac commodo libero molestie. Proin eu felis faucibus, congue dolor et, eleifend tortor. Donec vel cursus lorem, eget condimentum diam. Donec vehicula augue tortor. Curabitur in ex sit amet dui ornare consequat id sit amet ipsum. Sed sit amet egestas sem, eget commodo risus. Aliquam in velit vehicula mauris luctus suscipit. Maecenas consequat tellus diam, at tincidunt magna feugiat eu. Vestibulum vulputate metus in convallis bibendum.",
        date: "01/01/2000"
    };
}

/*function load(updateCallback){
    axios.get(url).then(res => {
        servedData = res.data;
        console.log(res.data);
        updateCallback();
    });

}*/

export async function setup(updateCallback){
    console.log("Loading Server Data");
    
    let res = await axios.get(url);
    console.log(res.data);
    updateCallback(res.data);
}

export function getProject(servedData, id, requestCallback){
    servedData.projects.forEach(project => {
        if(id == project.id){
            console.log(project);
            requestCallback(project);
        }
    });
}

export async function updateTitle(servedData, data, callback){

    servedData.projects.forEach((project) => {
        if(data.id == project.id){
            project.title = data.newAlias;
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function updateDescription(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.description = data.newDescription;
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function addLog(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs.push(getDefaultLog());
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function shiftLog(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            for(var i = 0; i < project.logs.length; i++){
                if(data.logData.id == project.logs[i].id){
                    let swapTo = data.logData.direction + i;
                    
                    if(swapTo >= 0 && swapTo < project.logs.length){
                        let temp = project.logs[swapTo];
                        project.logs[swapTo] = project.logs[i];
                        project.logs[i] = temp;
                    }

                    data.callback();
                }
            }
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function updateLogTitle(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs.forEach(log => {
                if(log.id == data.logData.id){
                    log.logTitle = data.logData.new;
                }
            });
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function updateLogDate(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs.forEach(log => {
                if(log.id == data.logData.id){
                    log.date = data.logData.new;
                }
            });
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function updateLogContent(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs.forEach(log => {
                if(log.id == data.logData.id){
                    log.log = data.logData.new;
                }
            });
        }
    });

    updateProject(servedData, data.id, callback);
}


export async function deleteLog(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs = project.logs.filter((e) =>{
                return e.id != data.logData.id;
            });
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function addImage(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs.forEach(log => {
                if(log.id == data.logData.id){
                    
                    if(!log.images){
                        log["images"] = [];
                    } 

                    log.images.push({
                        base64: data.logData.base64,
                        id: guid()
                    });
                }
            })
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function deleteImage(servedData, data, callback){
    servedData.projects.forEach(project => {
        if(data.id == project.id){
            project.logs.forEach(log => {
                if(log.id == data.logData.id){
                    log.images = log.images.filter(e =>{
                        return e.id != data.logData.imageData.id;
                    });
                }
            })
        }
    });

    updateProject(servedData, data.id, callback);
}

export async function updateProject(servedData, id, updateCallback){

    let requestCallback = (project) => {
        let payload = {project: project};

        console.log(payload);
    
        axios.post(url, payload).then(res => {
            console.log(res.data);
            setup(updateCallback);
        });
    };

    getProject(servedData, id, requestCallback);
}

export async function createProject(projectName, updateCallback){
    let payload = {projectName: projectName};

    axios.post(url + 'add', payload).then(res => {
        console.log(res.data);
        setup(updateCallback);
    });
}

export async function deleteProject(projectName, updateCallback){
    let payload = {projectName: projectName};

    axios.post(url + 'delete', payload).then(res => {
        console.log(res.data);
        setup(updateCallback);
    });
}