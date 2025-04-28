import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * QuillEditor Component
 *
 * A wrapper around ReactQuill that uses the newer React ref API
 * to avoid the deprecated findDOMNode warning.
 */
interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules?: any;
  [key: string]: any; // Allow any other props
}

const QuillEditor = forwardRef<any, QuillEditorProps>((props, ref) => {
  const quillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
    // Add any other methods you need to expose
  }));

  return <ReactQuill ref={quillRef} {...props} />;
});

export default QuillEditor;
