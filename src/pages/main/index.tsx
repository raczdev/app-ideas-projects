import { useEffect, useState } from "react";
import { Container, ModalContainer } from "./style";
import checkImg from "../../assets/check.svg";
import closeImg from "../../assets/close.svg";
import { VscNotebook, VscSearch } from "react-icons/vsc";
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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(note))
  }, [note])

  const handleCreateNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteTitle !== "") {
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
      alert("insert a title");
    }
    setNoteTitle("");
    setIsOpen(false);
  };

  const handleDeleteNote = (id: number) => {
    const filterNote = note.filter((n) => n.id !== id);

    setNote([...filterNote]);
  };

  const selectOnChange = (value: any) => {
    setNoteStatus(value);
  };

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          className="react-modal-close"
          onClick={() => setIsOpen(false)}
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <ModalContainer onSubmit={handleCreateNewNote}>
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
        </ModalContainer>
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
              Click an existing note to edit or delete.
            </p>
          </div>
          <div className="header-content--action">
            <div className="my-notes">
              <VscNotebook className="icon" />
              <h3>My notes</h3>
              <button type="button" onClick={() => setIsOpen(true)}>
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
                    {new Intl.DateTimeFormat("en-US", {}).format(
                      new Date(n.createdAt)
                    )}
                  </td>
                  <td>{n.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </Container>
  );
}
