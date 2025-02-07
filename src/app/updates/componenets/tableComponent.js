"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterBar from "@/app/updates/componenets/dataTable/FilterBar";
import DataTable from "@/app/updates/componenets/dataTable/DataTable";
import Pagination from "@/app/updates/componenets/dataTable/Pagination";

export default function TableComponent({ columns, data, role, clinicians, onAssignPatient }) {
    const [viewMode, setViewMode] = useState("standard");
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

//    // View mode configuration
//    const compactColumns = useMemo(
//        () => columns.filter(col => ["rxkid", "fname", "sname", "problem"].includes(col.id)),
//        [columns]
//    );
//
//    const activeColumns = viewMode === "standard" ? columns : compactColumns;
//
//    // Pagination calculation
//    const paginatedData = useMemo(
//        () => filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
//        [filteredData, currentPage, itemsPerPage]
//    );

//    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Patient Data
                    </CardTitle>
                    <Tabs value={viewMode} onValueChange={setViewMode}>
                        <TabsList>
                            <TabsTrigger value="standard">Standard</TabsTrigger>
                            <TabsTrigger value="compact">Compact</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {/*<FilterBar*/}
                {/*    columns={columns}*/}
                {/*    data={data}*/}
                {/*    onFilteredData={setFilteredData}*/}
                {/*/>*/}

                {/*<DataTable*/}
                {/*    columns={columns}*/}
                {/*    data={data}*/}
                {/*    role={role}*/}
                {/*    clinicians={clinicians}*/}
                {/*/>*/}

                {/*<Pagination*/}
                {/*    currentPage={currentPage}*/}
                {/*    totalPages={totalPages}*/}
                {/*    totalResults={filteredData.length}*/}
                {/*    itemsPerPage={itemsPerPage}*/}
                {/*    setCurrentPage={setCurrentPage}*/}
                {/*/>*/}
            </CardContent>
        </Card>
    );
}