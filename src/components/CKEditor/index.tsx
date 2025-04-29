import "./index.scss";
import "ckeditor5/ckeditor5.css";

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  useImperativeHandle,
  useRef,
} from "react";

export type CKEditorRef = {
  focus: (moveToEnd?: boolean) => void;
};

interface CKEditorProps {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onSlashInput?: (position: { top: number; left: number }) => void;
}

export interface EmojiData {
  src: string;
  alt: string;
}

const keyCodes = {
  delete: 46,
  backspace: 8,
  slash: 191,
};

const Index: ForwardRefRenderFunction<CKEditorRef, CKEditorProps> = (
  { value, placeholder, onChange, onEnter, onSlashInput },
  ref,
) => {
  const ckEditor = useRef<ClassicEditor | null>(null);

  const focus = (moveToEnd = false) => {
    const editor = ckEditor.current;

    if (editor) {
      const model = editor.model;
      const view = editor.editing.view;
      const root = model.document.getRoot();
      if (moveToEnd && root) {
        const range = model.createRange(model.createPositionAt(root, "end"));

        model.change((writer) => {
          writer.setSelection(range);
        });
      }
      view.focus();
    }
  };

  const getCursorPosition = (editor: ClassicEditor) => {
    try {
      // 获取编辑器DOM元素
      const editorElement = editor.ui.getEditableElement();
      if (!editorElement) return { top: 0, left: 0 };

      // 获取DOM选区
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        // 如果没有选区，返回编辑器顶部位置
        const rect = editorElement.getBoundingClientRect();
        return { top: rect.top, left: rect.left };
      }

      // 创建一个临时范围，用于获取光标准确位置
      const range = domSelection.getRangeAt(0);

      // 克隆范围以免修改原始选区
      const clonedRange = range.cloneRange();

      // 创建一个零宽度的内容节点
      const span = document.createElement("span");
      span.appendChild(document.createTextNode("\u200B")); // 零宽度空格

      // 插入临时节点到范围
      clonedRange.insertNode(span);

      // 获取节点位置
      const rect = span.getBoundingClientRect();

      // 移除临时节点
      if (span.parentNode) {
        span.parentNode.removeChild(span);
      }

      // 重新设置选区（以防移除节点影响选区）
      domSelection.removeAllRanges();
      domSelection.addRange(range);

      // 返回光标位置
      return {
        top: rect.top,
        left: rect.left,
      };
    } catch (error) {
      console.error("获取光标位置出错:", error);

      // 回退方案：使用DOM选区的边界矩形
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const range = domSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        return { top: rect.top, left: rect.left };
      }

      return { top: 0, left: 0 };
    }
  };

  const listenKeydown = (editor: ClassicEditor) => {
    editor.editing.view.document.on(
      "keydown",
      (evt, data) => {
        if (data.keyCode === keyCodes.slash) {
          const position = getCursorPosition(editor);
          onSlashInput?.(position);
        }

        if (data.keyCode === 13 && !data.shiftKey) {
          data.preventDefault();
          evt.stop();
          onEnter?.();
          return;
        }
        if (data.keyCode === keyCodes.backspace || data.keyCode === keyCodes.delete) {
          const selection = editor.model.document.selection;
          const hasSelectContent = !editor.model.getSelectedContent(selection).isEmpty;
          const hasEditorContent = Boolean(editor.getData());

          if (!hasEditorContent) {
            return;
          }

          if (hasSelectContent) return;
        }
      },
      { priority: "high" },
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      focus,
    }),
    [],
  );

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        placeholder,
        toolbar: [],
        image: {
          toolbar: [],
          insert: {
            type: "inline",
          },
        },
        plugins: [Essentials, Paragraph],
      }}
      onReady={(editor) => {
        ckEditor.current = editor;
        listenKeydown(editor);
        focus(true);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange?.(data);
      }}
    />
  );
};

export default memo(forwardRef(Index));
