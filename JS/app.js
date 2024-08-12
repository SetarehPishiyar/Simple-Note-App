const notes = [
    {
        id: 1,
        title: "1st Note",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.",
        modified: ""
    },
    {
        id: 1,
        title: "1st Note",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.",
        modified: ""
    }
];

class notesAPI{
    getAllNotes(){
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.sort((a,b)=> {
            return new Date(a.modified) > new Date(b.modified) ? -1 : 1;
        });

    }

    saveNote(){

    }

    deleteNote(){

    }
}