const menu=document.getElementById("menu");
const nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

// const form=document.getElementById("form");
// const status=document.getElementById("status");
// form.addEventListener("submit",e=>{
//   e.preventDefault();
//   const name=form.elements.name.value.trim();
//   status.textContent=`Thank you${name ? ", "+name : ""}! Your message has been received on this demo site.`;
//   form.reset();
// });

const f=document.getElementById("form");
const s=document.getElementById('status');
const b=f.querySelector('button');
f.addEventListener('submit',async e=>{
    e.preventDefault();
    s.className='';
    s.textContent='Sending...';
    b.disabled=true;
    try {
        const r=await fetch(f.action,{
                method:'POST',body:new FormData(f),
                headers:{ Accept:'application/json' }
        });
        if (r.ok) {
            s.className='success';
            s.textContent='Thank you! Your message has been sent to DECODE.';
            f.reset()
        } else {
            s.className='error';
            s.textContent='Something went wrong. Please try again.';
        }
    } catch(x) {
        s.className='error';
        s.textContent='Unable to send right now. Please try again.';
    } finally {
        b.disabled=false;
    }
});


const sections=document.querySelectorAll("main section[id]");
const links=document.querySelectorAll("nav a");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>link.style.opacity=link.getAttribute("href")==="#"+entry.target.id?"1":".75");
    }
  });
},{rootMargin:"-40% 0px -50% 0px"});
sections.forEach(s=>observer.observe(s));
