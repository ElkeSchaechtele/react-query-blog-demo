import { useEffect, useState } from 'react'
import axios from 'axios'


const fetchPosts = () => {
  return axios.get('/api/posts').then((res) => res.data)
}

export default function usePosts() {
  const [state, setState] = useState({ isLoading: true })

  const fetch = async () => {
    setState({ isLoading: true })
    try {
      const data = await fetchPosts()
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return {
    ...state,
    refetch: fetch
  }
}
