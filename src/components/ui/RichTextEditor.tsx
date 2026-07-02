import { useCallback, useMemo, useState } from 'react'
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
  type Descendant,
  type BaseEditor,
} from 'slate'
import { Slate, Editable, withReact, useSlate, type ReactEditor } from 'slate-react'
import { withHistory, type HistoryEditor } from 'slate-history'

type CustomElement = { type: string; children: CustomText[] }
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const DEFAULT_VALUE: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }]

function isMarkActive(editor: Editor, format: keyof CustomText) {
  const marks = Editor.marks(editor) as Record<string, unknown> | null
  return marks ? marks[format] === true : false
}

function toggleMark(editor: Editor, format: keyof CustomText) {
  if (isMarkActive(editor, format)) Editor.removeMark(editor, format)
  else Editor.addMark(editor, format, true)
}

function isBlockActive(editor: Editor, format: string) {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  )
  return Boolean(match)
}

function toggleBlock(editor: Editor, format: string) {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, { type: format, children: [] })
  }
}

function ToolbarBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={`button is-small ${active ? 'is-primary is-light' : ''}`}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </button>
  )
}

function MarkButton({ format, children }: { format: keyof CustomText; children: React.ReactNode }) {
  const editor = useSlate()
  return (
    <ToolbarBtn active={isMarkActive(editor, format)} onClick={() => toggleMark(editor, format)}>
      {children}
    </ToolbarBtn>
  )
}

function BlockButton({ format, children }: { format: string; children: React.ReactNode }) {
  const editor = useSlate()
  return (
    <ToolbarBtn active={isBlockActive(editor, format)} onClick={() => toggleBlock(editor, format)}>
      {children}
    </ToolbarBtn>
  )
}

function renderElement({ attributes, children, element }: any) {
  switch (element.type) {
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    default:
      return <p {...attributes}>{children}</p>
  }
}

function renderLeaf({ attributes, children, leaf }: any) {
  if (leaf.bold) children = <strong>{children}</strong>
  if (leaf.italic) children = <em>{children}</em>
  if (leaf.underline) children = <u>{children}</u>
  if (leaf.code) children = <code>{children}</code>
  return <span {...attributes}>{children}</span>
}

interface Props {
  initialValue?: Descendant[]
  placeholder?: string
  onChange?: (value: Descendant[]) => void
}

export default function RichTextEditor({ initialValue = DEFAULT_VALUE, placeholder, onChange }: Props) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const handleChange = useCallback(
    (v: Descendant[]) => {
      setValue(v)
      onChange?.(v)
    },
    [onChange]
  )

  return (
    <div className="tx-rte box" style={{ padding: 0 }}>
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <div className="tx-rte-toolbar">
          <div className="buttons has-addons" style={{ margin: 0 }}>
            <MarkButton format="bold">
              <strong>B</strong>
            </MarkButton>
            <MarkButton format="italic">
              <em>I</em>
            </MarkButton>
            <MarkButton format="underline">
              <u>U</u>
            </MarkButton>
            <MarkButton format="code">&lt;/&gt;</MarkButton>
          </div>
          <div className="buttons has-addons" style={{ margin: '0 0 0 0.5rem' }}>
            <BlockButton format="heading-one">H1</BlockButton>
            <BlockButton format="heading-two">H2</BlockButton>
            <BlockButton format="block-quote">❝</BlockButton>
          </div>
          <div className="buttons has-addons" style={{ margin: '0 0 0 0.5rem' }}>
            <BlockButton format="bulleted-list">
              <span className="mdi mdi-format-list-bulleted" />
            </BlockButton>
            <BlockButton format="numbered-list">
              <span className="mdi mdi-format-list-numbered" />
            </BlockButton>
          </div>
        </div>
        <Editable
          className="tx-rte-content content"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          spellCheck
        />
      </Slate>
    </div>
  )
}
