import { useState } from 'react'
import { Button, Label, TextArea, Section } from '../components/Form'
import ResultPane from '../components/ResultPane'
import { post } from '../api/client'

export default function Advice() {
  const [topic, setTopic] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await post('/api/advice', { topic, details })
      setContent(data.content)
    } catch (err: any) { setContent(err?.response?.data?.error || 'Error') } finally { setLoading(false) }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Technical advice">
          <div>
            <Label>Topic</Label>
            <TextArea value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., capitalization of development costs" required />
          </div>
          <div>
            <Label>Details</Label>
            <TextArea value={details} onChange={e => setDetails(e.target.value)} placeholder="Provide relevant facts" />
          </div>
          <Button disabled={loading}>{loading ? 'Analyzing…' : 'Get Advice'}</Button>
        </Section>
      </form>
      <ResultPane content={content} />
    </div>
  )
}