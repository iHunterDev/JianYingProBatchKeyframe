// Disposable local Copilot protocol fixture. Never accesses real drafts.
import {createServer} from 'node:http';
import {writeFileSync,readFileSync} from 'node:fs';
const port = Number(process.env.COPILOT_TEST_PORT || 9517);
const draftPath = '/fixture/测试 & sample/draft_info.json';
const draft = () => ({canvas_config:{width:1920,height:1080,ratio:'16:9'}, materials:{videos:[{width:1920,height:1080}],material_animations:[]}, tracks:[{segments:[{source_timerange:{duration:5000000},clip:{scale:{x:1,y:1}},common_keyframes:[],extra_material_refs:[]}]}], fixture_metadata:'preserve'});
createServer(async (request,response)=>{
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers','Content-Type');
  response.setHeader('Access-Control-Allow-Private-Network','true');
  response.setHeader('Content-Type','application/json');
  if(request.method==='OPTIONS'){response.writeHead(204);response.end();return;}
  let mode = 'success';
  try { mode = readFileSync('/tmp/keyframe-copilot-mode','utf8').trim(); } catch {}
  const url = new URL(request.url,`http://localhost:${port}`);
  if(url.pathname==='/api/v1/drafts' && mode==='list-error'){response.writeHead(500);response.end('{}');return;}
  if(url.pathname==='/api/v1/drafts' && mode==='empty'){response.end(JSON.stringify({data:[]}));return;}
  if(url.pathname==='/api/v1/draft' && (mode==='read-error' || (mode==='save-error' && request.method==='POST'))){response.writeHead(500);response.end('{}');return;}
  if(url.pathname==='/api/v1/drafts'){response.end(JSON.stringify({data:[{draft_name:'Regression draft · 测试草稿',draft_json_file:draftPath}]}));return;}
  if(url.pathname==='/api/v1/draft' && request.method==='GET'){
    if(url.searchParams.get('draft_json_file')!==draftPath){response.writeHead(400);response.end('{}');return;}
    response.end(JSON.stringify({data:{draft_info:draft()}}));return;
  }
  if(url.pathname==='/api/v1/draft' && request.method==='POST'){
    let body='';for await(const chunk of request) body+=chunk;
    const saved=JSON.parse(body);
    if(saved.draft_json_file!==draftPath || !saved.draft_info?.tracks?.[0]?.segments?.[0]?.common_keyframes?.length){response.writeHead(400);response.end('{}');return;}
    writeFileSync('/tmp/keyframe-copilot-saved.json',JSON.stringify(saved,null,2));
    response.end(JSON.stringify({data:true}));return;
  }
  response.end(JSON.stringify({status:'ok',fixture:true}));
}).listen(port,'127.0.0.1',()=>console.log(`Disposable Copilot fixture: http://127.0.0.1:${port}`));
