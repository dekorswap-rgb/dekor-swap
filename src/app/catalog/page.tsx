"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CatalogItem {
    id: string;
    name: string;
    category: string;
    styles: string[];
    rooms: string[];
    imageUrl: string;
    description: string;
    availability: string;
    tags: string[];
}

interface CatalogData {
    items: CatalogItem[];
    categories: Array<{ id: string; name: string; emoji: string }>;
    rooms: Array<{ id: string; name: string; emoji: string }>;
    styles: Array<{ id: string; name: string; emoji: string }>;
}

export default function CatalogPage() {
    const [catalogData, setCatalogData] = useState<CatalogData | null>(null);
    const [filteredItems, setFilteredItems] = useState<CatalogItem[]>([]);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("/data/catalog-items.json")
            .then((res) => res.json())
            .then((data) => {
                setCatalogData(data);
                setFilteredItems(data.items);
            });
    }, []);

    useEffect(() => {
        if (!catalogData) return;

        let filtered = catalogData.items;

        if (selectedStyle) {
            filtered = filtered.filter((item) => item.styles.includes(selectedStyle));
        }
        if (selectedRoom) {
            filtered = filtered.filter((item) => item.rooms.includes(selectedRoom));
        }
        if (selectedCategory) {
            filtered = filtered.filter((item) => item.category === selectedCategory);
        }
        if (searchQuery) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredItems(filtered);
    }, [selectedStyle, selectedRoom, selectedCategory, searchQuery, catalogData]);

    if (!catalogData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                        Browse Our Collection
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated selection of home décor items. Filter by style, room, or category to find your perfect pieces.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-12 space-y-6">
                    {/* Styles */}
                    <div>
                        <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter by Style
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={selectedStyle === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedStyle(null)}
                                className="rounded-full"
                            >
                                All Styles
                            </Button>
                            {catalogData.styles.map((style) => (
                                <Button
                                    key={style.id}
                                    variant={selectedStyle === style.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedStyle(style.id)}
                                    className="rounded-full"
                                >
                                    {style.emoji} {style.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Rooms */}
                    <div>
                        <h3 className="text-sm font-bold text-primary mb-3">Filter by Room</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={selectedRoom === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedRoom(null)}
                                className="rounded-full"
                            >
                                All Rooms
                            </Button>
                            {catalogData.rooms.map((room) => (
                                <Button
                                    key={room.id}
                                    variant={selectedRoom === room.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedRoom(room.id)}
                                    className="rounded-full"
                                >
                                    {room.emoji} {room.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-bold text-primary mb-3">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={selectedCategory === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(null)}
                                className="rounded-full"
                            >
                                All Categories
                            </Button>
                            {catalogData.categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="rounded-full"
                                >
                                    {category.emoji} {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                        Showing {filteredItems.length} of {catalogData.items.length} items
                    </p>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
                        >
                            <div className="aspect-square relative overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {item.availability === "coming-soon" && (
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-accent text-white">Coming Soon</Badge>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {item.styles.slice(0, 2).map((styleId) => {
                                        const style = catalogData.styles.find((s) => s.id === styleId);
                                        return style ? (
                                            <Badge key={styleId} variant="outline" className="text-xs">
                                                {style.emoji} {style.name}
                                            </Badge>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg text-muted-foreground mb-4">No items found matching your filters.</p>
                        <Button
                            onClick={() => {
                                setSelectedStyle(null);
                                setSelectedRoom(null);
                                setSelectedCategory(null);
                                setSearchQuery("");
                            }}
                            variant="outline"
                            className="rounded-full"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
