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
                // console.log("added");
                const addingNote = {
                    title: "",
                    body: "",
                    id: "",
                }
                notesAPI.saveNote(addingNote);
                this.view.updateEditPageVisibility(true);
                this.refreshNotes();
                this.avtiveNote = addingNote;
                this.view.updateActiveNote(addingNote);
            },
            updateNote: (newTitle, newBody) => {
                // console.log(newTitle + "   " + newBody);
                const updatingNote = {
                    title: newTitle,
                    body: newBody,
                    id: this.avtiveNote.id,
                }
                notesAPI.saveNote(updatingNote);
                this.refreshNotes();
                this.avtiveNote = updatingNote;
                this.view.updateActiveNote(updatingNote);
                this.view.updateEditPageVisibility(true);
            },
            previewNote: (id) =>{
                // console.log(id);
                const tempNote = this.notes.find((n) => n.id == id);
                this.view.updateActiveNote(tempNote);
                // this.view.updateNoteList(this.notes);
                this.avtiveNote = tempNote;
                this.view.updateEditPageVisibility(true);
            },
            deleteNote: (id) => {
                // console.log("delete" + id);
                // const tempNote = this.notes.find((n) => n.id == id);
                notesAPI.deleteNoteFromStorage(id);
                this.refreshNotes();
                this.view.updateEditPageVisibility(false);

            },
            editNote: (id) => {
                console.log(id);
                const tempNote = this.notes.find((n) => n.id == id);
                this.view.updateActiveNote(tempNote);
                // this.view.updateNoteList(this.notes);
                this.avtiveNote = tempNote;
                this.view.updateEditPageVisibility(true);
            }
        }
    }

    refreshNotes(){
        const notes = notesAPI.getAllNotes();
        this.notes = notes;
        this.view.updateNoteList(this.notes);
    }
}