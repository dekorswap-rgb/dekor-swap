"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        async function loadBlogs() {
            const indexRes = await fetch("/data/blogs/index.json");
            const index = await indexRes.json();

            const blogPromises = index.blogs.map(async (blog: any) => {
                const res = await fetch(`/data/blogs/${blog.id}.json`);
                return res.json();
            });

            const blogData = await Promise.all(blogPromises);
            setBlogs(blogData);
        }

        loadBlogs();
    }, []);

    const categories = Array.from(new Set(blogs.map((b) => b.category)));
    const filteredBlogs = selectedCategory
        ? blogs.filter((b) => b.category === selectedCategory)
        : blogs;

    const featuredBlog = blogs.find((b) => b.id === "blog-001");

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                        Blog & Inspiration
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Styling tips, sustainability insights, and design trends to inspire your home transformation.
                    </p>
                </div>

                {/* Featured Post */}
                {featuredBlog && (
                    <Link href={`/blog/${featuredBlog.slug}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group mb-16 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden">
                                    <img
                                        src={featuredBlog.featuredImage}
                                        alt={featuredBlog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-accent text-white">
                                        Featured
                                    </Badge>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge variant="outline">{featuredBlog.category}</Badge>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {featuredBlog.readTime}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                                        {featuredBlog.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {featuredBlog.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            By {featuredBlog.author}
                                        </span>
                                        <span className="text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                )}

                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                                    ? "bg-accent text-white"
                                    : "bg-white border border-border hover:border-accent"
                                }`}
                        >
                            All Posts
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${selectedCategory === category
                                        ? "bg-accent text-white"
                                        : "bg-white border border-border hover:border-accent"
                                    }`}
                            >
                                {category.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog, index) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all h-full flex flex-col"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Badge variant="outline" className="text-xs capitalize">
                                            {blog.category.replace("-", " ")}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {blog.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <span className="text-xs text-muted-foreground">
                                            {blog.author}
                                        </span>
                                        <span className="text-accent text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
