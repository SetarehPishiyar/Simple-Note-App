export default class notesView{
    constructor(root, handlers){
        this.root = root;
        const { addNote , updateNote, previewNote, deleteNote, editNote} = handlers;
        this.addNote = addNote;
        this.updateNote = updateNote;
        this.previewNote = previewNote;
        this.deleteNote = deleteNote;
        this.editNote = editNote;


        this.root.innerHTML = `
        <div class="notes-navbar">
            <div class="app-logo">NOTE APP</div>
            <div class="notes-list">

            </div>
            <button class="add-notes">
                <i class="fas fa-pencil-alt"></i>
                Add Note</button>
        </div>
        <div class="notes-preview">
            <input type="text" class="note-title-edit" placeholder="Write your title...">
            <textarea name="" class="note-body-edit" placeholder="Write your note..."></textarea>
            <button class="save-btn">Save</button>
        </div>
        `;

        const addBtn = this.root.querySelector(".add-notes");
        const noteTitle = this.root.querySelector(".note-title-edit");
        const noteBody = this.root.querySelector(".note-body-edit");
        const saveBtn = this.root.querySelector(".save-btn");
        addBtn.addEventListener("click", this.addNote);

        [noteTitle, noteBody].forEach((inputField)=> {
            inputField.addEventListener("blur", ()=>{
                const newBody = noteBody.value;
                const newTitle = noteTitle.value.trim();
                this.updateNote(newTitle, newBody);
            });
        });

        saveBtn.addEventListener("click", (event)=> {
            const newBody = noteBody.value;
            const newTitle = noteTitle.value.trim();
            this.updateNote(newTitle, newBody);
        });

        this.updateEditPageVisibility(false);
    }

    #createListItemHTML(id, title, body, modified){
        return `
                <div class="notes-list-item" noteId="${id}">
                    <div class="note-header">
                        <button class="icon-btn delete-btn"><i class="fas fa-trash-alt"  noteId="${id}"></i></button>
                        <button class="icon-btn edit-btn"><i class="fas fa-edit" noteId="${id}"></i></button>
                    </div>
                    <div class="note-title"> ${title} </div>
                    <div class="note-body"> ${body} </div>
                    <div class="note-modified-date">${new Date(modified).toLocaleString("en", {dateStyle:"long", timeStyle:"short"})}</div>
                </div>
        `
    }

    updateNoteList(allNotes){
        const notesContainer = this.root.querySelector(".notes-list");
        notesContainer.innerHTML = "";
        let nodeList = "";
        allNotes.forEach(n => {
            const {id, title, body, modified} = n;
            const res = this.#createListItemHTML(id, title, body, modified);
            nodeList += res;
        });
        notesContainer.innerHTML = nodeList;
        notesContainer.querySelectorAll(".notes-list-item").forEach((noteItem)=>{
            noteItem.addEventListener("click", ()=>{
                // console.log(noteItem);
                this.previewNote(noteItem.attributes.noteid.value);
            });
        });

        notesContainer.querySelectorAll(".delete-btn").forEach((noteItem)=>{
            noteItem.addEventListener("click", (event)=>{
                event.stopPropagation();
                this.deleteNote(event.target.attributes.noteid.value);
            });
        });

        notesContainer.querySelectorAll(".edit-btn").forEach((noteItem)=>{
            noteItem.addEventListener("click", (event)=>{
                event.stopPropagation();
                this.editNote(event.target.attributes.noteid.value);
            });
        });
    }

    updateActiveNote(note){
        this.root.querySelector(".note-title-edit").value = note.title;
        this.root.querySelector(".note-body-edit").value = note.body;

        this.root.querySelectorAll(".notes-list-item").forEach(item => {
            item.classList.remove("notes-list-item--selected");
        });
        
        this.root.querySelector(`.notes-list-item[noteid='${note.id}']`)
        .classList.add("notes-list-item--selected");
    }

    updateEditPageVisibility(visible){
        this.root.querySelector(".notes-preview").style.visibility = visible ? "visible" : "hidden";
    }

    updatePreviewPageVisibility(visible){
        this.root.querySelector(".notes-preview").style.visibility = visible ? "visible" : "hidden";
    }
    
}