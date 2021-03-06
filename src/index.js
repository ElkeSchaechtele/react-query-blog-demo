import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Wrapper, Main } from './components/styled'
import Sidebar from './components/Sidebar'

import Admin from './screens/admin/Admin'
import AdminPost from './screens/admin/AdminPost'
import Blog from './screens/blog/Blog'
import BlogPost from './screens/blog/BlogPost'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 5 * 60 * 1000
    },
  },
})

export default function App() {
  return (
    <SafeHydrate>
      <BrowserRouter>
        <Wrapper>
          <QueryClientProvider client={queryClient}>
            <Sidebar />
            <Main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <h1>Welcome!</h1>
                    </>
                  }
                />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/:postId" element={<AdminPost />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
              </Routes>
            </Main>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Wrapper>
      </BrowserRouter>
    </SafeHydrate>
  )
}
