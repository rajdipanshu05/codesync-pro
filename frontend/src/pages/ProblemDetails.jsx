import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Editor, { loader } from '@monaco-editor/react'
import { ChevronLeft, CheckCircle2, Circle } from 'lucide-react'
import { useProblemStore } from '../store/problemStore'
import RunResults from '../components/problems/RunResults'
import SubmitResults from '../components/problems/SubmitResults'
import Confetti from 'react-confetti-boom'

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
  { label: 'Night Owl', value: 'night-owl' }
]

loader.init().then(monaco => {
  fetch('https://cdn.jsdelivr.net/npm/monaco-themes@0.4.4/themes/Dracula.json')
    .then(r => r.json())
    .then(data => monaco.editor.defineTheme('dracula', data))
  fetch('https://cdn.jsdelivr.net/npm/monaco-themes@0.4.4/themes/Monokai.json')
    .then(r => r.json())
    .then(data => monaco.editor.defineTheme('monokai', data))
  fetch(
    'https://cdn.jsdelivr.net/npm/monaco-themes@0.4.4/themes/Night%20Owl.json'
  )
    .then(r => r.json())
    .then(data => monaco.editor.defineTheme('night-owl', data))
})

const monacoLang = { python: 'python', java: 'java', cpp: 'cpp' }

const storageKey = (problemId, language) => `code_${problemId}_${language}`
const loadCode = (problemId, language) => {
  try {
    return localStorage.getItem(storageKey(problemId, language)) ?? null
  } catch {
    return null
  }
}
const saveCode = (problemId, language, code) => {
  try {
    localStorage.setItem(storageKey(problemId, language), code)
  } catch {}
}
const clearCode = (problemId, language) => {
  try {
    localStorage.removeItem(storageKey(problemId, language))
  } catch {}
}

// ─── ProblemPage ─────────────────────────────────────────────────────────────

const ProblemPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentProblem, runCode, submitCode, getProblemById, isLoading } =
    useProblemStore()

  const [lang, setLang] = useState('python')
  const [code, setCode] = useState('')
  const [theme, setTheme] = useState('vs-dark')

  const [runResult, setRunResult] = useState(null)
  const [submitResult, setSubmitResult] = useState(null)
  const [runLoading, setRunLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [activePanel, setActivePanel] = useState('run') // hamesha 'run' se start
  const [panelOpen, setPanelOpen] = useState(true) // toggle ke liye
  const [confetti, SetConfetti] = useState(false)

  const codeRef = useRef(code)
  const langRef = useRef(lang)

  useEffect(() => {
    getProblemById(id)
  }, [id])

  useEffect(() => {
    if (!currentProblem) return
    const saved = loadCode(id, lang)
    setCode(saved !== null ? saved : currentProblem.starterCode[lang])
  }, [currentProblem, id])

  useEffect(() => {
    codeRef.current = code
  }, [code])
  useEffect(() => {
    langRef.current = lang
  }, [lang])

  useEffect(() => {
    if (!id) return
    const timer = setTimeout(
      () => saveCode(id, langRef.current, codeRef.current),
      500
    )
    return () => clearTimeout(timer)
  }, [code, id])

  const handleLangChange = l => {
    saveCode(id, lang, code)
    setLang(l)
    if (currentProblem) {
      const saved = loadCode(id, l)
      setCode(saved !== null ? saved : currentProblem.starterCode[l])
    }
  }

  const handleResetCode = () => {
    if (!currentProblem) return
    clearCode(id, lang)
    setCode(currentProblem.starterCode[lang])
  }

  const handleRunButton = async () => {
    setActivePanel('run')
    setPanelOpen(true)
    setRunResult(null)
    setRunLoading(true)
    try {
      const data = await runCode({ language: lang, code, problemId: id })

      setRunResult(data)
    } catch (e) {
      setRunResult({ error: e?.message || 'Something went wrong' })
    } finally {
      setRunLoading(false)
    }
  }

  const handleSubmitButton = async () => {
    setActivePanel('submit')
    setPanelOpen(true)
    setSubmitResult(null)
    setSubmitLoading(true)
    try {
      const data = await submitCode({ language: lang, code, problemId: id })
      if (data.allPassed) {
        SetConfetti(false)

        setTimeout(() => {
          SetConfetti(true)
        }, 50)

        setTimeout(() => {
          SetConfetti(false)
        }, 5000)
      }
      setSubmitResult(data)
    } catch (e) {
      setSubmitResult({ error: e?.message || 'Something went wrong' })
    } finally {
      setSubmitLoading(false)
    }
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
    <div className='min-h-dvh bg-zinc-950 text-white flex flex-col'>
      {confetti && (
        <div className='fixed inset-0 z-[9999] pointer-events-none'>
          <Confetti />
        </div>
      )}
      {/* TOPBAR */}
      <header className='flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950'>
        <button
          onClick={() => navigate('/problems')}
          className='flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors'
        >
          <ChevronLeft size={16} />
          Problems
        </button>
        <div className='flex w-full sm:w-auto gap-2'>
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
      <div className='flex flex-col lg:flex-row flex-1'>
        {/* LEFT */}
        <div
          className='
  w-full
  lg:w-[42%]
  border-b lg:border-b-0 lg:border-r
  border-zinc-800
  p-4 lg:p-6
  space-y-6
  '
        >
          <h1 className='text-xl font-semibold text-white'>{title}</h1>
          <p className='text-sm text-zinc-400 leading-relaxed'>{statement}</p>

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

        {/* RIGHT */}
        <div
          className='
  w-full
  lg:flex-1
  flex
  flex-col
  min-h-[500px]
  lg:min-h-0
  '
        >
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
          <div className='h-[450px] lg:flex-1'>
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

          {/* RESULTS — hamesha render hota hai */}
          {activePanel === 'run' ? (
            <RunResults
              results={runResult}
              isLoading={runLoading}
              examples={examples}
              isOpen={panelOpen}
              onToggle={() => setPanelOpen(v => !v)}
            />
          ) : (
            <SubmitResults
              results={submitResult}
              isLoading={submitLoading}
              isOpen={panelOpen}
              onToggle={() => setPanelOpen(v => !v)}
            />
          )}

          {/* BOTTOM BAR */}
          <div className='flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900'>
            <button
              onClick={handleResetCode}
              className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors'
            >
              Reset code
            </button>
            <div className='flex items-center gap-2'>
              <button
                onClick={handleRunButton}
                disabled={runLoading || submitLoading}
                className='flex-1 sm:flex-none flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors'
              >
                <CheckCircle2 size={15} />
                Run
              </button>
              <button
                onClick={handleSubmitButton}
                disabled={runLoading || submitLoading}
                className='flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-sm font-semibold px-5 py-2 rounded-xl transition-colors'
              >
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
