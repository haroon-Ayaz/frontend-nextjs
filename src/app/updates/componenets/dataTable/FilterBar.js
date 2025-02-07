"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, Filter } from "lucide-react";

export default function FilterBar({ columns, data, onFilteredData }) {
    const [filters, setFilters] = useState({});

    // Filter management
    const addFilter = () => {
        const newFilter = { column: columns[0]?.id || '', value: '' };
        setFilters(prev => ({ ...prev, [Date.now()]: newFilter }));
    };

    const updateFilter = (id, field, value) => {
        setFilters(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const removeFilter = (id) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[id];
            return newFilters;
        });
    };

    // Calculate filtered data
    useEffect(() => {
        const filtered = data.filter(row =>
            Object.values(filters).every(filter =>
                String(row[filter.column]).toLowerCase().includes(filter.value.toLowerCase())
            )
        );
        onFilteredData(filtered);
    }, [data, filters, onFilteredData]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="outline" size="sm" onClick={addFilter}>
                    <Filter className="mr-2 h-4 w-4" />
                    Add Filter
                </Button>
            </div>

            {Object.keys(filters).length > 0 && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3"
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
                            <Select value={filter.column} onValueChange={value => updateFilter(id, "column", value)}>
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
        </div>
    );
}