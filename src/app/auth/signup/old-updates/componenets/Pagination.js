"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, totalResults, itemsPerPage, setCurrentPage }) {
    return (
        <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalResults)}</span> of{" "}
                <span className="font-medium">{totalResults}</span> results
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                        const distance = Math.abs(page - currentPage);
                        return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                    })
                    .map((page, index, array) => (
                        <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && <span className="px-2 text-gray-500">...</span>}
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="h-8 w-8 p-0"
                            >
                                {page}
                            </Button>
                        </React.Fragment>
                    ))}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
