'use client'

import { useEffect, useState } from 'react'

export default function LearnPage() {
  const [sdgs, setSdgs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSDGs = async () => {
      try {
        const response = await fetch('/api/sdgs')
        const data = await response.json()
        setSdgs(data.sdgs || [])
      } catch (error) {
        console.error('Error fetching SDGs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSDGs()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Learn SDGs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sdgs.map((sdg: any) => (
          <div key={sdg.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{sdg.name}</h3>
            <p className="text-sm text-gray-600">{sdg.description}</p>
            <p className="text-sm">Progress: {sdg.progress}%</p>
            <button 
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => window.location.href = `/lesson?sdgId=${sdg.id}`}
            >
              Belajar Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}