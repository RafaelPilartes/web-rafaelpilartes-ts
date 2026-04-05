import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  Link2, List, ListOrdered, Quote, Code, Image,
  Eye, EyeOff, Maximize2, Minimize2
} from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  minHeight?: string
}

const toolbarActions = [
  { icon: Bold, label: 'Bold', prefix: '**', suffix: '**' },
  { icon: Italic, label: 'Italic', prefix: '_', suffix: '_' },
  { icon: Heading1, label: 'H1', prefix: '# ', suffix: '' },
  { icon: Heading2, label: 'H2', prefix: '## ', suffix: '' },
  { icon: Heading3, label: 'H3', prefix: '### ', suffix: '' },
  { icon: Quote, label: 'Quote', prefix: '> ', suffix: '' },
  { icon: Code, label: 'Code', prefix: '`', suffix: '`' },
  { icon: Link2, label: 'Link', prefix: '[', suffix: '](url)' },
  { icon: Image, label: 'Image', prefix: '![alt](', suffix: ')' },
  { icon: List, label: 'List', prefix: '- ', suffix: '' },
  { icon: ListOrdered, label: 'Ordered', prefix: '1. ', suffix: '' }
]

export function MarkdownEditor({
  value,
  onChange,
  label,
  placeholder = 'Write your content in Markdown...',
  minHeight = '300px'
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  const insertMarkdown = (prefix: string, suffix: string) => {
    const textarea = document.getElementById('md-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = value.substring(start, end)
    const newText = value.substring(0, start) + prefix + selected + suffix + value.substring(end)
    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length)
    }, 0)
  }

  const containerClass = fullscreen
    ? 'fixed inset-0 z-50 flex flex-col'
    : 'flex flex-col'

  return (
    <div
      className={containerClass}
      style={{
        background: fullscreen ? 'var(--dash-bg)' : undefined,
        borderRadius: fullscreen ? 0 : 'var(--dash-radius)'
      }}
    >
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--dash-text)' }}
        >
          {label}
        </label>
      )}

      <div
        className="dash-card overflow-hidden flex flex-col"
        style={{ flex: fullscreen ? 1 : undefined }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-0.5 px-2 py-1.5 flex-wrap"
          style={{ borderBottom: '1px solid var(--dash-border)', background: 'var(--dash-surface)' }}
        >
          {toolbarActions.map(action => (
            <button
              key={action.label}
              onClick={() => insertMarkdown(action.prefix, action.suffix)}
              className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
              title={action.label}
              type="button"
            >
              <action.icon size={14} />
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => setShowPreview(v => !v)}
            className="dash-btn dash-btn-ghost dash-btn-sm"
            type="button"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            <span className="text-xs">{showPreview ? 'Hide' : 'Preview'}</span>
          </button>
          <button
            onClick={() => setFullscreen(v => !v)}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
            type="button"
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>

        {/* Editor + Preview */}
        <div className="flex flex-1" style={{ minHeight: fullscreen ? 0 : minHeight }}>
          <textarea
            id="md-editor"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-4 resize-none outline-none font-mono text-sm leading-relaxed"
            style={{
              background: 'var(--dash-bg)',
              color: 'var(--dash-text)',
              minHeight: fullscreen ? '100%' : minHeight,
              borderRight: showPreview ? '1px solid var(--dash-border)' : 'none'
            }}
          />
          {showPreview && (
            <div
              className="flex-1 p-4 overflow-y-auto dash-scroll prose prose-invert prose-sm max-w-none"
              style={{
                background: 'var(--dash-surface)',
                minHeight: fullscreen ? '100%' : minHeight
              }}
            >
              {value ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {value}
                </ReactMarkdown>
              ) : (
                <p style={{ color: 'var(--dash-text-faint)' }}>
                  Preview will appear here...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
