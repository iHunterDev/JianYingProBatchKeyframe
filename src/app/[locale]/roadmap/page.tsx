import DocumentPage, {documentMetadata, type DocumentProps} from '@/components/DocumentPage';
export const generateMetadata = (props: DocumentProps) => documentMetadata('roadmap', props);
export default function Page(props: DocumentProps) { return <DocumentPage kind="roadmap" {...props}/>; }
