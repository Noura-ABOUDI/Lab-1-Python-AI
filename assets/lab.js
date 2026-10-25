(function(){
  var fr=document.documentElement.lang==='fr';
  var T=fr?{copy:'Copier le code',ok:'Copié',code:'Code'}:{copy:'Copy code',ok:'Copied',code:'Code'};
  function mkBtn(getText,small){
    var b=document.createElement('button');b.className='copy';b.type='button';b.textContent=small?(fr?'Copier':'Copy'):T.copy;
    b.onclick=function(){
      if(!navigator.clipboard)return;
      navigator.clipboard.writeText(getText()).then(function(){
        b.textContent=T.ok;setTimeout(function(){b.textContent=small?(fr?'Copier':'Copy'):T.copy;},1500);
      });
    };
    return b;
  }
  var wrap=document.querySelector('main .wrap'),out=document.getElementById('allsol');
  if(out){
    var parts=[],cur=null;
    Array.prototype.forEach.call(wrap.querySelectorAll('h2, pre'),function(el){
      if(el.tagName==='H2'){cur=/^p\d$/.test(el.id)?{title:el.textContent,items:[]}:null;if(cur)parts.push(cur);return;}
      if(!cur||el.closest('#allsol'))return;
      if(!(el.classList.contains('sol')||el.closest('details')))return;
      var task=el.closest('.task'),q=task&&task.querySelector('b.q');
      cur.items.push((q?q.textContent:el.getAttribute('data-label')||T.code)+'|'+el.textContent.replace(/\s+$/,''));
    });
    parts.forEach(function(p){
      var code=p.items.map(function(s){var i=s.indexOf('|');return '# ===== '+s.slice(0,i)+' =====\n'+s.slice(i+1);}).join('\n\n');
      var h=document.createElement('h3');h.textContent=p.title;out.appendChild(h);
      out.appendChild(mkBtn(function(){return code;}));
      var pre=document.createElement('pre'),c=document.createElement('code');c.textContent=code;pre.appendChild(c);out.appendChild(pre);
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('main pre'),function(pre){
    if(pre.closest('#allsol'))return;
    var box=document.createElement('div');box.className='codebox';
    pre.parentNode.insertBefore(box,pre);box.appendChild(pre);
    box.appendChild(mkBtn(function(){return pre.textContent;},true));
  });
})();
