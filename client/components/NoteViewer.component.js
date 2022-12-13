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

    return(
        <>
            {notes.length === 0 && (
                <div className="bg-[#1f2024] mt-5 mb-10 p-8 py-7 w-full rounded">
                    <h1 className="text-2xl font-bold text-center">No notes found!</h1>
                </div>
            )}

            {notes.length > 0 && (
                <div
                    className="notes-dw gap-2 grid max-lg:grid-cols-1 w-full lg:grid-cols-3 h-full flex justify-between mt-5 mb-20">
                    {notes.map((note, index) => (
                        <div key={index} className="bg-[#1f2024] p-8 py-7 rounded">
                            <div className="flex relative">
                                <h1 className="">Note:</h1>

                                <div className="absolute right-0">
                                    <button disabled={true} onClick={() => editNote(index)}
                                            className="disabled:bg-opacity-50 disabled:cursor-not-allowed mr-2 px-4 bg-green-600 p-1 font-bold rounded">Edit
                                    </button>
                                    <button onClick={() => deleteNote(index)}
                                            className="bg-red-500 px-3 p-1 font-bold rounded">Delete
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
