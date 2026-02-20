'use client'
import React, { useMemo, useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, SortAsc, SortDesc, Clock } from 'lucide-react';
import { TreeItem } from '@/types/TreeItem';

interface TreeViewProps {
    items: TreeItem[];
    title?: string;
}

// Helper để chuyển đổi chuỗi ngày tháng linh hoạt sang Date object để so sánh
const parseFlexibleDate = (dateStr: string): Date => {
    if (!dateStr) return new Date(0);

    // Trường hợp MM/YYYY
    if (dateStr.includes('/')) {
        const [month, year] = dateStr.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, 1);
    }

    // Trường hợp chỉ có YYYY (4 chữ số)
    if (/^\d{4}$/.test(dateStr)) {
        return new Date(parseInt(dateStr), 0, 1);
    }

    // Mặc định cho ISO Date hoặc các định dạng khác
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

const TreeView = ({ items, title = "Dòng thời gian" }: TreeViewProps) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const sortedData = useMemo(() => {
        const sortRecursive = (data: TreeItem[]): TreeItem[] => {
            return [...data]
                .sort((a, b) => {
                    const timeA = parseFlexibleDate(a.startDate).getTime();
                    const timeB = parseFlexibleDate(b.startDate).getTime();
                    return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
                })
                .map(item => ({
                    ...item,
                    children: item.children ? sortRecursive(item.children) : undefined
                }));
        };
        return sortRecursive(items);
    }, [items, sortOrder]);

    return (
        // <div className="w-full mx-auto p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="w-full mx-auto p-5 bg-white">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                    <Clock className="w-6 h-6 text-sky-600" />
                    {title}
                </h3>
                <button
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-sky-50 text-gray-600 hover:text-sky-700 rounded-xl transition-all text-sm font-semibold border border-gray-200"
                >
                    {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                    {sortOrder === 'asc' ? "Cũ nhất" : "Mới nhất"}
                </button>
            </div>

            <div className="relative">
                {sortedData.map((node, idx) => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        isLast={idx === sortedData.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

const TreeNode = ({ node, isLast }: { node: TreeItem; isLast: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="relative flex gap-6">
            {/* Cột Timeline dọc */}
            <div className="flex flex-col items-center">
                <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 border-sky-500 rounded-full shadow-[0_0_0_4px_rgba(14,165,233,0.1)] group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 bg-sky-500 rounded-full" />
                </div>
                {!isLast && <div className="w-0.5 h-full bg-gray-100 my-1" />}
            </div>

            {/* Nội dung bên phải */}
            <div className="flex-1 pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        <h4
                            className="text-lg font-bold text-gray-800 hover:text-sky-600 cursor-pointer transition-colors"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {node.title}
                        </h4>
                        {hasChildren && (
                            <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-gray-100 rounded-lg">
                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>
                        )}
                    </div>

                    {/* Badge thời gian linh hoạt */}
                    <div className="inline-flex items-center text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 w-fit">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>{node.startDate}</span>
                        <span className="mx-1.5">-</span>
                        <span>{node.endDate || "Hiện tại"}</span>
                    </div>
                </div>

                {/* Description & Sub-description */}
                <div className="space-y-2">
                    <p className="text-gray-600 text-[15px] leading-relaxed italic">
                        {node.description ?? node.title}
                    </p>
                    {node.subDescription && (
                        <p className="text-gray-400 text-sm font-medium leading-relaxed italic">
                            {node.subDescription}
                        </p>
                    )}
                </div>

                {/* Children (Đệ quy) */}
                {hasChildren && isExpanded && (
                    <div className="mt-6 ml-1 border-l-2 border-dashed border-gray-100 pl-8">
                        {node.children!.map((child, idx) => (
                            <TreeNode
                                key={child.id}
                                node={child}
                                isLast={idx === node.children!.length - 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TreeView;