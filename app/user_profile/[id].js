import React from 'react'
import { useRouter } from 'next/router'

const [id] = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      Hello, {id}! Your user ID is: {id}
    </div>
  )
}

export default [id]
