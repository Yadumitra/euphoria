const { useState, useEffect, useRef } = React;

function Notepad() {
  let [show, setShow] = useState("menu");
  let [currNote, setCurrNote] = useState({ id: "", title: "", content: "" });

  let [notes, setNotes] = useState([]);
  useEffect(() => {
    let data = window.localStorage.getItem("notepad");
    setNotes(data === null ? [] : JSON.parse(data));
  }, []);
  useEffect(() => {
    if (notes !== null)
      window.localStorage.setItem("notepad", JSON.stringify(notes));
  }, [notes]);

  function createClickHandler() {
    setCurrNote({ id: guid(), title: "untitled", content: "" });
    setShow("editor");
  }

  function loadNote(note) {
    setCurrNote(note);
    setShow("editor");
  }

  function saveNote(note) {
    let index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) notes[index] = note;
    else notes.push(note);
    setNotes([...notes]);
  }

  function deleteNote(note) {
    let index = notes.findIndex((n) => n.id === note.id);
    notes.splice(index, 1);
    setNotes([...notes]);
  }

  return (
    <div className="notepad">
      <Menu
        show={show === "menu"}
        onCreate={createClickHandler}
        onLoad={() => setShow("files")}
      />
      <Files
        data={notes}
        show={show === "files"}
        onSelect={loadNote}
        onDelete={deleteNote}
        onCancel={() => setShow("menu")}
      />
      <Editor
        show={show === "editor"}
        note={currNote}
        onSave={saveNote}
        onCancel={() => setShow("menu")}
      />
    </div>
  );
}

function Menu(props) {
  const { show, onCreate, onLoad } = props;
  return (
    <div className={"menu " + (show ? "show" : "hide")}>
      <h1>Notepad</h1>
      <button type="button" onClick={onCreate}>
        Create New
      </button>
      <button type="button" onClick={onLoad}>
        My Notes
      </button>
    </div>
  );
}

function Files(props) {
  const { show, data, onSelect, onDelete, onCancel } = props;
  return (
    <div className={"file " + (show ? "show" : "hide")}>
      <div>select your note to load:</div>
      <div className="list">
        <ul>
          {data.map((n) => (
            <li className="flex items-center" key={n.id}>
              <a href="#" onClick={() => onSelect(n)}>
                {n.title}
              </a>
              <button
                type="button"
                className="ml-auto"
                onClick={() => onDelete(n)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <button type="button" className="ml-auto" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function Editor(props) {
  const titlebox = useRef();
  const { show, onSave, onCancel } = props;
  let [note, setNote] = useState({
    id: props.note.id,
    title: props.note.title,
    content: props.note.content
  });

  useEffect(() => {
    setNote({ ...props.note });
  }, [props.note]);
  useEffect(() => {
    titlebox.current.focus();
    titlebox.current.select();
  }, [props.show]);

  return (
    <div className={"editor " + (show ? "show" : "hide")}>
      <input
        type="text"
        placeholder="note title..."
        ref={titlebox}
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <div className="flex">
        <button type="button" className="ml-auto mr-10" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={() => onSave(note)}>
          Save
        </button>
      </div>
    </div>
  );
}

function App() {
  return <Notepad />;
}

ReactDOM.render(<App />, document.getElementById("app"));

// helpers //
function guid(len = 5) {
  let id = "";
  for (let i = 0; i < len; i++) {
    id += Math.floor(Math.random() * 16).toString(16);
  }
  return id;
}
