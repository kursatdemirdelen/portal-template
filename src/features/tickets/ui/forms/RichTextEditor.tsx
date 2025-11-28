import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Heading2Icon,
  QuoteIcon,
  Undo2Icon,
  Redo2Icon,
} from "lucide-react";
import { Button, Space } from "antd";
import { backgrounds, borderColors, colors } from "@/shared/styles";

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

// ToolbarButton component defined at module level
function ToolbarButton({
  onClick,
  active,
  children,
  disabled,
}: ToolbarButtonProps) {
  return (
    <Button
      size="small"
      type={active ? "primary" : "default"}
      onClick={onClick}
      disabled={disabled}
      icon={children}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Açıklama yazın...",
  minHeight = 200,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `min-height: ${minHeight}px; padding: 12px; outline: none;`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      style={{
        border: `1px solid ${borderColors.neutral}`,
        borderRadius: "6px",
        overflow: "hidden",
        background: backgrounds.card,
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          borderBottom: `1px solid ${borderColors.neutral}`,
          padding: "8px",
          background: backgrounds.neutral100,
        }}
      >
        <Space size={4} wrap>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <BoldIcon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <ItalicIcon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2Icon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <ListIcon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrderedIcon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <QuoteIcon size={16} />
          </ToolbarButton>

          <div
            style={{
              width: 1,
              height: 24,
              background: borderColors.neutral,
              margin: "0 4px",
            }}
          />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2Icon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2Icon size={16} />
          </ToolbarButton>
        </Space>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      />

      <style>{`
        .ProseMirror {
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: ${colors.textMuted};
          pointer-events: none;
          height: 0;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.5em 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }

        .ProseMirror blockquote {
          border-left: 3px solid ${borderColors.light};
          padding-left: 1em;
          margin: 0.5em 0;
          color: ${colors.textSecondary};
        }

        .ProseMirror strong {
          font-weight: 600;
        }

        .ProseMirror em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};
