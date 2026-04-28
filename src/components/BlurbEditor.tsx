import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button, Space, theme as antdTheme } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

interface BlurbEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const isEmptyHtml = (html: string) => !html || html === '<p></p>';

const BlurbEditor: React.FC<BlurbEditorProps> = ({ value, onChange }) => {
  const { token } = antdTheme.useToken();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        code: false,
        strike: false,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(isEmptyHtml(html) ? '' : html);
    },
  });

  // Sync external value changes (e.g. Load example, Reset) back into editor.
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incoming = value || '';
    if (current === incoming) return;
    if (isEmptyHtml(current) && incoming === '') return;
    editor.commands.setContent(incoming, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return null;

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? token.colorPrimaryBg : 'transparent',
    color: active ? token.colorPrimary : token.colorTextSecondary,
  });

  return (
    <div
      style={{
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 6px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Space size={2}>
          <Button
            size="small"
            type="text"
            icon={<BoldOutlined />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            style={btnStyle(editor.isActive('bold'))}
            aria-label="Bold"
          />
          <Button
            size="small"
            type="text"
            icon={<ItalicOutlined />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            style={btnStyle(editor.isActive('italic'))}
            aria-label="Italic"
          />
          <Button
            size="small"
            type="text"
            icon={<UnorderedListOutlined />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            style={btnStyle(editor.isActive('bulletList'))}
            aria-label="Bullet list"
          />
        </Space>
      </div>
      <div style={{ padding: '8px 11px', minHeight: 80, fontSize: 14, lineHeight: 1.5, cursor: 'text' }}>
        <EditorContent editor={editor} />
      </div>
      <style>{`
        .ProseMirror {
          outline: none;
          min-height: 64px;
        }
        .ProseMirror p { margin: 0 0 6px; }
        .ProseMirror p:last-child { margin-bottom: 0; }
        .ProseMirror ul {
          padding-left: 20px;
          list-style: disc;
          margin: 0 0 6px;
        }
        .ProseMirror li { margin-bottom: 2px; }
        .ProseMirror li > p { margin: 0; }
        .ProseMirror strong { font-weight: 700; }
        .ProseMirror em { font-style: italic; }
      `}</style>
    </div>
  );
};

export default BlurbEditor;
