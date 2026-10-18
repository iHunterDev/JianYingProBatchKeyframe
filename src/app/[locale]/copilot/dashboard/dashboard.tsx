'use client';
import {useCallback, useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {CheckCircle2, CircleAlert, FolderOpen, Loader2, RefreshCw} from 'lucide-react';
import {copilotFetch} from '@/lib/copilot';
import {readSettings, toDraftOptions} from '@/lib/draft/settings';
import DraftSettingsForm from '../../components/DraftSettingsForm';
import {Label} from '@/components/ui/label';

interface Draft {draft_name: string; draft_json_file: string}
export default function Dashboard({address}: {address: string}) {
  const t = useTranslations('CopilotDashboard');
  const tc = useTranslations('Connection');
  const ts = useTranslations('DraftSetting');
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selected, setSelected] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const loadDrafts = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await copilotFetch(address, '/api/v1/drafts', {signal});
      const body = await response.json();
      if (!Array.isArray(body.data) || !body.data.every((draft: Draft) => typeof draft?.draft_json_file === 'string' && typeof draft?.draft_name === 'string')) throw new Error('Invalid draft list');
      if (signal?.aborted) return;
      setDrafts(body.data); setSelected(value => body.data.some((draft: Draft) => draft.draft_json_file === value) ? value : ''); setLoadState('ready');
    } catch { if (!signal?.aborted) setLoadState('error'); }
  }, [address]);
  useEffect(() => {
    const controller = new AbortController();
    copilotFetch(address, '/api/v1/drafts', {signal: controller.signal}).then(response => response.json()).then(body => {
      if (!Array.isArray(body.data) || !body.data.every((draft: Draft) => typeof draft?.draft_json_file === 'string' && typeof draft?.draft_name === 'string')) throw new Error('Invalid draft list');
      if (controller.signal.aborted) return;
      setDrafts(body.data); setSelected(value => body.data.some((draft: Draft) => draft.draft_json_file === value) ? value : ''); setLoadState('ready');
    }).catch(() => {if (!controller.signal.aborted) setLoadState('error');});
    return () => controller.abort();
  }, [address]);
  async function processDraft() {
    if (!selected || processing) return;
    setProcessing(true); setResult(null);
    try {
      const response = await copilotFetch(address, `/api/v1/draft?draft_json_file=${encodeURIComponent(selected)}`);
      const body = await response.json();
      if (!body.data?.draft_info) throw new Error('Invalid draft');
      const generated = await fetch('/api/generate?filename=draft_info.json', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({draft: body.data.draft_info, options: toDraftOptions(readSettings())}),
        signal: AbortSignal.timeout(60000),
      });
      const processed = await generated.json();
      if (!generated.ok || processed.errMsg) throw new Error('Processing failed');
      await copilotFetch(address, '/api/v1/draft', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({draft_json_file: selected, draft_info: processed}),
      });
      setResult('success');
    } catch { setResult('error'); }
    finally { setProcessing(false); }
  }
  return <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
    <section className="min-w-0 rounded-2xl border bg-card p-6 sm:p-8">
      <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold"><FolderOpen className="size-5 text-primary" aria-hidden="true"/>{t('SelectDraft')}</h2>
      <div role="note" className="mb-7 rounded-xl bg-accent p-4 text-sm leading-relaxed text-accent-foreground"><strong>{t('WarningNotice')}</strong> {t('WarningNoticeText')}</div>
      {loadState === 'loading' ? <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin"/>{tc('LoadingDrafts')}</p> : loadState === 'error' ? <p role="alert" className="text-sm text-destructive">{tc('DraftLoadError')}</p> : drafts.length === 0 ? <p className="text-sm leading-relaxed text-muted-foreground">{tc('EmptyDrafts')}</p> : <div><Label htmlFor="draft-select" className="mb-2 block">{t('SelectDraft')}</Label><select id="draft-select" value={selected} onChange={event=>{setSelected(event.target.value);setResult(null);}} disabled={processing} className="min-h-12 w-full rounded-xl border bg-background px-3 text-sm"><option value="">{t('SelectDraft')}</option>{drafts.map(draft=><option key={draft.draft_json_file} value={draft.draft_json_file}>{draft.draft_name}</option>)}</select></div>}
      <button className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline disabled:opacity-50" disabled={loadState === 'loading' || processing} onClick={()=>{setLoadState('loading');void loadDrafts();}}><RefreshCw className="size-4" aria-hidden="true"/>{tc('RefreshDrafts')}</button>
      <button className="action-primary mt-6 w-full" disabled={!selected || processing || loadState !== 'ready'} aria-busy={processing} onClick={()=>void processDraft()}>{processing && <Loader2 className="size-4 animate-spin" aria-hidden="true"/>}{processing ? tc('Processing') : t('AddButton')}</button>
      {result && <div role={result === 'error' ? 'alert' : 'status'} className={`mt-5 flex items-start gap-2 text-sm leading-relaxed ${result === 'error' ? 'text-destructive' : 'text-primary'}`}>{result === 'error' ? <CircleAlert className="mt-0.5 size-4 shrink-0"/> : <CheckCircle2 className="mt-0.5 size-4 shrink-0"/>}<p>{result === 'error' ? tc('ProcessError') : `${t('AddSuccessTitle')} ${t('AddSuccessText')}`}</p></div>}
    </section>
    <section className="min-w-0 rounded-2xl border bg-card p-6 sm:p-8"><h2 className="mb-2 text-xl font-semibold">{ts('DraftSetting')}</h2><p className="mb-8 text-sm text-muted-foreground">{ts('SavedAutomatically')}</p><fieldset disabled={processing}><DraftSettingsForm/></fieldset></section>
  </div>;
}
