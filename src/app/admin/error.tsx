"use client"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Error</h1>
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="font-mono text-sm text-red-800 whitespace-pre-wrap break-all">
            {error.message}
          </p>
          {error.stack && (
            <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-64">
              {error.stack}
            </pre>
          )}
        </div>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Prøv igen
        </button>
      </div>
    </div>
  )
}
