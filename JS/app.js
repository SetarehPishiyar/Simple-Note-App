const notes = [
    {
        id: 1,
        title: "1st Note",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.",
        modified: "2024-08-12T14:21:34.353Z"
    },
    {
        id: 2,
        title: "2nd Note",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.",
        modified: "2024-08-12T14:21:01.453Z"
    }
];

class notesAPI{
    static getAllNotes() {
        // خواندن یادداشت‌ها از localStorage
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        // console.log(savedNotes);
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

// console.log(notes);
notesAPI.saveNote({
        id: 2,
        title: "2nd  edit Note",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.",
        modified: "2024-08-12T14:21:01.453Z"
});
console.log(notesAPI.getAllNotes());