import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export default function usePost(postId) {
  const [state, setState] = useState({ isLoading: true })

  const fetch = useCallback(async () => {
    setState({ isLoading: true })
    try {
      const data = await axios.get(`/api/posts/${postId}`).then((res) => res.data)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [postId])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    ...state,
    refetch: fetch
  }
}
