import notesAPI from "./notesAPI.js";
import notesView from "./notesView.js";

export default class App{
    constructor(root){
        this.notes = [];
        this.avtiveNote = null;
        this.view = new notesView(root, this._handlers());
        this.refreshNotes();
    }

    _handlers(){
        return {
            addNote: () => {
                console.log("added");
            },
            updateNote: (newTitle, newBody) => {
                console.log(newTitle + "   " + newBody);
            },
            previewNote: (id) =>{
                console.log(id);
                const tempNote = this.notes.find((n) => n.id == id);
                this.view.updateActiveNote(tempNote);
                // this.view.updateNoteList(this.notes);
                this.view.updateEditPageVisibility(true);
            },
            deleteNote: (id) => {
                console.log("delete" + id);
            },
            editNote: (id) => {
                console.log("edit" + id);
            }
        }
    }

    refreshNotes(){
        const notes = notesAPI.getAllNotes();
        this.notes = notes;
        this.view.updateNoteList(this.notes);
    }
}