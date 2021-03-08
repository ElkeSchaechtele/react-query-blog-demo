import { useCallback, useState } from 'react'
import axios from 'axios'

const createPost = (values) =>
  axios.post('/api/posts', values).then((res) => res.data)

export default function useCreatePost() {
  const [state, setState] = useState({ isIdle: true })

  const mutate = useCallback(async (values) => {
    setState({ isLoading: true })
    try {
      const data = await createPost(values)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [])

  return [mutate, state]
}
