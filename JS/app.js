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
    },
    deleteNote(id){
        console.log("delete" + id);
    },
    editNote(id){
        console.log("edit" + id);

    }
}); 

view.updateNoteList(notesAPI.getAllNotes());
view.updateActiveNote(notesAPI.getAllNotes()[1]);