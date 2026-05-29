"use client";

import { useState } from "react";

interface DownloadButtonProps {
  url: string;
  protocolo: string;
}

export default function DownloadButton({ url, protocolo }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  async function handleDownload() {
    setLoading(true);
    // TODO: replace with real signed URL fetch before triggering download
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDownloaded(true);
    // Trigger browser download
    const a = document.createElement("a");
    a.href = url;
    a.download = `laudo-${protocolo}.pdf`;
    a.click();
  }

  if (downloaded) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 font-semibold py-3.5 rounded-xl text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Download concluído
        </div>
        <button
          onClick={() => setDownloaded(false)}
          className="text-xs text-slate-400 hover:text-blue-600 transition-colors text-center"
        >
          Baixar novamente
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-200"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Preparando o laudo...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Baixar laudo em PDF
        </>
      )}
    </button>
  );
}
