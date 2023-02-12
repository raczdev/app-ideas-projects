import { useEffect, useState } from "react";
import { Container, ModalNewNoteContainer, ModalEditContainer, Tooltip } from "./style";
import checkImg from "../../assets/check.svg";
import closeImg from "../../assets/close.svg";
import { VscNotebook, VscSearch, VscChromeClose, VscEdit } from "react-icons/vsc";
import Modal from "react-modal";
import Select from "react-select";

Modal.setAppElement("#root");

export function NotesApp() {
  interface Status {
    value: string;
    label: string;
  }
  interface Note {
    id: number;
    title: string;
    status: any;
    createdAt: Date;
  }

  const options = [
    { value: "To Do", label: "To Do" },
    { value: "Doing", label: "Doing" },
    { value: "Done", label: "Done" },
  ];
  const [note, setNote] = useState<Note[]>(() => {
    const localData = localStorage.getItem('notes');
    return localData ? JSON.parse(localData) : []
  });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteStatus, setNoteStatus] = useState<Status>();
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note>({
    id: 0,
    title: '',
    status: '',
    createdAt: new Date(),
  }) 
  const [search, setSearch] = useState("")
  const [isDeleteHovered, setIsDeleteHovered] = useState(false)
  const [isEditHovered, setIsEditHovered] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(note))
  }, [note])

  const handleEditNote = (value: Note) => {
    setNote(prevNotes => prevNotes.map(note => {
      if (note.id === value.id) {
        note.title = value.title
        note.status = value.status.value
      }
      return note
    }))

    setIsEditNoteOpen(false)
  }

  const handleCreateNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteTitle !== "" && noteStatus !== undefined) {
      let randomId = Math.random();
      setNote((prev) => [
        ...prev,
        {
          id: randomId,
          title: noteTitle,
          status: noteStatus?.label,
          createdAt: new Date(),
        },
      ]);
    } else {
      alert("fill all the informations");
    }
    setNoteTitle("");
    setIsNewNoteOpen(false);
  };

  const handleDeleteNote = (id: number) => {
    const filterNote = note.filter((n) => n.id !== id);
    setNote([...filterNote]);
  };

  const selectOnChange = (value: any) => {
    setNoteStatus(value);
  };

  const selectOnChangeEdit = (value: any) => {
    setNoteToEdit({...noteToEdit, status: value})
  }

  const handleOpenEditNote = (note: Note) => {
    setIsEditNoteOpen(true)
    setNoteToEdit(note)
  }

  return (
    <Container>
      <Modal
        isOpen={isNewNoteOpen}
        onRequestClose={() => setIsNewNoteOpen(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          className="react-modal-close"
          onClick={() => setIsNewNoteOpen(false)}
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <ModalNewNoteContainer onSubmit={handleCreateNewNote}>
          <h2>New Note</h2>
          <input
            type="text"
            placeholder="Note title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <Select
            options={options}
            placeholder="Status"
            onChange={selectOnChange}
          />
          <button type="submit">Submit</button>
        </ModalNewNoteContainer>
      </Modal>
      <Modal
        isOpen={isEditNoteOpen}
        onRequestClose={() => setIsEditNoteOpen(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          className="react-modal-close"
          onClick={() => setIsEditNoteOpen(false)}
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <ModalEditContainer>          
          <h2>Edit Note</h2>
          <input placeholder={noteToEdit.title} defaultValue={noteToEdit.title} onChange={(e) => setNoteToEdit({...noteToEdit, title: e.target.value})} type="text"/>            
          <Select
            options={options}
            placeholder={noteToEdit.status}
            value={noteToEdit.status}
            onChange={selectOnChangeEdit}
          />
          <button type="button" onClick={() => handleEditNote(noteToEdit)}>Edit</button>          
        </ModalEditContainer>
      </Modal>
      <header>
        <div className="header-content">
          <div className="header-content--title">
            <div className="title-img">
              <img src={checkImg} alt="check" className="check-img" />
              <h1>NotesList</h1>
            </div>
          </div>
          <div className="header-content--explain">
            <p>
              Use this template to track your personal notes.
              <br />
              Click <span className="new-text">+ New</span> to create a new note
              directly on this board.
              <br />
              You can edit or delete an existing note.
            </p>
          </div>
          <div className="header-content--action">
            <div className="my-notes">
              <VscNotebook className="icon" />
              <h3>My notes</h3>
              <button type="button" onClick={() => setIsNewNoteOpen(true)}>
                + New
              </button>
            </div>
            <div className="search-notes">
              <VscSearch className="icon" />
              <input type="text" placeholder="Type the title to search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {note.filter((val) => {
              if (search === "") {
                return val
              } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                return val
              }
              return null
            }).map((n) => {
              return (
                <tr key={n.id}>
                  <td>{n.title}</td>
                  <td>
                    {new Intl.DateTimeFormat("pt-US", {}).format(
                      new Date(n.createdAt)
                    )}
                  </td>
                  <td>{n.status}</td>
                  <td className="flex space-evenly">
                    <span className="position-relative">
                      <VscChromeClose 
                        className="icon pointer" 
                        onClick={() => handleDeleteNote(n.id)} 
                        onMouseEnter={() => setIsDeleteHovered(true)} 
                        onMouseLeave={() => setIsDeleteHovered(false)}
                      />
                      {isDeleteHovered && (
                        <Tooltip>DELETE</Tooltip>
                      )}
                    </span>
                    <span className="position-relative">
                      <VscEdit 
                        className="icon pointer" 
                        onClick={() => handleOpenEditNote(n)} 
                        onMouseEnter={() => setIsEditHovered(true)} 
                        onMouseLeave={() => setIsEditHovered(false)} 
                      />
                      {isEditHovered && (
                        <Tooltip>EDIT</Tooltip>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </Container>
  );
}
