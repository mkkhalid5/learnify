"use client";

import { useEffect, useRef, useState } from "react";
import { 
    FaBold, 
    FaItalic, 
    FaUnderline, 
    FaListUl, 
    FaListOl, 
    FaHeading, 
    FaEraser 
} from "react-icons/fa6";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export default function RichTextEditor({ 
    value, 
    onChange, 
    placeholder = "Start writing...", 
    error 
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const executeCommand = (command: string, arg: string = "") => {
        if (typeof document !== "undefined") {
            document.execCommand(command, false, arg);
            handleInput();
        }
    };

    if (!isMounted) {
        return (
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-4">
                <div className="h-40 animate-pulse bg-slate-100" />
            </div>
        );
    }

    return (
        <div className="w-full space-y-2">
            <style dangerouslySetInnerHTML={{__html: `
                .rich-editor ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin-bottom: 0.5rem; }
                .rich-editor ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin-bottom: 0.5rem; }
                .rich-editor h3 { font-size: 1.25rem !important; font-weight: 600 !important; margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
                .rich-editor p { margin-bottom: 0.5rem !important; }
                .rich-editor:empty::before { content: attr(data-placeholder); color: #94a3b8; }
            `}} />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-sky-500 transition">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 bg-slate-50 p-2">
                    <button
                        type="button"
                        onClick={() => executeCommand("bold")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Bold"
                    >
                        <FaBold size={14} />
                    </button>
                    <button
                        type="button"
                        onClick={() => executeCommand("italic")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Italic"
                    >
                        <FaItalic size={14} />
                    </button>
                    <button
                        type="button"
                        onClick={() => executeCommand("underline")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Underline"
                    >
                        <FaUnderline size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                        type="button"
                        onClick={() => executeCommand("insertUnorderedList")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Bullet List"
                    >
                        <FaListUl size={14} />
                    </button>
                    <button
                        type="button"
                        onClick={() => executeCommand("insertOrderedList")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Numbered List"
                    >
                        <FaListOl size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                        type="button"
                        onClick={() => executeCommand("formatBlock", "h3")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Heading"
                    >
                        <FaHeading size={14} />
                    </button>
                    <button
                        type="button"
                        onClick={() => executeCommand("removeFormat")}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition"
                        title="Clear Formatting"
                    >
                        <FaEraser size={14} />
                    </button>
                </div>

                {/* Editor area */}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    onBlur={handleInput}
                    data-placeholder={placeholder}
                    className="rich-editor min-h-[200px] p-4 text-sm text-slate-950 outline-none overflow-y-auto focus:outline-none"
                    style={{ minHeight: "200px" }}
                />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
        </div>
    );
}
