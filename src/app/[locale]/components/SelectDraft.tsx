'use client';
import {useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {CheckCircle2, CircleAlert, Loader2, Upload} from 'lucide-react';
import {readSettings, toDraftOptions} from '@/lib/draft/settings';

export default function SelectDraft() {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Home');
  const tu = useTranslations('Upload');
  const [processing,setProcessing] = useState(false);
  const [status,setStatus] = useState<'success' | 'error' | null>(null);
  const [error,setError] = useState('');
  async function upload() {
    const file = inputRef.current?.files?.[0];
    if (!file || processing) return;
    setProcessing(true);setStatus(null);
    try {
      let draft: unknown;
      try { draft = JSON.parse(await file.text()); }
      catch { throw new Error(tu('InvalidJson')); }
      const response = await fetch(`/api/generate?filename=${encodeURIComponent(file.name)}`, {
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({draft,options:toDraftOptions(readSettings())}),
        signal:AbortSignal.timeout(60000),
      });
      if (!response.ok) throw new Error(tu('ProcessError'));
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href=url;link.download=file.name;
      document.body.appendChild(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),0);
      setStatus('success');
    } catch (error:unknown) {
      setError(error instanceof Error && [tu('InvalidJson'),tu('ProcessError')].includes(error.message) ? error.message : tu('ConnectionError'));
      setStatus('error');
    } finally {setProcessing(false);if(inputRef.current) inputRef.current.value='';}
  }
  return <div className="max-w-full">
    <label aria-busy={processing} className={`action-primary relative cursor-pointer focus-within:outline-3 focus-within:outline-offset-4 focus-within:outline-primary ${processing?'opacity-60':''}`}>
      {processing ? <Loader2 className="size-4 animate-spin" aria-hidden="true"/> : <Upload className="size-4" aria-hidden="true"/>}
      <span>{processing?tu('Processing'):t('SelectDraft')}</span>
      <input type="file" aria-label={t('SelectDraft')} disabled={processing} className="absolute inset-0 w-full cursor-pointer rounded-full opacity-0" accept=".json,application/json" ref={inputRef} onChange={()=>void upload()}/>
    </label>
    {status && <div role={status==='error'?'alert':'status'} className={`mt-4 flex max-w-lg items-start gap-2 text-sm leading-relaxed ${status==='error'?'text-destructive':'text-primary'}`}>
      {status==='error'?<CircleAlert className="mt-0.5 size-4 shrink-0"/>:<CheckCircle2 className="mt-0.5 size-4 shrink-0"/>}
      <p>{status==='error'?error:tu('Success')}</p>
    </div>}
  </div>;
}
