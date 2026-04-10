import { useEffect } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostStore } from "@/stores/use-post-store";

export default function Dashboard() {
    const { posts, loading, error, fetchPosts, clearPosts } = usePostStore()

    useEffect(() => {
        if (posts.length === 0 && !loading && !error) {
            fetchPosts()
        }
    }, [posts.length, loading, error, fetchPosts])

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Dashboard</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>React Shadcn Starter</CardTitle>
                    <CardDescription>React + Vite + TypeScript template for building apps with shadcn/ui.</CardDescription>
                </CardHeader>
            </Card>

            <div className="mt-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Posts (Zustand Async Demo)</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={fetchPosts} disabled={loading}>
                        Refresh
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearPosts} disabled={loading}>
                        Clear
                    </Button>
                </div>
            </div>

            {error && (
                <Card className="mt-4 border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                </Card>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="mt-2 h-4 w-full" />
                                <Skeleton className="mt-1 h-4 w-2/3" />
                            </CardHeader>
                        </Card>
                    ))
                    : posts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <CardTitle className="text-base">{post.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{post.body}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}
