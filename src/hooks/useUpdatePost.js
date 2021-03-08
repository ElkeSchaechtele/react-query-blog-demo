import { useCallback, useState } from 'react'
import axios from 'axios'

const updatePost = (values) =>
  axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data)

export default function useUpdatePost() {
  const [state, setState] = useState({ isIdle: true })

  const mutate = useCallback(async (values) => {
    setState({ isLoading: true })
    try {
      const data = await updatePost(values)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [])

  return [mutate, state]
}
