import { useState } from 'react'
import { Button, Label, Input, Section } from '../components/Form'
import ResultPane from '../components/ResultPane'
import { post } from '../api/client'

export default function Audit() {
  const [scope, setScope] = useState('')
  const [auditors, setAuditors] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await post('/api/audit', { scope, auditors: split(auditors) })
      setContent(data.content)
    } catch (err: any) { setContent(err?.response?.data?.error || 'Error') } finally { setLoading(false) }
  }
  const split = (v: string) => v.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Audit readiness">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Scope</Label>
              <Input value={scope} onChange={e => setScope(e.target.value)} placeholder="e.g., annual financials, revenue stream" required />
            </div>
            <div>
              <Label>Auditors (comma separated)</Label>
              <Input value={auditors} onChange={e => setAuditors(e.target.value)} placeholder="Firm names" />
            </div>
          </div>
          <Button disabled={loading}>{loading ? 'Preparing…' : 'Prepare PBC'}</Button>
        </Section>
      </form>
      <ResultPane content={content} />
    </div>
  )
}