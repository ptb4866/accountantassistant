import { PropsWithChildren } from 'react'

export function Label({ children }: PropsWithChildren) { return <label className="label">{children}</label> }
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input className="input" {...props} /> }
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className="textarea" {...props} /> }
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`btn btn-primary ${props.className ?? ''}`} {...props} /> }
export function Card({ children }: PropsWithChildren) { return <div className="card p-4 sm:p-6">{children}</div> }
export function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </Card>
  )
}