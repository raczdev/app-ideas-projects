import { useEffect, useState } from "react";
import { Container, ModalNewNoteContainer, ModalEditContainer } from "./style";
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
    status: Status;
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
  const [noteStatus, setNoteStatus] = useState<Status | null>(null);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note>({
    id: 0,
    title: '',
    status: { value: 'To Do', label: 'To Do' },
    createdAt: new Date(),
  });
  const [search, setSearch] = useState("");

  // Salvando as notas no localStorage quando houver alteração
  useEffect(() => {
    if (note.length > 0) {
      localStorage.setItem('notes', JSON.stringify(note));
    }
  }, [note]);

  // Função para editar uma nota
  const handleEditNote = (value: Note) => {
    setNote(prevNotes => prevNotes.map(n => 
      n.id === value.id ? { ...n, title: value.title, status: value.status } : n
    ));
    setIsEditNoteOpen(false);
  };

  // Função para criar uma nova nota
  const handleCreateNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteTitle.trim() === "" || !noteStatus) {
      alert("Please fill in all the fields");
      return;
    }
    const newNote: Note = {
      id: Date.now(), // Gerando ID único baseado no timestamp
      title: noteTitle,
      status: noteStatus,
      createdAt: new Date(),
    };
    setNote((prev) => [...prev, newNote]);
    setNoteTitle("");
    setNoteStatus(null);
    setIsNewNoteOpen(false);
  };

  // Função para excluir uma nota
  const handleDeleteNote = (id: number) => {
    const filteredNotes = note.filter((n) => n.id !== id);
    setNote(filteredNotes);
  };

  // Atualiza o status da nova nota
  const selectOnChange = (value: Status | null) => {
    setNoteStatus(value);
  };

  // Atualiza o status na edição da nota
  const selectOnChangeEdit = (value: Status | null) => {
    setNoteToEdit({...noteToEdit, status: value as Status });
  };

  // Abre o modal para editar uma nota existente
  const handleOpenEditNote = (note: Note) => {
    if (!note.status) {
      note.status = { value: 'To Do', label: 'To Do' };
    }
    setNoteToEdit(note);
    setIsEditNoteOpen(true);
  };

  // Filtrando as notas de acordo com a busca
  const filteredNotes = note.filter((n) => {
    if (search === "") return n;
    return n.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container>
      {/* Modal para criar nova nota */}
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
            value={noteStatus}
          />
          <button type="submit">Submit</button>
        </ModalNewNoteContainer>
      </Modal>

      {/* Modal para editar nota */}
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
          <input
            type="text"
            placeholder={noteToEdit.title}
            value={noteToEdit.title}
            onChange={(e) => setNoteToEdit({ ...noteToEdit, title: e.target.value })}
          />
          <Select
            options={options}
            value={noteToEdit.status ? { value: noteToEdit.status.value, label: noteToEdit.status.label } : null}
            onChange={selectOnChangeEdit}
          />
          <button type="button" onClick={() => handleEditNote(noteToEdit)}>Edit</button>
        </ModalEditContainer>
      </Modal>

      {/* Cabeçalho da aplicação */}
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
              <input
                type="text"
                placeholder="Type the title to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Lista de notas */}
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
            {filteredNotes.map((n) => (
              <tr key={n.id}>
                <td>{n.title}</td>
                <td>{new Intl.DateTimeFormat("pt-US", {}).format(new Date(n.createdAt))}</td>
                <td>{n.status.label}</td>
                <td className="flex space-evenly">
                  <span className="position-relative tooltip">
                    <VscEdit className="icon pointer" onClick={() => handleOpenEditNote(n)} />
                    <span className="tooltiptext">Edit</span>
                  </span>
                  <span className="position-relative tooltip">
                    <VscChromeClose className="icon pointer" onClick={() => handleDeleteNote(n.id)} />
                    <span className="tooltiptext">Delete</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Container>
  );
}
