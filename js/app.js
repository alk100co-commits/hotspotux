(function(){
  'use strict';
  const KEY='amirNetStateV2';
  const cardsKey='amirNetCardsV1';
  const controllerKey='amirNetController';
  const defaultController='http://192.168.88.2:8080/api.php';
  const publicToken='AMIR-NET-LOCAL-2026-9f4c7a2b';
  const read=(k,def={})=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(def))}catch(e){return def}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const toast=(message,type='info')=>{
    let host=document.getElementById('toastHost');
    if(!host){host=document.createElement('div');host.id='toastHost';document.body.appendChild(host)}
    const el=document.createElement('div');el.className='toast '+type;
    el.innerHTML='<span class="toast-icon">'+(type==='success'?'✓':type==='error'?'!':'i')+'</span><span>'+message+'</span>';
    host.appendChild(el); requestAnimationFrame(()=>el.classList.add('show')); setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),300)},3300);
  };
  const controller=()=>localStorage.getItem(controllerKey)||defaultController;
  const api=async(action,payload={})=>{
    const url=controller();
    if(!url)return {ok:false,error:'لم يتم ضبط رابط وحدة التحكم'};
    try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({action,secret:publicToken},payload))});return await r.json()}catch(e){return {ok:false,error:'تعذر الوصول إلى وحدة التحكم'}}
  };
  const saveState=s=>write(KEY,s);
  const getState=()=>read(KEY,{});
  function selectSpeed(btn,profile,label,autoApply=false){
    document.querySelectorAll('.speed-btn[data-profile]').forEach(x=>x.classList.remove('active'));
    if(btn)btn.classList.add('active');
    const s=getState();s.speedProfile=profile;s.speedLabel=label;saveState(s);
    const out=document.getElementById('selectedSpeed');if(out){out.textContent='✓ تم اختيار '+label;out.classList.add('show')}
    const hidden=document.getElementById('profileField');if(hidden)hidden.value=profile;
    if(!autoApply)toast('تم اختيار '+label+' بنجاح','success');
  }
  async function applySelectedSpeed(username,profile,label,thenSubmit){
    if(!username){toast('أدخل رقم الكرت أولاً','error');return false}
    toast('جارٍ تطبيق '+label+' على الكرت…','info');
    const res=await api('set_speed',{username,profile,ip:document.body.dataset.clientIp||''});
    if(!res.ok){toast(res.error||'تعذر تطبيق السرعة. تحقق من وحدة التحكم.','error');return false}
    toast('تم تطبيق '+label+' بنجاح','success');
    if(thenSubmit)thenSubmit();
    return true;
  }
  function openHistory(){
    let modal=document.getElementById('historyModal');
    if(!modal){modal=document.createElement('div');modal.id='historyModal';modal.className='modal-backdrop';modal.innerHTML='<div class="modal-card"><button class="modal-close" onclick="AmirNet.closeHistory()">×</button><div class="modal-head"><span class="modal-icon">▣</span><div><b>الكروت السابقة</b><small>الكروت التي استخدمتها على هذا الجهاز</small></div></div><div id="historyList"></div><button class="modal-clear" onclick="AmirNet.clearHistory()">مسح السجل</button></div>';document.body.appendChild(modal)}
    const list=document.getElementById('historyList'),cards=read(cardsKey,[]);
    if(!cards.length) list.innerHTML='<div class="empty-history">لا توجد كروت محفوظة حتى الآن.</div>';
    else list.innerHTML=cards.map((c,i)=>'<button class="history-item" onclick="AmirNet.useHistory('+i+')"><span>▣</span><strong>'+escapeHtml(c)+'</strong><em>استخدام</em></button>').join('');
    modal.classList.add('open');
  }
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  function closeHistory(){document.getElementById('historyModal')?.classList.remove('open')}
  function useHistory(i){const cards=read(cardsKey,[]),v=cards[i];const input=document.getElementById('username');if(input&&v){input.value=v;input.focus()}closeHistory();toast('تم إدخال الكرت من السجل','success')}
  function rememberCard(v){if(!v)return;let a=read(cardsKey,[]).filter(x=>x!==v);a.unshift(v);write(cardsKey,a.slice(0,8))}
  function clearHistory(){write(cardsKey,[]);openHistory();toast('تم مسح سجل الكروت','success')}
  async function toggleGoogle(el){
    const enabled=el.classList.contains('on');
    el.classList.toggle('busy',true);
    const res=await api(enabled?'google_on':'google_off',{ip:document.body.dataset.clientIp||''});
    el.classList.toggle('busy',false);
    if(!res.ok){el.classList.toggle('on');toast(res.error||'تعذر تنفيذ العملية','error');return}
    const s=getState();s.googleUpdatesBlocked=enabled;saveState(s);
    document.getElementById('googleState')?.replaceChildren(document.createTextNode(enabled?'متوقف':'مفعّل'));
    toast(enabled?'تم إيقاف تحديثات متجر بلاي لهذا الاتصال':'تم تفعيل تحديثات متجر بلاي لهذا الاتصال','success');
  }
  async function loadRemoteConfig(){
    try{const r=await api('get_config');if(!r.ok||!r.config)return;const c=r.config.config||r.config||{};document.querySelectorAll('[data-net-name]').forEach(e=>e.textContent=c.network||'الأمير نت');document.querySelectorAll('[data-phone]').forEach(e=>e.textContent=c.phone||'778215553');document.querySelectorAll('[data-developer]').forEach(e=>e.textContent=c.developer||'المبرمج والمهندس عبدالحميد داوؤد');}catch(e){}
  }
  function restore(){
    const s=getState();
    if(s.speedProfile){const b=document.querySelector('[data-profile="'+CSS.escape(s.speedProfile)+'"]');if(b)selectSpeed(b,s.speedProfile,s.speedLabel||b.dataset.label,true)}
    const g=document.getElementById('googleToggle');if(g&&s.googleUpdatesBlocked){g.classList.add('on');document.getElementById('googleState')?.replaceChildren(document.createTextNode('متوقف'))}
  }
  window.AmirNet={selectSpeed,applySelectedSpeed,toggleGoogle,openHistory,closeHistory,useHistory,clearHistory,rememberCard,toast,api,restore};
  document.addEventListener('DOMContentLoaded',()=>{
    restore(); loadRemoteConfig();
    const form=document.getElementById('loginForm');
    if(form)form.addEventListener('submit',async function(e){
      e.preventDefault();const input=document.getElementById('username'),profile=document.getElementById('profileField');
      const username=(input?.value||'').trim();const p=profile?.value||getState().speedProfile||'AMIR-P-DEFAULT';const label=getState().speedLabel||'السرعة الافتراضية';
      if(!username){toast('يرجى إدخال رقم الكرت','error');return}
      rememberCard(username);

      // لا تجعل تعذّر وحدة التحكم يمنع تسجيل الدخول إلى HotSpot.
      // تغيير السرعة ميزة اختيارية؛ المصادقة الأساسية تتم بواسطة RouterOS/User Manager.
      const submitLogin=()=> {
        const password=form.querySelector('input[name="password"]');
        if(password) password.value='';
        form.submit();
      };
      try {
        const res=await Promise.race([api('set_speed',{username,profile:p,ip:document.body.dataset.clientIp||''}),new Promise(resolve=>setTimeout(()=>resolve(null),2500))]);
        if(res && res.ok) {
          toast('تم تطبيق السرعة. جارٍ تسجيل الدخول…','success');
        } else {
          toast('سيتم تسجيل الدخول الآن؛ تعذّر تطبيق السرعة المختارة.','info');
        }
      } catch(err) {
        toast('سيتم تسجيل الدخول الآن؛ تعذّر الاتصال بوحدة التحكم.','info');
      }
      submitLogin();
    });
  });
})();
