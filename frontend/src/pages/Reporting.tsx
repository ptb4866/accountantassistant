import { useState } from 'react'
import { Button, Label, TextArea, Input, Section } from '../components/Form'
import ResultPane from '../components/ResultPane'
import { post } from '../api/client'

export default function Reporting() {
  const [period, setPeriod] = useState('')
  const [issues, setIssues] = useState('')
  const [materialityNotes, setMaterialityNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await post('/api/reporting', { period, issues: split(issues), materialityNotes })
      setContent(data.content)
    } catch (err: any) { setContent(err?.response?.data?.error || 'Error') } finally { setLoading(false) }
  }
  const split = (v: string) => v.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Financial reporting support">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Period</Label>
              <Input value={period} onChange={e => setPeriod(e.target.value)} placeholder="Q2 FY25" required />
            </div>
            <div>
              <Label>Materiality notes</Label>
              <Input value={materialityNotes} onChange={e => setMaterialityNotes(e.target.value)} placeholder="e.g., performance materiality" />
            </div>
          </div>
          <div>
            <Label>Issues (comma separated)</Label>
            <TextArea value={issues} onChange={e => setIssues(e.target.value)} placeholder="e.g., lease classification, stock comp, ASC 606 allocation" />
          </div>
          <Button disabled={loading}>{loading ? 'Preparing…' : 'Prepare Checklist'}</Button>
        </Section>
      </form>
      <ResultPane content={content} />
    </div>
  )
}