import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import usePost from '../../hooks/usePost'
import useDeletePost from '../../hooks/useDeletePost'
import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'
import useUpdatePost from '../../hooks/useUpdatePost'

export default function AdminPost() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const postQuery = usePost(postId)
  const [updatePost, updatePostInfo] = useUpdatePost()
  const [deletePost, deletePostInfo] = useDeletePost()

  const onSubmit = async (values) => {
    await updatePost(values)
    postQuery.refetch()
  }

  const onDelete = async () => {
    await deletePost(postId)
    navigate('/admin')
  }

  return (
    <>
      {postQuery.isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{postQuery.data.title}</h3>
          <p>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={onSubmit}
            submitText={
              updatePostInfo.isLoading
                ? 'Saving...'
                : updatePostInfo.isError
                ? 'Error!'
                : updatePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />

          <p>
            <button onClick={onDelete}>
              {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                ? 'Error!'
                : deletePostInfo.isSuccess
                ? 'Deleted!'
                : 'Delete Post'}
            </button>
          </p>
        </div>
      )}
    </>
  )
}
