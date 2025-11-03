
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TableOfContents } from "lucide-react";

type AuditReport = {
    _id: string;
    title: string;
    filename: string;
    uploader: string;
    createdAt: string;
};

export default function AuditReportsPublic() {
    const [reports, setReports] = useState<AuditReport[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            const res = await fetch("/api/audit-reports");
            const data = await res.json();
            setReports(data);
        };
        fetchReports();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-red-500 py-20 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-sans font-black text-white mb-4 leading-snug tracking-tight">
                        Audit Reports for ISO Standards and NFGS
                    </h1>

                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>

                </div>
            </section>

            {/* Reports Grid */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                {reports.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No audit reports available</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {reports.map((r) => (
                            <div
                                key={r._id}
                                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                            >
                                {/* Card Header */}

                                <div className="bg-slate-200 p-6 flex items-center space-x-3">
                                    <TableOfContents />
                                    <h3 className="text-xl font-bold text-black leading-tight">{r.title}</h3>
                                </div>


                                {/* Card Body */}
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-6">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="font-medium text-gray-700 mr-1">{r.uploader}</span>
                                        <span className="mx-2">•</span>
                                        <time className="text-gray-500">
                                            {new Date(r.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    </div>

                                    <Link
                                        href={`/uploads/${r.filename}`}
                                        target="_blank"
                                        className="inline-flex items-center justify-center w-full bg-black  text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 group-hover:bg-red-600"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download PDF
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}