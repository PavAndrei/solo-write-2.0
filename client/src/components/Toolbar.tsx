import { useEditorState, type Editor } from '@tiptap/react';
import { ToolbarButton } from './ToolbarButton';
import {
  FaBold,
  FaItalic,
  FaParagraph,
  FaRegFileCode,
  FaStrikethrough,
  FaCode,
  FaRulerHorizontal,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';
import {
  MdOutlineClear,
  MdCleaningServices,
  MdFormatListBulletedAdd,
  MdOutlineWrapText,
} from 'react-icons/md';
import { BsTypeH1, BsTypeH2, BsTypeH3, BsTypeH4, BsTypeH5, BsTypeH6 } from 'react-icons/bs';
import { GoListOrdered } from 'react-icons/go';
import { TbBlockquote } from 'react-icons/tb';

export const Toolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold'),
        canBold: ctx.editor.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor.isActive('italic'),
        canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor.isActive('strike'),
        canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor.isActive('code'),
        canCode: ctx.editor.can().chain().focus().toggleCode().run(),
        canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
        isParagraph: ctx.editor.isActive('paragraph'),
        isHeading1: ctx.editor.isActive('heading', { level: 1 }),
        isHeading2: ctx.editor.isActive('heading', { level: 2 }),
        isHeading3: ctx.editor.isActive('heading', { level: 3 }),
        isHeading4: ctx.editor.isActive('heading', { level: 4 }),
        isHeading5: ctx.editor.isActive('heading', { level: 5 }),
        isHeading6: ctx.editor.isActive('heading', { level: 6 }),
        isBulletList: ctx.editor.isActive('bulletList'),
        isOrderedList: ctx.editor.isActive('orderedList'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isBlockquote: ctx.editor.isActive('blockquote'),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mb-2.5 md:flex-row md:gap-10 ">
      <div className="flex gap-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          isActive={editorState.isBold}
          message="Bold"
          tooltipSelector="bold-btn"
        >
          <FaBold />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          isActive={editorState.isItalic}
          message="Italic"
          tooltipSelector="italic-btn"
        >
          <FaItalic />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          isActive={editorState.isStrike}
          message="Strike"
          tooltipSelector="strike-btn"
        >
          <FaStrikethrough />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          isActive={editorState.isCode}
          message="Code"
          tooltipSelector="code-btn"
        >
          <FaRegFileCode />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          message="Clear marks"
          tooltipSelector="clear-marks-btn"
        >
          <MdOutlineClear />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().clearNodes().run()}
          message="Clear nodes"
          tooltipSelector="clear-nodes-btn"
        >
          <MdCleaningServices />
        </ToolbarButton>
      </div>

      <div className="flex gap-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          message="Paragraph"
          tooltipSelector="paragraph-btn"
          isActive={editorState.isParagraph}
        >
          <FaParagraph />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          message="Heading-1"
          tooltipSelector="heading-1-btn"
          isActive={editorState.isHeading1}
        >
          <BsTypeH1 />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          message="Heading-2"
          tooltipSelector="heading-2-btn"
          isActive={editorState.isHeading2}
        >
          <BsTypeH2 />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          message="Heading-3"
          tooltipSelector="heading-3-btn"
          isActive={editorState.isHeading3}
        >
          <BsTypeH3 />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          message="Heading-4"
          tooltipSelector="heading-4-btn"
          isActive={editorState.isHeading4}
        >
          <BsTypeH4 />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          message="Heading-5"
          tooltipSelector="heading-5-btn"
          isActive={editorState.isHeading5}
        >
          <BsTypeH5 />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          message="Heading-6"
          tooltipSelector="heading-6-btn"
          isActive={editorState.isHeading6}
        >
          <BsTypeH6 />
        </ToolbarButton>
      </div>

      <div className="flex gap-1.5 flex-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editorState.isBulletList}
          message="Bullet list"
          tooltipSelector="bullet-list-btn"
        >
          <MdFormatListBulletedAdd />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editorState.isOrderedList}
          message="Ordered list"
          tooltipSelector="ordered-list-btn"
        >
          <GoListOrdered />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editorState.isCodeBlock}
          message="Unordered list"
          tooltipSelector="unordered-list-btn"
        >
          <FaCode />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editorState.isBlockquote}
          message="Blockquote"
          tooltipSelector="blockquote-list-btn"
        >
          <TbBlockquote />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          message="Horizontal rule"
          tooltipSelector="horizontal-rule-btn"
        >
          <FaRulerHorizontal />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
          message="Hard break"
          tooltipSelector="hard-break-btn"
        >
          <MdOutlineWrapText />
        </ToolbarButton>

        <div className="flex gap-1.5 ml-auto mr-0">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            message="Undo"
            tooltipSelector="undo-btn"
            disabled={!editorState.canUndo}
          >
            <FaUndo />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            message="Redo"
            tooltipSelector="redo-btn"
            disabled={!editorState.canRedo}
          >
            <FaRedo />
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};
