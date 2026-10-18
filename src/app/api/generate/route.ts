import {NextResponse} from 'next/server';
import {handleDraft, type Draft, type ProcessorOptions} from '@/lib/draft/processor';

function record(value:unknown): value is Record<string,unknown> {return typeof value === 'object' && value !== null && !Array.isArray(value);}
function positive(value:unknown) {return typeof value === 'number' && Number.isFinite(value) && value > 0;}
function isDraft(value:unknown): value is Draft {
  if (!record(value) || !record(value.canvas_config) || !positive(value.canvas_config.width) || !positive(value.canvas_config.height) || !record(value.materials) || !Array.isArray(value.materials.videos) || !Array.isArray(value.materials.material_animations) || !Array.isArray(value.tracks) || !record(value.tracks[0]) || !Array.isArray(value.tracks[0].segments)) return false;
  const videos = value.materials.videos;
  return value.tracks[0].segments.every((segment,index)=>record(segment) && record(segment.source_timerange) && positive(segment.source_timerange.duration) && record(segment.clip) && record(segment.clip.scale) && Array.isArray(segment.common_keyframes) && Array.isArray(segment.extra_material_refs) && record(videos[index]) && positive(videos[index].width) && positive(videos[index].height));
}
function isOptions(value:unknown): value is ProcessorOptions {
  if (!record(value)) return false;
  for (const key of ['isClearKeyframes','isInAnimation','isClearAnimations','isRandomInAnimation']) if (value[key] !== undefined && typeof value[key] !== 'boolean') return false;
  for (const key of ['inKeyframeTypeCheckedList','inAnimationCheckedList']) if (value[key] !== undefined && (!Array.isArray(value[key]) || !value[key].every(item=>typeof item==='string'))) return false;
  for (const key of ['keyframeSpeed','inAnimationSpeed']) if (value[key] !== undefined && (!Number.isFinite(Number(value[key])) || Number(value[key]) < 0)) return false;
  if (value.inAnimation !== undefined && typeof value.inAnimation !== 'string') return false;
  if (value.videoRatio !== undefined && (!record(value.videoRatio) || typeof value.videoRatio.value !== 'string' || (value.videoRatio.value !== 'auto' && (!positive(value.videoRatio.width) || !positive(value.videoRatio.height))))) return false;
  return true;
}
export async function POST(request:Request) {
  try {
    const body:unknown = await request.json();
    if (!record(body) || !isDraft(body.draft) || !isOptions(body.options ?? {})) return NextResponse.json({errMsg:'Invalid draft or options'},{status:400});
    return NextResponse.json(handleDraft(body.draft,body.options ?? {}));
  } catch (error:unknown) {
    return NextResponse.json({errMsg:error instanceof Error ? error.message : 'Draft processing failed'},{status:400});
  }
}
