import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import type { Json } from "../../supabase/supabase";

interface Prop {
    content: JSONContent | Json;
}

export const ProductDescription = ({ content }: Prop) => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: content as JSONContent,
        editable: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none text-slate-600 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-cyan-800 prose-strong:text-slate-900 sm:prose-base",
            },
        },
    });




    return (
        <section className="mt-12 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.28)] sm:mt-16 sm:p-8 lg:p-10">
            <div className="mb-6 border-b border-slate-100 pb-5 sm:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">Conoce los detalles</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Descripción del producto</h2>
            </div>
            <EditorContent editor={editor} />
        </section>
    )
}
