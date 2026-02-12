"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    author: string;
    publishedDate: string;
    category: string;
    tags: string[];
    featuredImage: string;
    excerpt: string;
    readTime: string;
    content: string;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    try {
        const indexRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/data/blogs/index.json`);
        const index = await indexRes.json();

        return index.blogs.map((blog: any) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        async function loadBlog() {
            try {
                const indexRes = await fetch("/data/blogs/index.json");
                const index = await indexRes.json();

                const blogItem = index.blogs.find((b: any) => b.slug === params.slug);
                if (!blogItem) return;

                const res = await fetch(`/data/blogs/${blogItem.id}.json`);
                const blogData = await res.json();
                setBlog(blogData);

                // Load all blogs for related posts
                const blogPromises = index.blogs.map(async (b: any) => {
                    const r = await fetch(`/data/blogs/${b.id}.json`);
                    return r.json();
                });
                const blogs = await Promise.all(blogPromises);
                setAllBlogs(blogs.filter((b) => b.slug !== params.slug));
            } catch (error) {
                console.error("Error loading blog:", error);
            }
        }

        loadBlog();
    }, [params.slug]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    const relatedPosts = allBlogs
        .filter((b) => b.category === blog.category || b.tags.some((tag) => blog.tags.includes(tag)))
        .slice(0, 3);

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 -ml-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Button>
                </Link>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className="capitalize">
                            {blog.category.replace("-", " ")}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {blog.readTime}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">{blog.title}</h1>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground">By {blog.author}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="aspect-video rounded-2xl overflow-hidden mb-12"
                >
                    <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-lg max-w-none mb-12"
                >
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-primary mt-8 mb-4" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-primary mt-6 mb-3" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-primary mt-4 mb-2" {...props} />,
                            p: ({ node, ...props }) => <p className="text-muted-foreground leading-relaxed mb-4" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                            li: ({ node, ...props }) => <li className="text-muted-foreground" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-primary" {...props} />,
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </motion.div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-border">
                    {blog.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="capitalize">
                            {tag.replace("-", " ")}
                        </Badge>
                    ))}
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`}>
                                    <div className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                                        <div className="aspect-video relative overflow-hidden">
                                            <img
                                                src={post.featuredImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">{post.readTime}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
