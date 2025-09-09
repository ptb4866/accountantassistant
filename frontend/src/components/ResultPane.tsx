export default function ResultPane({ content }: { content: string }) {
  if (!content) return null
  return (
    <div className="card p-4 sm:p-6 whitespace-pre-wrap text-sm">
      {content}
    </div>
  )
}