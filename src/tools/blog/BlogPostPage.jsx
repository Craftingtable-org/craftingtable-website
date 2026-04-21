import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "./blogData";
import { cn } from "@/lib/utils";

/**
 * A reusable blog post template component.
 * To add a new blog:
 * 1. Add the metadata and content to `blogData.js`
 * 2. That's it! This page will automatically handle the rendering based on the URL ID.
 */
export default function BlogPostPage() {
  const { postId } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === postId);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} · Craftingtable Blog`;
      
      // Update meta description for SEO
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = post.description;

      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          crumbs={[
            { label: "Blog", to: "/blog" },
            { label: post.category }
          ]}
          title={post.title}
          description={post.description}
        />
      }
    >
      <div className="mx-auto w-full max-w-4xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm ring-1 ring-border/40">
          {/* Featured Image Placeholder */}
          <div className="aspect-[21/9] w-full bg-primary/5 flex items-center justify-center border-b border-border/60">
             <div className="text-6xl font-black opacity-5 select-none tracking-tighter text-primary">
                {post.category.toUpperCase()}
             </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-6 mb-10 text-sm text-muted-foreground border-b border-border/40 pb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Tag className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">{post.category}</span>
              </div>
            </div>

            <div 
              className="prose prose-slate dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-foreground
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-foreground
                prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground
                prose-li:text-lg prose-li:text-muted-foreground
                prose-strong:text-foreground prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-border/40 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <p className="text-sm font-medium text-muted-foreground">Share this article:</p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <Button key={i} variant="outline" size="icon" className="h-9 w-9 rounded-full">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
               </div>
               
               <Button variant="ghost" className="text-primary gap-2" asChild>
                 <Link to="/blog">
                    More articles
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                 </Link>
               </Button>
            </div>
          </div>
        </article>

      </div>
    </PageTemplate>
  );
}
