import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import EmojiPicker from 'emoji-picker-react';

import {setNote, setNotes} from '../stores/Note';

function MarkdownEditor() {
    const dispatch = useDispatch();
    const {note, notes} = useSelector(state => state.note);
    const [openedEmojiTab, setOpenedEmojiTab] = useState(false);

    const addNote = () => {
        if (note.length === 0) return;

        const newNotes = [...notes, {
            content: note,
        }];
        dispatch(setNotes(newNotes));
        dispatch(setNote(''));
        localStorage.setItem('notes', JSON.stringify(newNotes));
    }

    /*
    const onEmojiClick = (event, emojiObject) => {
        setOpenedEmojiTab(false);
        dispatch(setNote(note => `${note}${emojiObject.emoji === undefined ? '' : emojiObject.emoji}`));
    }
    */

    const download = () => {
        const blob = new Blob([note], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "note.md";
        link.href = url;
        link.click();
    }

    return (
        <div
            className="max-lg:mb-2 notes-e bg-[#1f2024] w-full rounded resize-none px-8 w-full rounded">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div
                    className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                    <div className="relative flex items-center space-x-1 sm:pr-4">
                        {/*
                                <button type="button"
                                        className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Attach file</span>
                                </button>
                                <button type="button"
                                        className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Embed map</span>
                                </button>

                        <button type="button"
                                className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Upload image</span>
                        </button>
                        <button type="button"
                                className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Format code</span>
                        </button>
                        */}
                        {/*
                        {openedEmojiTab && <div className="absolute z-10 top-0 left-[78px] w-auto">
                            <div className="overflow-hidden rounded-lg h-72 shadow-lg ring-1 ring-black ring-opacity-5">
                                <EmojiPicker theme="dark" onEmojiClick={onEmojiClick} />

                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">

                                </div>
                            </div>
                        </div>}
                        */}
                        <button type="button"
                                disabled={true}
                                onClick={() => ''} //setOpenedEmojiTab(!openedEmojiTab)
                                className="disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Add emoji</span>
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                        {/*
                                <button type="button"
                                        className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Add list</span>
                                </button>
                                <button type="button"
                                        className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Settings</span>
                                </button>
                                <button type="button"
                                        className="transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Timeline</span>
                                </button>
                                */}
                        <button type="button"
                                disabled={note.length === 0}
                                onClick={note.length > 0 ? download : () => ''}
                                className="disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all ease p-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Download</span>
                        </button>
                    </div>
                </div>
                <button type="button" data-tooltip-target="tooltip-fullscreen"
                        disabled={true}
                        className="disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all ease p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                              clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Full screen</span>
                </button>
                <div id="tooltip-fullscreen" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Show full screen
                    <div className="tooltip-arrow"></div>
                </div>
            </div>

            <div className="px-4 py-2 rounded bg-gray-800">
                        <textarea onChange={(e) => dispatch(setNote(e.target.value))}
                                  value={note}
                                  rows={14}
                                  className="resize-none break-all outline-none py-1 block w-full px-0 text-sm text-white bg-gray-800"
                                  placeholder="Write a note..."/>
            </div>

            <button type="submit"
                    onClick={() => addNote(note)}
                    disabled={note.length === 0}
                    className="mt-5 mr-2 disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all ease-in-out inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded">
                Save
            </button>

            <button type="submit"
                    onClick={() => dispatch(setNote(''))}
                    disabled={note.length === 0}
                    className="mt-5 disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all ease-in-out inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded">
                Clear
            </button>
        </div>
    )
}

export default MarkdownEditor;
