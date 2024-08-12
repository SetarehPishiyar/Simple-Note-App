import notesAPI from "./notesAPI.js";
import notesView from "./notesView.js";

const app = document.getElementById("app");
const view = new notesView(app, {
    addNote(){
        console.log("added");
    },
    updateNote(newTitle, newBody){
        console.log(newTitle + "   " + newBody);
    },
    previewNote(id){
        console.log(id);
    }
}); 

view.updateNoteList(notesAPI.getAllNotes());