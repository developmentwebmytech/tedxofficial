'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export default function TipTapEditor({ onChange }: Props) {
  const [isClient, setIsClient] = useState(false);



  useEffect(() => {
    // Ensure this runs only on the client
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write your message.</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500',
      },
    },
    // Important for SSR environments
    immediatelyRender: false,
  });

  if (!isClient || !editor) {
    return null; // Or a fallback like <div>Loading editor...</div>
  }

  return (
    <div className="bg-white">
      <EditorContent editor={editor} />
    </div>
  );
}


