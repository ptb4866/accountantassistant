import { useState } from 'react'
import { Button, Label, Input, Section } from '../components/Form'
import ResultPane from '../components/ResultPane'
import { post } from '../api/client'

export default function Systems() {
  const [systems, setSystems] = useState('')
  const [risks, setRisks] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await post('/api/system', { systems: split(systems), risks: split(risks) })
      setContent(data.content)
    } catch (err: any) { setContent(err?.response?.data?.error || 'Error') } finally { setLoading(false) }
  }
  const split = (v: string) => v.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Systems and controls">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Systems (comma separated)</Label>
              <Input value={systems} onChange={e => setSystems(e.target.value)} placeholder="ERP, Subledger, Billing, Rev Rec" />
            </div>
            <div>
              <Label>Known risks (comma separated)</Label>
              <Input value={risks} onChange={e => setRisks(e.target.value)} placeholder="Access, change mgmt, reconciliation" />
            </div>
          </div>
          <Button disabled={loading}>{loading ? 'Evaluating…' : 'Evaluate'}</Button>
        </Section>
      </form>
      <ResultPane content={content} />
    </div>
  )
}