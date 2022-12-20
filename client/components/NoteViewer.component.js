import {useDispatch, useSelector} from 'react-redux';
import {Remarkable} from 'remarkable';
import hljs from 'highlight.js';

import {setNotes} from '../stores/Note';

const md = new Remarkable({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) {
            }
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {
        }

        return '';
    }
});

function NoteViewerComponent() {
    const dispatch = useDispatch();
    const {notes} = useSelector(state => state.note);

    const editNote = (index) => {
    }

    const deleteNote = (index) => {
        const newNotes = notes.filter((note, i) => i !== index);
        dispatch(setNotes(newNotes));
        if (newNotes.length === 0) return localStorage.removeItem('notes');
        localStorage.setItem('notes', JSON.stringify(newNotes));
    }

    const download = (note) => {
        const blob = new Blob([note.content], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "note.md";
        link.href = url;
        link.click();
    }

    return(
        <>
            {notes.length === 0 && (
                <div className="bg-[#1f2024] mt-5 mb-10 p-8 py-7 w-full rounded">
                    <h1 className="text-2xl font-bold text-center">No notes found!</h1>
                </div>
            )}

            {notes.length > 0 && (
                <div
                    className="notes-dw gap-2 grid max-lg:grid-cols-1 w-full lg:grid-cols-3 flex justify-between mt-5">
                    {notes.map((note, index) => (
                        <div key={index} className="bg-[#1f2024] h-full p-8 py-7 rounded mb-56">
                            <div className="flex relative">
                                <h1 className="">Note:</h1>

                                <div className="absolute right-0">
                                    <button disabled={true} onClick={() => ''} // editNote(index)
                                            className="disabled:bg-opacity-50 disabled:cursor-not-allowed mr-2 px-4 bg-green-600 p-1 font-bold rounded">Edit
                                    </button>

                                    <button onClick={() => deleteNote(index)}
                                            className="bg-red-500 mr-2 px-3 p-1 font-bold rounded">Delete
                                    </button>

                                    <button type="button"
                                            onClick={() => download(note)}
                                            className="bg-blue-500 px-3 bg-green-600 p-1 font-bold rounded">
                                        Download
                                        {/*
                                        <svg aria-hidden="true" className="flex justify-center items-center w-3.5 h-3.5" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        */}
                                        <span className="sr-only">Download</span>
                                    </button>
                                </div>
                            </div>

                            <div className="break-words mt-5"
                                 dangerouslySetInnerHTML={{__html: md.render(note.content)}}></div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default NoteViewerComponent;
