"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskFilters } from "@/components/Tasks/task.filters";
import { Filter, Search } from "lucide-react";

interface SearchAndFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    filterPriority: string;
    setFilterPriority: (priority: string) => void;
    filterCategory: string;
    setFilterCategory: (category: string) => void;
}

export function SearchAndFilters({
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    filterCategory,
    setFilterCategory
}: SearchAndFiltersProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm nhiệm vụ..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className={showFilters ? 'bg-gray-100 dark:bg-gray-800' : ''}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Bộ lọc
                    </Button>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t">
                        <TaskFilters
                            filterStatus={filterStatus}
                            setFilterStatus={setFilterStatus}
                            filterPriority={filterPriority}
                            setFilterPriority={setFilterPriority}
                            filterCategory={filterCategory}
                            setFilterCategory={setFilterCategory}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
