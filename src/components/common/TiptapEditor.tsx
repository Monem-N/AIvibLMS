import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Box, Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import './TiptapEditor.css';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  FormatClear,
  Undo,
  Redo,
  Title,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from '@mui/icons-material';

// Define the props for the TiptapEditor component
interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
}

// Define the CSS for the editor
const editorStyles = {
  '.ProseMirror': {
    padding: '16px',
    minHeight: '300px',
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
    '& p': {
      margin: '0 0 16px 0',
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      margin: '24px 0 16px 0',
    },
    '& ul, & ol': {
      padding: '0 0 0 24px',
      margin: '16px 0',
    },
    '& blockquote': {
      borderLeft: '4px solid #ddd',
      padding: '0 0 0 16px',
      margin: '16px 0',
    },
    '& code': {
      backgroundColor: '#f5f5f5',
      padding: '2px 4px',
      borderRadius: '4px',
    },
    '& pre': {
      backgroundColor: '#f5f5f5',
      padding: '16px',
      borderRadius: '4px',
      margin: '16px 0',
      '& code': {
        backgroundColor: 'transparent',
        padding: 0,
      },
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& a': {
      color: '#1976d2',
      textDecoration: 'underline',
    },
  },
};

// Define the MenuButton component for the toolbar
interface MenuButtonProps {
  title: string;
  icon: React.ReactNode;
  action: () => void;
  isActive?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, icon, action, isActive }) => (
  <Tooltip title={title}>
    <IconButton
      size="small"
      onClick={action}
      color={isActive ? 'primary' : 'default'}
      sx={{ mx: 0.5 }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

// Define the TiptapEditor component
const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing...',
  editable = true,
}) => {
  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update content when the prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Handle image upload
  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Handle link addition
  const addLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Editor Toolbar */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          mb: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* Text Formatting */}
        <Box sx={{ display: 'flex', mr: 1 }}>
          <MenuButton
            title="Bold"
            icon={<FormatBold fontSize="small" />}
            action={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          />
          <MenuButton
            title="Italic"
            icon={<FormatItalic fontSize="small" />}
            action={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Headings */}
        <Box sx={{ display: 'flex', mr: 1 }}>
          <MenuButton
            title="Heading 1"
            icon={<Typography variant="subtitle2">H1</Typography>}
            action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
          />
          <MenuButton
            title="Heading 2"
            icon={<Typography variant="subtitle2">H2</Typography>}
            action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
          />
          <MenuButton
            title="Heading 3"
            icon={<Typography variant="subtitle2">H3</Typography>}
            action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Lists */}
        <Box sx={{ display: 'flex', mr: 1 }}>
          <MenuButton
            title="Bullet List"
            icon={<FormatListBulleted fontSize="small" />}
            action={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          />
          <MenuButton
            title="Numbered List"
            icon={<FormatListNumbered fontSize="small" />}
            action={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Block Formatting */}
        <Box sx={{ display: 'flex', mr: 1 }}>
          <MenuButton
            title="Blockquote"
            icon={<FormatQuote fontSize="small" />}
            action={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
          />
          <MenuButton
            title="Code Block"
            icon={<Code fontSize="small" />}
            action={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Media */}
        <Box sx={{ display: 'flex', mr: 1 }}>
          <MenuButton
            title="Add Link"
            icon={<LinkIcon fontSize="small" />}
            action={addLink}
            isActive={editor.isActive('link')}
          />
          <MenuButton
            title="Add Image"
            icon={<ImageIcon fontSize="small" />}
            action={addImage}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Utilities */}
        <Box sx={{ display: 'flex', mr: 1 }}>
          <MenuButton
            title="Clear Formatting"
            icon={<FormatClear fontSize="small" />}
            action={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          />
          <MenuButton
            title="Undo"
            icon={<Undo fontSize="small" />}
            action={() => editor.chain().focus().undo().run()}
          />
          <MenuButton
            title="Redo"
            icon={<Redo fontSize="small" />}
            action={() => editor.chain().focus().redo().run()}
          />
        </Box>
      </Paper>

      {/* Bubble Menu (appears when text is selected) */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ editor, view, state, oldState, from, to }) => {
            // Only show the bubble menu when text is selected
            return from !== to;
          }}
        >
          <Paper sx={{ display: 'flex', p: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive('bold') ? 'primary' : 'default'}
            >
              <FormatBold fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive('italic') ? 'primary' : 'default'}
            >
              <FormatItalic fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={addLink}
              color={editor.isActive('link') ? 'primary' : 'default'}
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Paper>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <Paper
        elevation={1}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          '& .ProseMirror': editorStyles['.ProseMirror'],
        }}
      >
        <EditorContent editor={editor} />
      </Paper>
    </Box>
  );
};

export default TiptapEditor;
