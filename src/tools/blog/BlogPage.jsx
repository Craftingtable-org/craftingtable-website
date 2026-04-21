import { Calendar, ChevronRight, Clock, User } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BLOG_POSTS } from "./blogData";

export default function BlogPage() {
  useEffect(() => {
    document.title = "Blog · Craftingtable";
  }, []);

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          crumbs={[{ label: "Blog" }]}
          title="Admin Blog"
          description="Guides, tips, and configuration insights for Minecraft server owners and network admins."
        />
      }
    >
      <div className="mx-auto w-full max-w-[1480px]">
        {/* Featured Post */}
        {BLOG_POSTS.length > 0 && (
          <div className="mb-12">
            <Card className="overflow-hidden rounded-3xl border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent shadow-md ring-1 ring-primary/10 transition-shadow hover:shadow-lg">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="flex aspect-video items-center justify-center bg-primary/5 p-12 md:aspect-auto">
                  <div className="text-8xl font-black opacity-10 select-none tracking-tighter text-primary">
                    {BLOG_POSTS[0].category.toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {BLOG_POSTS[0].category}
                    </span>
                    <span className="text-xs text-muted-foreground">{BLOG_POSTS[0].date}</span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    <Link to={`/blog/${BLOG_POSTS[0].id}`} className="hover:text-primary transition-colors">
                      {BLOG_POSTS[0].title}
                    </Link>
                  </h2>
                  <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                    {BLOG_POSTS[0].description}
                  </p>
                  <Button size="lg" className="w-fit rounded-xl px-8" asChild>
                    <Link to={`/blog/${BLOG_POSTS[0].id}`}>
                      Read featured article
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Recent Articles</h3>
            <div className="h-px flex-1 bg-border/40 mx-4" />
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(1).map((post) => (
              <Card key={post.id} className="group overflow-hidden rounded-2xl border-border/80 bg-card shadow-sm ring-1 ring-border/40 transition-shadow hover:shadow-md">
                <div className="aspect-[16/9] w-full bg-primary/5 p-8 flex items-center justify-center">
                  <div className="text-4xl font-bold opacity-10 select-none tracking-tighter text-primary group-hover:opacity-20 transition-opacity">
                    {post.category.toUpperCase()}
                  </div>
                </div>
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="gap-1.5 p-0 font-semibold text-primary hover:bg-transparent hover:text-primary/80" asChild>
                    <Link to={`/blog/${post.id}`}>
                      Read more
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
