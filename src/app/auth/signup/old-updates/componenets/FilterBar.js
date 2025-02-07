"use client";

import React from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";

export default function FilterBar({ filters, columns, updateFilter, removeFilter }) {
    return (
        <>
            {Object.keys(filters).length > 0 && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3 mb-6"
                >
                    {Object.entries(filters).map(([id, filter]) => (
                        <motion.div
                            key={id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <Search className="h-4 w-4 text-gray-500" />
                            <Select value={filter.column} onValueChange={(value) => updateFilter(id, "column", value)}>
                                <SelectTrigger className="w-[200px] bg-white">
                                    <SelectValue placeholder="Select column" />
                                </SelectTrigger>
                                <SelectContent>
                                    {columns.map((col) => (
                                        <SelectItem key={col.id} value={col.id}>
                                            {col.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Filter value"
                                value={filter.value}
                                onChange={(e) => updateFilter(id, "value", e.target.value)}
                                className="flex-grow bg-white"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFilter(id)}
                                className="hover:bg-gray-200 hover:text-red-600 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
}
