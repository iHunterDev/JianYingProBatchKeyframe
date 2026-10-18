"use client";
import {useTranslations} from 'next-intl';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger} from '@/components/ui/dialog';
import DraftSettingsForm from './DraftSettingsForm';

export default function DraftSetting() {
  const t = useTranslations('DraftSetting');
  return <Dialog>
    <DialogTrigger className="action-secondary">{t('DraftSetting')}</DialogTrigger>
    <DialogContent className="max-h-[85dvh] overflow-y-auto">
      <DialogHeader><DialogTitle>{t('DraftSetting')}</DialogTitle><DialogDescription>{t('SavedAutomatically')}</DialogDescription></DialogHeader>
      <DraftSettingsForm/>
    </DialogContent>
  </Dialog>;
}
