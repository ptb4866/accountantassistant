import { useState } from 'react'
import { Button, Label, TextArea, Input, Section } from '../components/Form'
import ResultPane from '../components/ResultPane'
import { post } from '../api/client'

export default function Research() {
  const [question, setQuestion] = useState('')
  const [jurisdiction, setJurisdiction] = useState('')
  const [frameworks, setFrameworks] = useState<string[]>([])
  const [companyContext, setCompanyContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const toggleFramework = (fw: string) => setFrameworks(prev => prev.includes(fw) ? prev.filter(f => f !== fw) : [...prev, fw])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await post('/api/research', { question, jurisdiction, frameworks, companyContext })
      setContent(data.content)
    } catch (err: any) {
      setContent(err?.response?.data?.error || 'Error')
    } finally { setLoading(false) }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Research complex accounting issues">
          <div>
            <Label>Question</Label>
            <TextArea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Describe the issue in detail (e.g., revenue recognition for multi-element arrangements)" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Jurisdiction</Label>
              <Input value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} placeholder="e.g., US, EU" />
            </div>
            <div>
              <Label>Frameworks</Label>
              <div className="flex flex-wrap gap-2">
                {['GAAP','IFRS','Both'].map(fw => (
                  <button type="button" key={fw} onClick={() => toggleFramework(fw)} className={`px-3 py-1 rounded-lg text-sm border ${frameworks.includes(fw) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-700'}`}>{fw}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label>Company context</Label>
            <TextArea value={companyContext} onChange={e => setCompanyContext(e.target.value)} placeholder="Company size, industry, existing policies" />
          </div>
          <Button disabled={loading}>{loading ? 'Researching…' : 'Research'}</Button>
        </Section>
      </form>
      <ResultPane content={content} />
    </div>
  )
}