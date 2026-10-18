import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import type {Metadata} from 'next';
import {locales} from '@/i18n/i18n-config';
import '@/styles/markdown.css';

type DocumentKind = 'changelog' | 'roadmap' | 'privacy' | 'terms';
export type DocumentProps = {params: Promise<{locale:string}>};
async function readDocument(kind: DocumentKind, locale:string) {
  if (!locales.includes(locale)) notFound();
  const source = await fs.readFile(path.join(process.cwd(), 'src/content', `${kind}_${locale}.mdx`),'utf8');
  const {data, content} = matter(source);
  return {title:String(data.title), content:content.replace(/^\s*# [^\n]+\n\s*(?:-{3,}\s*\n)?/, '')};
}
export async function documentMetadata(kind: DocumentKind, {params}:DocumentProps):Promise<Metadata> {
  const {locale} = await params;
  const {title} = await readDocument(kind,locale);
  return {title:`${title} · KeyframeAi`};
}
export default async function DocumentPage({kind, params}:{kind:DocumentKind} & DocumentProps) {
  const {locale} = await params;
  const en = locale === 'en_US';
  const {title,content} = await readDocument(kind,locale);
  const links = [
    {kind:'changelog',href:'/changelog',label:en?'Changelog':'更新日志'},
    {kind:'roadmap',href:'/roadmap',label:en?'Roadmap':'路线图'},
    {kind:'privacy',href:'/privacy-policy',label:en?'Privacy':'隐私政策'},
    {kind:'terms',href:'/terms-conditions',label:en?'Terms':'服务条款'},
  ];
  return <main id="main-content" className="page-shell section-space">
    <header className="max-w-4xl"><p className="eyebrow mb-5">KeyframeAi</p><h1 className="page-title">{title}</h1></header>
    <nav aria-label={en?'Project information':'项目信息'} className="mt-9 flex flex-wrap gap-x-6 gap-y-1 border-b pb-5">{links.map(link=><Link key={link.kind} href={`${en?'/en_US':''}${link.href}`} aria-current={kind===link.kind?'page':undefined} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary">{link.label}</Link>)}</nav>
    <article className={`markdown-body mt-12 max-w-3xl ${kind==='changelog'?'changelog-body':''}`}><MDXRemote source={content}/></article>
  </main>;
}
