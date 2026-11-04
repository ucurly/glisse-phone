import React, {useState, useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Glass, Switch, TabBar, Slider} from 'glisse';
import './style.css';

const h=React.createElement;
const paths={phone:'M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.04 10.9a16 16 0 0 0 4.06 4.06l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92Z',clock:'M12 6v6l4 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',settings:'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-1.9 1.9-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.52V21h-2.7v-.09a1.65 1.65 0 0 0-1-1.52 1.65 1.65 0 0 0-1.82.33l-.06.06-1.9-1.9.06-.06A1.65 1.65 0 0 0 7.92 15a1.65 1.65 0 0 0-1.52-1H6v-2.7h.4a1.65 1.65 0 0 0 1.52-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 1.9-1.9.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.52V5h2.7v.4a1.65 1.65 0 0 0 1 1.52 1.65 1.65 0 0 0 1.82-.33l.06-.06 1.9 1.9-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.52 1H21V14h-.09A1.65 1.65 0 0 0 19.4 15Z',delete:'M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z M18 9l-6 6 M12 9l6 6',mute:'M12 19v3 M8 22h8 M9 9v3a3 3 0 0 0 5.12 2.12 M15 9V6a3 3 0 0 0-5.7-1.3 M5 10v2a7 7 0 0 0 12 4.9 M19 10v2a7 7 0 0 1-.5 2.6 M2 2l20 20',speaker:'M11 5 6 9H2v6h4l5 4V5Z M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14',pause:'M8 5v14 M16 5v14',grid:'M4 4h4v4H4z M10 4h4v4h-4z M16 4h4v4h-4z M4 10h4v4H4z M10 10h4v4h-4z M16 10h4v4h-4z',plus:'M12 5v14 M5 12h14',search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.35-4.35',arrow:'M5 12h14 M12 5l7 7-7 7',moon:'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',wifi:'M2 8.82a15 15 0 0 1 20 0 M5 12.86a10 10 0 0 1 14 0 M8.5 16.9a5 5 0 0 1 7 0 M12 20h.01',headphones:'M3 14v-3a9 9 0 0 1 18 0v3 M3 14h4v7H5a2 2 0 0 1-2-2v-5Z M21 14h-4v7h2a2 2 0 0 0 2-2v-5Z'};
function I({name,size=20,fill='none'}){return h('svg',{width:size,height:size,viewBox:'0 0 24 24',fill,stroke:'currentColor',strokeWidth:1.75,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:paths[name]||paths.phone}));}
const contacts=[{name:'Olivia Bennett',role:'Product design',number:'1001',initial:'OB',color:'violet'},{name:'Noah Williams',role:'Engineering',number:'1002',initial:'NW',color:'cyan'},{name:'Sophia Chen',role:'Marketing',number:'1003',initial:'SC',color:'pink'},{name:'Ethan Carter',role:'Customer success',number:'1004',initial:'EC',color:'amber'},{name:'Amelia Brooks',role:'Operations',number:'1005',initial:'AB',color:'green'}];
const initialHistory=[{name:'Olivia Bennett',number:'1001',kind:'outgoing',time:'Today · 10:42',duration:'04:32'},{name:'Noah Williams',number:'1002',kind:'incoming',time:'Today · 09:18',duration:'12:06'},{name:'Sophia Chen',number:'1003',kind:'missed',time:'Yesterday · 18:24',duration:'Missed call'},{name:'Ethan Carter',number:'1004',kind:'outgoing',time:'Yesterday · 15:12',duration:'02:41'}];
function App(){
 const [view,setView]=useState('keypad'),[number,setNumber]=useState(''),[search,setSearch]=useState(''),[call,setCall]=useState(null),[seconds,setSeconds]=useState(0),[muted,setMuted]=useState(false),[speaker,setSpeaker]=useState(false),[held,setHeld]=useState(false),[showPad,setShowPad]=useState(false),[sound,setSound]=useState(true),[fx,setFx]=useState(true),[volume,setVolume]=useState(72),[history,setHistory]=useState(initialHistory),[toast,setToast]=useState(''),[time,setTime]=useState('9:41');const audioCtx=useRef(null),toastTimer=useRef(null);
 useEffect(()=>{const tick=()=>{const d=new Date();setTime(d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:false}))};tick();const id=setInterval(tick,30000);return()=>clearInterval(id)},[]);
 useEffect(()=>{if(!call||held)return;const id=setInterval(()=>setSeconds(s=>s+1),1000);return()=>clearInterval(id)},[call,held]);
 function notify(s){setToast(s);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),3200)}
 function tone(digit){if(!sound)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!audioCtx.current)audioCtx.current=new C();const ctx=audioCtx.current;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=420+Number(digit||0)*32;gain.gain.value=.035;osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.065)}catch{}}
 function dial(d){setNumber(n=>n.length<24?n+d:n);tone(d)}
 function startCall(target=number){if(!target){notify('Enter a number to start a demo call');return}const c=contacts.find(x=>x.number===target);setCall({number:target,name:c?.name||target});setSeconds(0);setMuted(false);setSpeaker(false);setHeld(false);setShowPad(false)}
 function endCall(){if(!call)return;setHistory(prev=>[{name:call.name,number:call.number,kind:'outgoing',time:'Just now',duration:format(seconds)},...prev]);setCall(null);notify('Demo call ended · No SIP connection was made')}
 function format(t){return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`}
 const glass=(cls,children,style={},extra={})=>h(Glass,{className:cls,style:{...style,'--lg-glass-bend':.45,'--lg-glass-dispersion':.4,'--lg-rim-shine':.13,...extra}},children);
 function roundButton(icon,cb,cls='',title=''){return h('button',{className:'round '+cls,onClick:cb,title,'aria-label':title||icon},h(I,{name:icon,size:20}))}
 const header=h('header',{className:'topbar'},h('div',{className:'brand-mark'},h('div',{className:'brand-icon'},h(I,{name:'phone',size:19})),h('div',null,h('b',null,'glisse',h('span',{className:'brand-light'},'phone')),h('small',null,'LIQUID COMMUNICATIONS'))),h('div',{className:'top-right'},h('span',{className:'demo-pill'},h('i'), 'INTERACTIVE DEMO'),h('span',{className:'clock'},time),roundButton('settings',()=>setView('settings'),'gear','Settings')));
 const navItems=[{value:'keypad',label:'Keypad',icon:h(I,{name:'grid'})},{value:'recents',label:'Recents',icon:h(I,{name:'clock'})},{value:'contacts',label:'Contacts',icon:h(I,{name:'users'})},{value:'settings',label:'Settings',icon:h(I,{name:'settings'})}];
 const dialer=h('section',{className:'phone-content'},h('div',{className:'mini-heading'},h('span',null,'DIALER'),h('span',{className:'mini-on'},h('i'),' Demo mode')),h('div',{className:'dial-display'},h('div',{className:'display-label'},'ENTER PHONE NUMBER'),h('div',{className:'number-row'},h('span',{className: 'dial-number '+(!number?'placeholder':'')},number||'Enter a number'),number&&roundButton('delete',()=>setNumber(x=>x.slice(0,-1)),'delete-btn','Delete digit')),h('p',null,'Use the keypad or select a contact below.')),h('div',{className:'dial-grid'},...['1','2','3','4','5','6','7','8','9','*','0','#'].map((n,i)=>h('button',{key:n,className:'digit',onClick:()=>dial(n)},h('span',null,n),h('small',null,['','ABC','DEF','GHI','JKL','MNO','PQRS','TUV','WXYZ','','+',''][i])))),h('div',{className:'dial-actions'},h('span',null,'SIMULATED CALL'),h('button',{className:'call-button',onClick:()=>startCall(),title:'Start demo call'},h(I,{name:'phone',size:25})),h('button',{className:'add-button',onClick:()=>notify('Add contact is not available in this demo'),title:'Add contact'},h(I,{name:'plus',size:20}))),h('div',{className:'hint'},h('span',null,'✦'), ' Beautiful glass. Zero network calls.'));
 const listContacts=h('section',{className:'list-content'},
  h('div',{className:'section-kicker'},'YOUR PEOPLE'),
  h('h2',null,'Contacts',h('span',null,String(contacts.length).padStart(2,'0'))),
  h('div',{className:'searchbox'},h(I,{name:'search',size:19}),h('input',{placeholder:'Search people or extensions',value:search,onChange:e=>setSearch(e.target.value)})),
  h('div',{className:'rows'},...contacts.filter(c=>(c.name+' '+c.number).toLowerCase().includes(search.toLowerCase())).map(c=>
   h('button',{className:'contact-row',key:c.number,onClick:()=>startCall(c.number)},
    h('span',{className:'avatar '+c.color},c.initial),
    h('span',{className:'person'},h('strong',null,c.name),h('small',null,c.role)),
    h('span',{className:'extension'},c.number),h(I,{name:'phone',size:18})
   )
  ))
 );
 const listHistory=h('section',{className:'list-content'},
  h('div',{className:'section-kicker'},'EVERY CONNECTION'),
  h('h2',null,'Recents',h('span',null,String(history.length).padStart(2,'0'))),
  h('p',{className:'list-desc'},'Your demo call activity, all in one place.'),
  h('div',{className:'rows'},...history.map((c,i)=>
   h('button',{className:'contact-row',key:i,onClick:()=>startCall(c.number)},
    h('span',{className:'history-icon '+c.kind},h(I,{name:'phone',size:17})),
    h('span',{className:'person'},h('strong',null,c.name),h('small',null,c.time)),
    h('span',{className:'duration'},c.duration),h(I,{name:'arrow',size:16})
   )
  ))
 );
 const settings=h('section',{className:'list-content settings-content'},h('div',{className:'section-kicker'},'YOUR EXPERIENCE'),h('h2',null,'Preferences'),h('p',{className:'list-desc'},'Make the demo yours.'),h('div',{className:'settings-row'},h('div',null,h('strong',null,'Liquid Glass rendering'),h('small',null,'Keep the animated backdrop in motion')),h(Switch,{'aria-label':'Liquid Glass rendering',checked:fx,onCheckedChange:setFx})),h('div',{className:'settings-row'},h('div',null,h('strong',null,'Keypad sounds'),h('small',null,'Soft tones when dialing')),h(Switch,{'aria-label':'Keypad sounds',checked:sound,onCheckedChange:setSound})),h('div',{className:'volume-title'},h('strong',null,'Interface intensity'),h('span',null,volume+'%')),h('div',{className:'slider-wrap'},h(Slider,{'aria-label':'Intensity',value:volume,onValueChange:setVolume})),h('div',{className:'settings-note'},h(I,{name:'wifi',size:21}),h('div',null,h('strong',null,'SIP not connected'),h('p',null,'This is a visual demo. For real calls, WebRTC with a compatible WSS SIP server is required.'))));
 const content={keypad:dialer,contacts:listContacts,recents:listHistory,settings};
 const oncall=call ? h('div',{className:'call-overlay'},
  h('div',{className:'call-glow'}),
  h('div',{className:'call-kicker'},h('i'),held?'ON HOLD':'DEMO CALL IN PROGRESS'),
  h('div',{className:'call-profile'},h('div',{className:'call-avatar'},call.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()),h('h2',null,call.name),h('p',null,call.number),h('div',{className:'call-timer'},format(seconds))),
  h('div',{className:'call-controls'},...[
   ['mute','Mute',()=>setMuted(!muted),muted],
   ['speaker','Speaker',()=>setSpeaker(!speaker),speaker],
   ['pause','Hold',()=>setHeld(!held),held],
   ['grid','Keypad',()=>setShowPad(!showPad),showPad]
  ].map(([icon,label,fn,on])=>h('button',{className:'control '+(on?'active':''),onClick:fn,key:label},h(I,{name:icon,size:23}),h('small',null,label)))),
  showPad&&h('div',{className:'dtmf-row'},...['1','2','3','4','5','6','7','8','9','*','0','#'].map(x=>h('button',{key:x,onClick:()=>tone(x)},x))),
  h('button',{className:'hangup',onClick:endCall},h(I,{name:'phone',size:25,fill:'currentColor'})),
  h('p',{className:'call-bottom'},'SIMULATED AUDIO · NO SIP TRAFFIC')
 ) : null;
 return h('main',{className:'app'+(!fx?' no-motion':''),style:{'--intensity':volume/100}},
   h('div',{className:'wallpaper','data-glisse-backdrop':true},
      h('div',{className:'orb orb-a'}),h('div',{className:'orb orb-b'}),h('div',{className:'orb orb-c'}),
      h('div',{className:'ridge ridge-a'}),h('div',{className:'ridge ridge-b'})),
   h('div',{className:'shell'},
      header,
      h('div',{className:'layout'},
         h('aside',{className:'left-rail'},
            h('div',{className:'rail-title'},'WORKSPACE'),
            h('div',{className:'rail-nav'},...navItems.map(item=>h('button',{onClick:()=>setView(item.value),className:'rail-link '+(view===item.value?'selected':''),key:item.value},h('span',null,item.icon),item.label,view===item.value&&h('i')))),
            h('div',{className:'rail-bottom'},
               h('div',{className:'rail-glass'},glass('small-lens',h(I,{name:'headphones',size:24}),{width:66,height:66,borderRadius:33,background:'none'}),h('b',null,'Your space.'),h('p',null,'Sound beautiful. Feel connected.')),
               h('div',{className:'rail-status'},h('i'),'Ready to explore'))),
         h('div',{className:'main-stage'},
            h('div',{className:'headline'},
               h('div',null,h('div',{className:'eyebrow'},'THE NEXT GENERATION OF CALLING'),h('h1',null,'Every call.',h('br'),h('em',null,'A little more magic.'))),
               h('p',null,'A softphone reimagined with the real Glisse liquid glass components.')),
            h('div',{className:'device-wrap'},
               h('div',{className:'device-glow'}),
               h('div',{className:'phone-frame'},
                  h('div',{className:'phone-surface'},
                     h('div',{className:'device-status'},h('b',null,time),h('div',{className:'dynamic-island'}),h('span',null,'◕  ▰ ▰')),
                     h('div',{className:'device-title'},
                        h('div',null,h('span',{className:'title-sub'},'GLISSE / 01'),h('h2',null,view==='keypad'?'Phone':view==='contacts'?'People':view==='recents'?'History':'Settings')),
                        h('div',{className:'device-status-dot'},h('span',null,'●'),' Demo')),
                     h('div',{className:'content-swap',key:view},content[view]),
                     h('div',{className:'bottom-nav'},h(TabBar,{'aria-label':'Navigation',items:navItems,value:view,onValueChange:setView})),
                     h('div',{className:'home-indicator'}),oncall))))),
      h('div',{className:'footline'},
         h('span',null,'✦ Built with the original ',h('a',{href:'https://glisse.kelvinzhang.com/',target:'_blank',rel:'noreferrer'},'Glisse library')),
         h('span',null,'UI PROTOTYPE · 2026'))),
   toast&&h('div',{className:'toast'},toast)
 );
}
try{createRoot(document.getElementById('root')).render(h(App))}catch(e){document.getElementById('root').textContent='Failed to initialize. '+e.message;console.error(e)}
