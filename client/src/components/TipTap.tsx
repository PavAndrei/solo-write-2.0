import { FC } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './Toolbar';
import Placeholder from '@tiptap/extension-placeholder';

interface TipTapProps {
  onChange: (text: string) => void;
  error?: string;
}

export const TipTap: FC<TipTapProps> = ({ onChange, error }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: 'Start typing here...',
        emptyEditorClass: 'is-editor-empty',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'bg-gray-200 outline-0 border rounded-md h-9 p-8 text-sm md:text-base focus:border-gray-500 border-gray-400 focus:border-2 transition-all duration-300 ease-in-out text-gray-900 z-0 min-h-[150px] editor h-full',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2 justify-stretch min-h-[250px]">
      <span className="italic text-base md:text-lg font-medium">Share your thoughts below</span>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="editor-wrapper" />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
