import SelectDraft from './components/SelectDraft';
import {useTranslations} from 'next-intl';
import FAQSection from './components/FAQSection';
import DraftSetting from './components/DraftSetting';
import TutorialSteps from './components/TutorialSteps';
import {FileJson2, ArrowDownToLine, MoveUpRight} from 'lucide-react';

export default function Home() {
  const t = useTranslations('Home');
  const steps = [1,2,3].map(i=>({title:t(`TutorialStep${i}Title`),description:t(`TutorialStep${i}Description`)}));
  return <main id="main-content">
    <section className="page-shell grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div>
        <p className="eyebrow mb-5">JianyingPro · KeyframeAi</p>
        <h1 className="page-title max-w-2xl">{t('Title')}</h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">{t('Description')}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3"><SelectDraft/><DraftSetting/></div>
      </div>
      <div aria-hidden="true" className="min-w-0 rounded-[28px] border bg-card p-5 shadow-[0_24px_80px_-40px_#315b8a50] sm:p-7">
        <div className="mb-6 flex items-center gap-1.5"><span className="size-2 rounded-full bg-border"/><span className="size-2 rounded-full bg-border"/><span className="size-2 rounded-full bg-border"/><span className="ml-auto text-xs text-muted-foreground">draft_info.json</span></div>
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-[#edf3f9]">
          <div className="absolute inset-8 rounded-lg border border-primary/15 sm:inset-12"/>
          <div className="flex w-full items-center justify-center gap-3 text-primary sm:gap-7"><FileJson2 className="size-8 shrink-0 sm:size-10 stroke-[1.25]"/><span className="h-px w-4 sm:w-9 bg-primary/25"/><MoveUpRight className="size-10 shrink-0 sm:size-14 stroke-[1.1]"/><span className="h-px w-4 sm:w-9 bg-primary/25"/><ArrowDownToLine className="size-8 shrink-0 sm:size-10 stroke-[1.25]"/></div>
        </div>
        <div className="mt-7 space-y-3">{[0,1,2].map(i=><div key={i} className="flex h-9 items-center gap-2 rounded-md bg-secondary/70 px-3"><span className="size-1.5 rounded-full bg-primary/35"/><span className="h-px flex-1 bg-primary/15"/>{[0,1,2,3].map(j=><span key={j} className="mx-2 size-2 rotate-45 rounded-[1px] bg-primary/60"/>)}</div>)}</div>
      </div>
    </section>
    <section className="border-y bg-card"><div className="page-shell section-space"><p className="eyebrow mb-3">{t('TutorialStep')}</p><h2 className="section-title mb-12">{t('HowUse')}</h2><TutorialSteps steps={steps}/></div></section>
    <div className="page-shell max-w-4xl"><FAQSection/></div>
  </main>;
}
