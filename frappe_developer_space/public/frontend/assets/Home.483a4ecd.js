import{G as u,D as g,f as m,h as n,w as t,e as r,t as d,s as c,o as _,Q as a}from"./vendor.ad6fe203.js";const f={name:"Home",data(){return{showDialog:!1}},resources:{ping:{url:"ping"}},components:{Dialog:g}},D={class:"max-w-3xl py-12 mx-auto"},h=a(" Click to send 'ping' request "),w=a("Open Dialog"),k=a(" Dialog content ");function v(e,o,C,V,s,$){const l=c("Button"),p=c("Dialog");return _(),m("div",D,[n(l,{"icon-left":"code",onClick:e.$resources.ping.fetch,loading:e.$resources.ping.loading},{default:t(()=>[h]),_:1},8,["onClick","loading"]),r("div",null,d(e.$resources.ping.data),1),r("pre",null,d(e.$resources.ping),1),n(l,{onClick:o[0]||(o[0]=i=>s.showDialog=!0)},{default:t(()=>[w]),_:1}),n(p,{title:"Title",modelValue:s.showDialog,"onUpdate:modelValue":o[1]||(o[1]=i=>s.showDialog=i)},{default:t(()=>[k]),_:1},8,["modelValue"])])}var x=u(f,[["render",v]]);export{x as default};
