import assert from 'node:assert/strict';

// Run against the local dev or production server: BASE_URL=http://localhost:3002 node tests/core-api.mjs
const base = process.env.BASE_URL || 'http://localhost:3000';
const fixture = () => ({
  canvas_config: { width: 1920, height: 1080, ratio: '16:9' },
  materials: { videos: [{ width: 1920, height: 1080 }], material_animations: [] },
  tracks: [{ segments: [{ source_timerange: { duration: 5000000 }, clip: { scale: { x: 1, y: 1 } }, common_keyframes: [{ id: 'existing' }], extra_material_refs: [] }] }],
  preserved_metadata: 'keep-me',
});
for (const direction of ['scaleDown', 'scaleUp', 'leftToRight', 'rightToLeft', 'topToBottom', 'bottomToTop']) {
  const response = await fetch(`${base}/api/generate?filename=draft_info.json`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ draft: fixture(), options: { keyframeSpeed: 3, inKeyframeTypeCheckedList: [direction], isClearKeyframes: true, isInAnimation: false, isClearAnimations: false } }),
  });
  assert.equal(response.status, 200, `${direction}: HTTP success`);
  const result = await response.json();
  assert.equal(result.preserved_metadata, 'keep-me');
  const keys = result.tracks[0].segments[0].common_keyframes;
  assert.equal(keys.length, direction.startsWith('scale') ? 1 : 2);
  assert.equal(keys[0].keyframe_list[1].time_offset, 5000000);
  assert.equal(result.canvas_config.ratio, '16:9');
}
console.log('PASS: all six keyframe directions, duration, canvas and unrelated metadata preserved');

async function processDraft(options = {}, draft = fixture()) {
  const response = await fetch(`${base}/api/generate?filename=${encodeURIComponent('测试 & draft.json')}`, {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({draft, options: {inKeyframeTypeCheckedList: ['scaleUp'], ...options}}),
  });
  assert.equal(response.status, 200);
  return response.json();
}
for (const ratio of [{value:'9:16',width:1080,height:1920},{value:'4:3',width:1920,height:1440}]) {
  const result = await processDraft({videoRatio:ratio});
  assert.deepEqual(result.canvas_config,{width:ratio.width,height:ratio.height,ratio:ratio.value});
  assert.ok(Number.isFinite(result.tracks[0].segments[0].clip.scale.x));
}
const retained = await processDraft({isClearKeyframes:false});
assert.equal(retained.tracks[0].segments[0].common_keyframes[0].id,'existing');
const cleared = await processDraft({isClearKeyframes:true,inKeyframeTypeCheckedList:[]});
assert.deepEqual(cleared.tracks[0].segments[0].common_keyframes,[]);
const animated = await processDraft({isInAnimation:true,inAnimation:'431636',inAnimationSpeed:750});
assert.equal(animated.materials.material_animations[0].animations[0].duration,750000);
assert.ok(animated.tracks[0].segments[0].extra_material_refs.includes(animated.materials.material_animations[0].id));
const defaultAnimation = await processDraft({isInAnimation:true,inAnimation:'431636'});
assert.equal(defaultAnimation.materials.material_animations[0].animations[0].duration,500000,'animation template must not inherit previous request duration');
const random = await processDraft({isInAnimation:true,isRandomInAnimation:true,inAnimationCheckedList:['431638']});
assert.equal(random.materials.material_animations[0].animations[0].id,'431638');
const animationFixture = fixture();
animationFixture.materials.material_animations = [{id:'old',animations:[]}];
assert.deepEqual((await processDraft({isInAnimation:false,isClearAnimations:false},structuredClone(animationFixture))).materials.material_animations,animationFixture.materials.material_animations);
assert.deepEqual((await processDraft({isInAnimation:false,isClearAnimations:true},animationFixture)).materials.material_animations,[[]]);
for (const body of ['not json',JSON.stringify({draft:{}}),JSON.stringify({draft:fixture(),options:{keyframeSpeed:-1}}),JSON.stringify({draft:fixture(),options:{isInAnimation:true,inAnimation:'unknown'}})]) {
  const response = await fetch(`${base}/api/generate`,{method:'POST',headers:{'Content-Type':'application/json'},body});
  assert.equal(response.status,400);
  assert.equal(typeof (await response.json()).errMsg,'string');
}
console.log('PASS: custom ratios, retain/clear keys and animations, fixed/random animation, request isolation, invalid input');
