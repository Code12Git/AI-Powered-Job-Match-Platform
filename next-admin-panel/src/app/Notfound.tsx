'use client'  

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

const NotFound = () => {
  const router = useRouter()

   useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">
            Oops! The page you{"'"}re looking for doesn{"'"}t exist.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
          <p className="mt-4 text-gray-500">
            You{"'"}ll be automatically redirected in 5 seconds...
          </p>
        </div>
      </div>
    </>
  )
}

export default NotFound