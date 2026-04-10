import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

type PostState = {
    posts: Post[]
    loading: boolean
    error: string | null
    fetchPosts: () => Promise<void>
    clearPosts: () => void
}

export const usePostStore = create<PostState>()(
    devtools(
        (set) => ({
            posts: [],
            loading: false,
            error: null,

            fetchPosts: async () => {
                set({ loading: true, error: null }, false, 'fetchPosts/start')
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
                    if (!response.ok) throw new Error(`HTTP ${response.status}`)
                    const posts: Post[] = await response.json()
                    set({ posts, loading: false }, false, 'fetchPosts/success')
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to fetch posts',
                        loading: false,
                    }, false, 'fetchPosts/error')
                }
            },

            clearPosts: () => set({ posts: [], error: null }, false, 'clearPosts'),
        }),
        { name: 'post-store' }
    )
)
