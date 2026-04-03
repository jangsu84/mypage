import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CONTENT_BASE = `${import.meta.env.BASE_URL}content/`

function App() {
  const [documents, setDocuments] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('loading-list')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadDocuments() {
      try {
        const response = await fetch(`${CONTENT_BASE}index.json`)

        if (!response.ok) {
          throw new Error('Failed to load document list.')
        }

        const items = await response.json()

        if (!cancelled) {
          setDocuments(items)
          setSelectedId(items[0]?.id ?? '')
          setStatus(items.length > 0 ? 'idle' : 'empty')
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadDocuments()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!selectedId) {
      return
    }

    const currentDocument = documents.find((item) => item.id === selectedId)

    if (!currentDocument) {
      return
    }

    let cancelled = false

    async function loadContent() {
      setStatus('loading-content')
      setError('')

      try {
        const response = await fetch(`${CONTENT_BASE}${currentDocument.file}`)

        if (!response.ok) {
          throw new Error('Failed to load document.')
        }

        const markdown = await response.text()

        if (!cancelled) {
          setContent(markdown)
          setStatus('idle')
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message)
          setContent('')
          setStatus('error')
        }
      }
    }

    loadContent()

    return () => {
      cancelled = true
    }
  }, [documents, selectedId])

  const selectedDocument = documents.find((item) => item.id === selectedId)

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">JANGSU KIHM · DATABASE ENGINEER</p>
        <h1>Engineer Notes</h1>
        <p className="hero-copy">
          Notes from my daily work, shared for anyone interested. 
        </p>
      </header>

      <main className="workspace">
        <aside className="sidebar" aria-label="Document list">
          <div className="sidebar-header">
            <h2>Documents</h2>
            <span>{documents.length} files</span>
          </div>

          {documents.length === 0 && status !== 'error' ? (
            <p className="sidebar-empty">No documents available.</p>
          ) : null}

          <ul className="document-list">
            {documents.map((document) => (
              <li key={document.id}>
                <button
                  type="button"
                  className={document.id === selectedId ? 'document-link active' : 'document-link'}
                  onClick={() => setSelectedId(document.id)}
                >
                  <strong>{document.title}</strong>
                  <span>{document.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="viewer" aria-live="polite">
          <div className="viewer-header">
            <div>
              <p className="viewer-label">Selected document</p>
              <h2>{selectedDocument?.title ?? 'Select a document'}</h2>
            </div>
            <code>{selectedDocument?.file ?? 'public/content/*.md'}</code>
          </div>

          {status === 'loading-list' || status === 'loading-content' ? (
            <p className="viewer-state">Loading documents...</p>
          ) : null}

          {status === 'error' ? <p className="viewer-state error">{error}</p> : null}

          {status === 'empty' ? (
            <p className="viewer-state">Add markdown files to public/content.</p>
          ) : null}

          {status === 'idle' && content ? (
            <article className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
          ) : null}
        </section>
      </main>
    </div>
  )
}

export default App