import styles from '@/styles/richText.module.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  ButtonGroup,
  Button,
  Box,
  Wrap,
  WrapItem,
  Text,
} from '@chakra-ui/react';
import Underline from '@tiptap/extension-underline';
import { useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <>
      <Wrap mb={2}>
        <WrapItem>
          {/* Bold, Italics, Underline, Strikethorugh */}
          <ButtonGroup isAttached>
            <Button
              variant={editor.isActive('bold') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Text fontWeight="bold">B</Text>
            </Button>
            <Button
              variant={editor.isActive('italic') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Text as="i">I</Text>
            </Button>
            <Button
              variant={editor.isActive('underline') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <Text textDecoration="underline">U</Text>
            </Button>
            <Button
              variant={editor.isActive('strike') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Text textDecoration="line-through">S</Text>
            </Button>
          </ButtonGroup>
        </WrapItem>

        {/* H1, H2, H3 */}
        <WrapItem>
          <ButtonGroup isAttached>
            <Button
              variant={
                editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Text>
                H<Text as="sub">1</Text>
              </Text>
            </Button>
            <Button
              variant={
                editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Text>
                H<Text as="sub">2</Text>
              </Text>
            </Button>
            <Button
              variant={
                editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Text>
                H<Text as="sub">3</Text>
              </Text>
            </Button>
          </ButtonGroup>
        </WrapItem>

        {/* Bullet List, Number List */}
        <WrapItem>
          <ButtonGroup isAttached>
            <Button
              variant={editor.isActive('bulletList') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <Text fontSize="lg">•</Text>
            </Button>
            <Button
              variant={editor.isActive('orderedList') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <Text>1.</Text>
            </Button>
          </ButtonGroup>
        </WrapItem>

        {/* Code, Code Block */}
        <WrapItem>
          <ButtonGroup isAttached>
            <Button
              variant={editor.isActive('code') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <Text fontFamily="mono" fontSize="sm">
                code
              </Text>
            </Button>
            <Button
              variant={editor.isActive('codeBlock') ? 'solid' : 'outline'}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Text fontFamily="mono" fontSize="sm">
                {'{ };'}
              </Text>
            </Button>
          </ButtonGroup>
        </WrapItem>
      </Wrap>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        minHeight="200px"
        maxHeight="600px"
        className={styles.richText}
        sx={{
          '.ProseMirror': {
            outline: 'none',
          },
          resize: 'vertical',
          overflow: 'auto',
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </>
  );
};

export default RichTextEditor;
