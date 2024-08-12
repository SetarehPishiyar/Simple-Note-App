export default class notesView{
    constructor(root, handlers){
        this.root = root;
        const { addNote , updateNote, previewNote} = handlers;
        this.addNote = addNote;
        this.updateNote = updateNote;
        this.previewNote = previewNote;

        this.root.innerHTML = `
        <div class="notes-navbar">
            <div class="app-logo">NOTE APP</div>
            <div class="notes-list">
            
            <div class="notes-list-item" noteId="">
                    <div class="note-header">
                        <button class="icon-btn" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                        <button class="icon-btn" class="edit-btn"><i class="fas fa-edit"></i></button>
                    </div>
                    <div class="note-title">
                        Sample title
                    </div>
                    <div class="note-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.
                    </div>
                    <div class="note-modified-date">Monday 1:46 PM</div>
                </div>

                
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
        })
    }

    #createListItemHTML(id, title, body, modified){
        return `
                <div class="notes-list-item" noteId=${id}>
                    <div class="note-header">
                        <button class="icon-btn" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                        <button class="icon-btn" class="edit-btn"><i class="fas fa-edit"></i></button>
                    </div>
                    <div class="note-title"> ${title} </div>
                    <div class="note-body"> ${body} </div>
                    <div class="note-modified-date">${modified.toLocaleString("en", {dataStyle:"full", timeStyle:"short"})}</div>
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
                this.previewNote(noteItem.attributes.noteid.value);
            });
        });
    }
    
}



        // <div class="notes-navbar">
        //     <div class="app-logo">NOTE APP</div>
        //     <div class="notes-list">
        //         <div class="notes-list-item notes-list-item-selected">
        //             <div class="note-header">
        //                 <button class="icon-btn"><i class="fas fa-trash-alt"></i></button>
        //                 <button class="icon-btn"><i class="fas fa-edit"></i></button>
        //             </div>
        //             <div class="note-title">
        //                 Sample title
        //             </div>
        //             <div class="note-body">
        //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi numquam, a voluptate.
        //             </div>
        //             <div class="note-modified-date">Monday 1:46 PM</div>
        //         </div>
        //     </div>
        //     <button class="add-notes">
        //         <i class="fas fa-pencil-alt"></i>
        //         Add Note</button>
        // </div>
        // <div class="notes-preview">
        //     <input type="text" class="note-title-edit" placeholder="Write your title...">
        //     <textarea name="" class="note-body-edit" placeholder="Write your note..."></textarea>
        // </div>