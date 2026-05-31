'use client';

import { formatBytes } from '@/helpers/format-bytes';
import { useRef, useState } from 'react';

interface FileDropzoneProps {
    value?: File;
    onChange: (file: File | undefined) => void;
    accept?: string;
    maxSize?: number; // bytes
    disabled?: boolean;
    error?: boolean;
    name?: string;
    onBlur?: () => void;
}

export default function FileDropzone({
    value,
    onChange,
    accept = 'application/pdf',
    maxSize = 20 * 1024 * 1024,
    disabled,
    error,
    name,
    onBlur,
}: FileDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    function handleFile(file: File) {
        onChange(file);
    }

    if (value) {
        return (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{value.name}</p>
                    <p className="text-xs text-slate-500">{formatBytes(value.size)}</p>
                </div>
                {!disabled && (
                    <button
                        type="button"
                        onClick={() => {
                            onChange(undefined);
                            if (inputRef.current) inputRef.current.value = '';
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remover arquivo"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            <div
                onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    if (disabled) return;
                    const f = e.dataTransfer.files[0];
                    if (f) handleFile(f);
                }}
                onClick={() => { if (!disabled) inputRef.current?.click(); }}
                className={`flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-colors select-none
                    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${dragging
                        ? 'border-blue-500 bg-blue-50'
                        : error
                            ? 'border-red-300 bg-red-50 hover:border-red-400'
                            : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
            >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dragging ? 'bg-blue-100' : 'bg-slate-100'}`}>
                    <svg className={`w-6 h-6 ${dragging ? 'text-blue-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">
                        {dragging ? 'Solte o arquivo aqui' : 'Arraste o PDF aqui'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        ou clique para selecionar · máximo {formatBytes(maxSize)}
                    </p>
                </div>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                disabled={disabled}
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                }}
            />
        </>
    );
}
