import { useState } from 'react'
import { Button, Label, TextArea, Section } from '../components/Form'
import ResultPane from '../components/ResultPane'
import { post } from '../api/client'

export default function Policy() {
  const [changeDescription, setChangeDescription] = useState('')
  const [objectives, setObjectives] = useState('')
  const [stakeholders, setStakeholders] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await post('/api/policy', { changeDescription, objectives: split(objectives), stakeholders: split(stakeholders) })
      setContent(data.content)
    } catch (err: any) { setContent(err?.response?.data?.error || 'Error') } finally { setLoading(false) }
  }

  const split = (v: string) => v.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Draft or update accounting policy">
          <div>
            <Label>Change description</Label>
            <TextArea value={changeDescription} onChange={e => setChangeDescription(e.target.value)} placeholder="Describe the change and rationale" required />
          </div>
          <div>
            <Label>Objectives (comma separated)</Label>
            <TextArea value={objectives} onChange={e => setObjectives(e.target.value)} placeholder="Accuracy, timeliness, compliance" />
          </div>
          <div>
            <Label>Stakeholders (comma separated)</Label>
            <TextArea value={stakeholders} onChange={e => setStakeholders(e.target.value)} placeholder="Controllership, FP&A, IT, Audit" />
          </div>
          <Button disabled={loading}>{loading ? 'Drafting…' : 'Generate Policy'}</Button>
        </Section>
      </form>
      <ResultPane content={content} />
    </div>
  )
}