'use client';
import {useCallback, useEffect, useState, useSyncExternalStore} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {CheckCircle2, CircleAlert, Loader2, PlugZap, RefreshCw} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {DEFAULT_COPILOT_URL, normalizeCopilotUrl, copilotFetch} from '@/lib/copilot';
import Dashboard from './dashboard';

const subscribe = () => () => {};
const readAddress = () => {
  try { return localStorage.getItem('copilot_api_url') || DEFAULT_COPILOT_URL; }
  catch { return DEFAULT_COPILOT_URL; }
};
const saveAddress = (address: string) => {
  try { localStorage.setItem('copilot_api_url', address); } catch { /* Connection remains usable without browser storage. */ }
};
export default function CopilotDashboard() {
  const t = useTranslations('Connection');
  const en = useLocale() === 'en-US';
  const storedAddress = useSyncExternalStore(subscribe, readAddress, () => DEFAULT_COPILOT_URL);
  const [input, setInput] = useState<string>();
  const [status, setStatus] = useState<'checking' | 'connected' | 'offline' | 'invalid'>('checking');
  const [connectedAddress, setConnectedAddress] = useState('');
  const address = input ?? storedAddress;
  const connect = useCallback(async (value: string, signal?: AbortSignal) => {
    let base: string;
    try { base = normalizeCopilotUrl(value); }
    catch { setStatus('invalid'); return; }
    saveAddress(base);
    try {
      const response = await copilotFetch(base, '', {signal});
      await response.text();
      if (signal?.aborted) return;
      saveAddress(base);
      setConnectedAddress(base);
      setStatus('connected');
    } catch {
      if (!signal?.aborted) setStatus('offline');
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve(readAddress()).then(normalizeCopilotUrl).then(async base => {
      const response = await copilotFetch(base, '', {signal: controller.signal});
      await response.text();
      return base;
    }).then(base => {
      if (controller.signal.aborted) return;
      saveAddress(base);
      setConnectedAddress(base);
      setStatus('connected');
    }).catch(() => { if (!controller.signal.aborted) setStatus('offline'); });
    return () => controller.abort();
  }, []);
  const checking = status === 'checking';
  return <main id="main-content" className="page-shell section-space">
    <header className="mb-10"><p className="eyebrow mb-4">KeyframeAi Copilot</p><h1 className="section-title">{t('Title')}</h1><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{t('Description')}</p></header>
    <section className="mb-10 rounded-2xl border bg-card p-6 sm:p-8" aria-label={t('ServerAddress')}>
      <div className="mb-6 flex items-start gap-3" role="status" aria-live="polite">
        {checking ? <Loader2 className="mt-0.5 size-5 shrink-0 animate-spin text-primary"/> : status === 'connected' ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary"/> : <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive"/>}
        <div><h2 className="font-semibold">{t(status === 'connected' ? 'Connected' : checking ? 'Checking' : status === 'invalid' ? 'InvalidAddress' : 'Offline')}</h2>{status !== 'connected' && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(checking ? 'CheckingHelp' : 'OfflineHelp')}</p>}</div>
      </div>
      <form onSubmit={event => {event.preventDefault(); setStatus('checking'); void connect(address);}} className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:max-w-xl"><Label htmlFor="copilot-address" className="mb-2 block">{t('ServerAddress')}</Label><Input id="copilot-address" type="url" required value={address} onChange={event => setInput(event.target.value)} aria-invalid={status === 'invalid'} spellCheck={false} disabled={checking}/></div>
        <button className="action-secondary w-full shrink-0 sm:w-auto" disabled={checking}>{checking ? <Loader2 className="size-4 animate-spin" aria-hidden="true"/> : <RefreshCw className="size-4" aria-hidden="true"/>}{t(status === 'connected' ? 'Reconnect' : 'Retry')}</button>
      </form>
      {status !== 'connected' && <Link href={en ? '/en_US/copilot/download' : '/copilot/download'} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"><PlugZap className="size-4" aria-hidden="true"/>{t('Download')}</Link>}
    </section>
    {status === 'connected' && <Dashboard key={connectedAddress} address={connectedAddress}/>}
  </main>;
}
