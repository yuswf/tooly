import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MarkdownEditorComponent from './MarkdownEditor.component';
import MarkdownViewerComponent from './MarkdownViewer.component';
import NoteViewerComponent from './NoteViewer.component';

function NotesComponent() {
    const [component, setComponent] = useState(<MarkdownEditorComponent/>);
    const [isEditor, setIsEditor] = useState(true);
    const {note} = useSelector(state => state.note);

    const handleComponent = () => {
        if (note.length === 0) return;

        if (isEditor) {
            setComponent(<MarkdownViewerComponent/>);
            setIsEditor(false);
        } else {
            setComponent(<MarkdownEditorComponent/>);
            setIsEditor(true);
        }
    }

    return (
        <div className="notes-c">
            <ul className="flex flex-wrap gap-3 justify-center items-center mb-6">
                <li onClick={() => handleComponent()}
                    className={`${isEditor ? 'bg-[#093a5b]' : 'bg-[#1f2024]'} transition-all ease rounded p-2.5 font-bold text-sm cursor-pointer`}>Markdown
                </li>
                <li onClick={() => handleComponent()}
                    className={`${isEditor ? 'bg-[#1f2024]' : 'bg-[#093a5b]'} transition-all ease ${note.length > 0 ? '' : 'bg-opacity-50 cursor-not-allowed'} rounded p-2.5 font-bold text-sm cursor-pointer`}>Preview
                </li>
            </ul>

            <div className="lg:flex lg:justify-between gap-2">
                {component}
            </div>

            <NoteViewerComponent />
        </div>
    )
}

export default NotesComponent;
