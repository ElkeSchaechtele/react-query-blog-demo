import React from 'react'
import axios from 'axios'

const savePost = (values) =>
  axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data)

export default function useSavePost() {
  const [state, setState] = React.useState({ isIdle: true })

  const mutate = React.useCallback(async (values) => {
    setState({ isLoading: true })
    try {
      const data = await savePost(values)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [])

  return [mutate, state]
}
