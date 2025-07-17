import { FC, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './Toolbar';

interface TipTapProps {
  onChange: (text: string) => void;
}

export const TipTap: FC<TipTapProps> = ({ onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
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
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
