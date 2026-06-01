// ProblemPage.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Editor, { loader } from '@monaco-editor/react'
import { ChevronLeft, CheckCircle2, Circle } from 'lucide-react'
import { useProblemStore } from '../store/problemStore'

const LANGUAGES = ['python', 'java', 'cpp']

const difficultyColors = {
  Easy: 'text-emerald-400',
  Medium: 'text-amber-400',
  Hard: 'text-rose-400'
}

const THEMES = [
  { label: 'Dark', value: 'vs-dark' },
  { label: 'Light', value: 'vs' },
  { label: 'Dracula', value: 'dracula' },
  { label: 'Monokai', value: 'monokai' },
  { label: 'Night Owl', value: 'night-owl' },
]

// Load custom themes once
loader.init().then(monaco => {
  fetch('https://cdn.jsdelivr.net/npm/monaco-themes@0.4.4/themes/Dracula.json')
    .then(r => r.json()).then(data => monaco.editor.defineTheme('dracula', data))

  fetch('https://cdn.jsdelivr.net/npm/monaco-themes@0.4.4/themes/Monokai.json')
    .then(r => r.json()).then(data => monaco.editor.defineTheme('monokai', data))

  fetch('https://cdn.jsdelivr.net/npm/monaco-themes@0.4.4/themes/Night%20Owl.json')
    .then(r => r.json()).then(data => monaco.editor.defineTheme('night-owl', data))
})

const monacoLang = { python: 'python', java: 'java', cpp: 'cpp' }

const ProblemPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentProblem, getProblemById, isLoading } = useProblemStore()

  const [lang, setLang] = useState('python')
  const [code, setCode] = useState('')
  const [theme, setTheme] = useState('vs-dark')

  useEffect(() => {
    getProblemById(id)
  }, [id])

  useEffect(() => {
    if (currentProblem) {
      setCode(currentProblem.starterCode[lang])
    }
  }, [currentProblem, lang])

  const handleLangChange = l => {
    setLang(l)
    setCode(currentProblem.starterCode[l])
  }

  if (isLoading || !currentProblem) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-zinc-950'>
        <div className='w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin' />
      </div>
    )
  }

  const {
    title,
    difficulty,
    topics,
    statement,
    constraints,
    examples,
    starterCode
  } = currentProblem

  return (
    <div className='min-h-screen bg-zinc-950 text-white flex flex-col'>
      {/* TOPBAR */}
      <header className='flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950'>
        <button
          onClick={() => navigate('/problems')}
          className='flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors'
        >
          <ChevronLeft size={16} />
          Problems
        </button>

        <div className='flex items-center gap-3'>
          <span
            className={`text-xs font-medium ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </span>
          <div className='flex gap-1.5'>
            {topics.map(t => (
              <span
                key={t}
                className='px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-md'
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN SPLIT */}
      <div className='flex flex-1 overflow-hidden'>
        {/* LEFT — Problem */}
        <div className='w-[42%] border-r border-zinc-800 overflow-y-auto p-6 space-y-6'>
          <h1 className='text-xl font-semibold text-white'>{title}</h1>

          {/* STATEMENT */}
          <p className='text-sm text-zinc-400 leading-relaxed'>{statement}</p>

          {/* EXAMPLES */}
          <div className='space-y-3'>
            {examples.map((ex, i) => (
              <div
                key={i}
                className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2'
              >
                <p className='text-xs font-medium text-zinc-500'>
                  Example {i + 1}
                </p>
                <div className='space-y-1 font-mono text-sm'>
                  <div>
                    <span className='text-zinc-500'>Input: </span>
                    <span className='text-zinc-200'>{ex.input}</span>
                  </div>
                  <div>
                    <span className='text-zinc-500'>Output: </span>
                    <span className='text-zinc-200'>{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div>
                      <span className='text-zinc-500'>Explanation: </span>
                      <span className='text-zinc-400'>{ex.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CONSTRAINTS */}
          <div>
            <p className='text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider'>
              Constraints
            </p>
            <ul className='space-y-1'>
              {constraints.map((c, i) => (
                <li
                  key={i}
                  className='flex items-start gap-2 text-sm text-zinc-400 font-mono'
                >
                  <span className='text-zinc-600 mt-0.5'>•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — Editor */}
        <div className='flex-1 flex flex-col'>
          {/* LANG TABS + THEME */}
          <div className='flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2'>
            <div className='flex items-center gap-1'>
              {LANGUAGES.map(l => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize
          ${
            lang === l
              ? 'bg-zinc-700 text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className='bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer'
            >
              {THEMES.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* MONACO */}
          <div className='flex-1'>
            <Editor
              height='100%'
              language={monacoLang[lang]}
              value={code}
              onChange={val => setCode(val || '')}
              theme={theme}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                padding: { top: 16, bottom: 16 },
                tabSize: 4
              }}
            />
          </div>

          {/* SUBMIT BAR */}
          <div className='flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900'>
            <button
              onClick={() => setCode(starterCode[lang])}
              className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors'
            >
              Reset code
            </button>
            <div className='flex items-center gap-2'>
              <button className='flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-5 py-2 rounded-xl transition-colors'>
                <CheckCircle2 size={15} />
                Run
              </button>
              <button className='flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-5 py-2 rounded-xl transition-colors'>
                <CheckCircle2 size={15} />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage
