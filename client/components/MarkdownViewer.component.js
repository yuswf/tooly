import {useSelector} from 'react-redux';
import {Remarkable} from 'remarkable';
import hljs from 'highlight.js';

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

function MarkdownViewerComponent() {
    const {note} = useSelector(state => state.note);

    return (
        <div dangerouslySetInnerHTML={{__html: md.render(note)}}
             className="notes-e break-all notes-wv bg-[#1f2024] w-full rounded p-8 py-7"></div>
    )
}

export default MarkdownViewerComponent;
