'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function QuizPage() {
  const [quiz, setQuiz] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const sdgId = searchParams.get('sdgId')

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!sdgId) return
      
      try {
        const response = await fetch(`/api/quiz/sdg/${sdgId}`)
        const data = await response.json()
        setQuiz(data)
      } catch (error) {
        console.error('Error fetching quiz:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [sdgId])

  const startQuiz = async () => {
    if (!quiz) return
    
    try {
      const response = await fetch(`/api/quiz/${quiz._id}/start`, {
        method: 'POST'
      })
      const data = await response.json()
      console.log('Quiz started:', data)
    } catch (error) {
      console.error('Error starting quiz:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!sdgId) return <div>SDG ID required</div>
  if (!quiz) return <div>No quiz found for SDG {sdgId}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quiz: {quiz.title}</h1>
      <div className="border p-4 rounded-lg">
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        <p className="text-sm mb-2">Time Limit: {quiz.timeLimit} minutes</p>
        <p className="text-sm mb-2">Passing Score: {quiz.passingScore}%</p>
        <p className="text-sm mb-4">Questions: {quiz.questions?.length || 0}</p>
        
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded"
          onClick={startQuiz}
        >
          Mulai Quiz
        </button>
        
        <button 
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.href = '/learn'}
        >
          Kembali ke Learn
        </button>
      </div>
    </div>
  )
}