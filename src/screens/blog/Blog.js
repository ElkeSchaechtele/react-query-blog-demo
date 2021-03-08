import React from 'react'
import { Link } from 'react-router-dom'
import usePosts from '../../hooks/usePosts'
import { PostsContainer, PostSummary } from '../../components/styled'

export default function Blog() {
  const postsQuery = usePosts()

  return (
    <>
      <h1>Blog</h1>

      <PostsContainer>
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <PostSummary as={Link} to={`./${post.id}`} key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </PostSummary>
          ))
        )}
      </PostsContainer>
    </>
  )
}
