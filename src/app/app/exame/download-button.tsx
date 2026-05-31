"use client";

import { useState } from "react";
import { Download, CheckCircle2, Loader2 } from "lucide-react";

interface DownloadButtonProps {
  url: string;
  protocolo: string;
}

export default function DownloadButton({ url, protocolo }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  async function handleDownload() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDownloaded(true);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laudo-${protocolo}.pdf`;
    a.click();
  }

  if (downloaded) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 font-semibold py-3.5 rounded-xl text-sm">
          <CheckCircle2 className="size-4" />
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
          <Loader2 className="size-4 animate-spin" />
          Preparando o laudo...
        </>
      ) : (
        <>
          <Download className="size-4" />
          Baixar laudo em PDF
        </>
      )}
    </button>
  );
}
