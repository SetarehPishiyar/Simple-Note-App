
export default class notesAPI{
    static getAllNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.sort((a, b) => new Date(b.modified) - new Date(a.modified));
        return savedNotes;
    }

    static saveNote(note){
        const allNotes = notesAPI.getAllNotes();
        const existedNote = allNotes.find((n) => n.id == note.id);

        if(existedNote){
            existedNote.title = note.title;
            existedNote.body = note.body;
            existedNote.modified = new Date().toISOString();
        }
        else{
            note.id = allNotes.length + 1;
            note.modified = new Date().toISOString();
            allNotes.push(note);
        }
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }

    deleteNote(id){
        const allNotes = notesAPI.getAllNotes();
        const updatedNotes = allNotes.filter((n)=> n.id != id);
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }
}