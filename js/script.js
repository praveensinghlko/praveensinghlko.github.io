(function(){
"use strict";

/* ═══ Loader ═══ */
var ld=document.getElementById("loader"),
    fl=document.getElementById("loaderFill"),w=0;
document.body.style.overflow="hidden";
var lt=setInterval(function(){
    w+=Math.random()*20+5;
    if(w>=100){w=100;clearInterval(lt);
    setTimeout(function(){ld.classList.add("out");document.body.style.overflow=""},200)}
    fl.style.width=w+"%";
},80);

/* ═══ Header ═══ */
var hd=document.getElementById("header");
window.addEventListener("scroll",function(){
    hd.classList.toggle("fixed",scrollY>30);
},{passive:true});

/* ═══ Mobile menu ═══ */
var bg=document.getElementById("burger"),nv=document.getElementById("nav");
bg.addEventListener("click",function(){
    bg.classList.toggle("open");nv.classList.toggle("open");
});
nv.querySelectorAll(".nav-link").forEach(function(l){
    l.addEventListener("click",function(){bg.classList.remove("open");nv.classList.remove("open")});
});

/* ═══ Active nav on scroll ═══ */
var secs=document.querySelectorAll("section[id]"),
    links=document.querySelectorAll(".nav-link");
window.addEventListener("scroll",function(){
    var y=scrollY+100;
    secs.forEach(function(s){
        if(y>=s.offsetTop&&y<s.offsetTop+s.offsetHeight){
            links.forEach(function(l){l.classList.toggle("active",l.getAttribute("data-sec")===s.id)});
        }
    });
},{passive:true});

/* ═══ Counter ═══ */
var nums=document.querySelectorAll("[data-to]"),counted=false;
function countUp(){
    if(counted)return;
    nums.forEach(function(n){
        if(n.getBoundingClientRect().top<innerHeight*.85){
            counted=true;
            var to=parseInt(n.getAttribute("data-to")),v=0,inc=to/45;
            var t=setInterval(function(){
                v+=inc;
                if(v>=to){n.textContent=to;clearInterval(t)}
                else n.textContent=Math.floor(v);
            },30);
        }
    });
}
addEventListener("scroll",countUp,{passive:true});countUp();

/* ═══ Showreel ═══ */
var rf=document.getElementById("reelIframe"),
    rc=document.getElementById("reelCover"),
    rb=document.getElementById("reelBtn"),
    vb=document.getElementById("volBtn"),
    vi=document.getElementById("volIcon"),
    muted=true;

if(rb){
    rb.addEventListener("click",function(){
        rf.src=rf.src.replace("muted=1","muted=0").replace("background=1","background=0");
        rc.classList.add("gone");
        vi.className="fas fa-volume-up";
        muted=false;
    });
}
if(vb){
    vb.addEventListener("click",function(){
        if(muted){rb.click();return}
        if(vi.classList.contains("fa-volume-up")){
            rf.src=rf.src.replace("muted=0","muted=1");
            vi.className="fas fa-volume-mute";muted=true;
        }else{
            rf.src=rf.src.replace("muted=1","muted=0");
            vi.className="fas fa-volume-up";muted=false;
        }
    });
}



/* ═══ FAQ ═══ */
document.querySelectorAll(".faq-item").forEach(function(item){
    item.querySelector(".faq-q").addEventListener("click",function(){
        var open=item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(function(i){i.classList.remove("open")});
        if(!open)item.classList.add("open");
    });
});

/* ═══ Contact form ═══ */
var form=document.getElementById("contactForm");
if(form){
    form.addEventListener("submit",function(e){
        e.preventDefault();
        var d=Object.fromEntries(new FormData(form));
        var s=encodeURIComponent("Video Editing Inquiry — "+d.service);
        var b=encodeURIComponent("Name: "+d.name+"\nEmail: "+d.email+"\nService: "+d.service+"\n\n"+d.message);
        window.location.href="mailto:praveensinghaws@gmail.com?subject="+s+"&body="+b;
        var btn=form.querySelector("button[type=submit]"),orig=btn.innerHTML;
        btn.innerHTML='<i class="fas fa-check"></i> Sent!';btn.style.background="#22c55e";
        setTimeout(function(){btn.innerHTML=orig;btn.style.background="";form.reset()},2500);
    });
}

/* ═══ Back to top ═══ */
var tt=document.getElementById("totop");
addEventListener("scroll",function(){tt.classList.toggle("show",scrollY>400)},{passive:true});
tt.addEventListener("click",function(){scrollTo({top:0,behavior:"smooth"})});

/* ═══ Reveal ═══ */
var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add("vis");obs.unobserve(e.target)}
    });
},{threshold:.1,rootMargin:"0px 0px -40px 0px"});

document.querySelectorAll(".sec-top, .svc, .step, .review, .faq-item, .about-wrap, .contact-wrap, .work-item, .reel-player").forEach(function(el){
    el.setAttribute("data-r","");
    obs.observe(el);
});

/* ═══ Reels play ═══ */
document.querySelectorAll(".reel").forEach(function(card){
    var ifr=card.querySelector("iframe"),
        ov=card.querySelector(".reel-ov"),
        now=card.querySelector(".reel-now"),
        btn=card.querySelector(".reel-play");
    if(!btn)return;
    btn.addEventListener("click",function(e){
        e.stopPropagation();
        var id=card.getAttribute("data-vid");
        ifr.src="https://player.vimeo.com/video/"+id+"?autoplay=1&loop=1&title=0&byline=0&portrait=0";
        ov.classList.add("off");
        now.classList.add("on");
    });
});

/* ═══ Films play ═══ */
document.querySelectorAll(".film").forEach(function(card){
    var ifr=card.querySelector("iframe"),
        ov=card.querySelector(".film-ov"),
        now=card.querySelector(".film-now"),
        btn=card.querySelector(".film-play");
    if(!btn)return;
    btn.addEventListener("click",function(e){
        e.stopPropagation();
        var id=card.getAttribute("data-vid");
        ifr.src="https://player.vimeo.com/video/"+id+"?autoplay=1&loop=1&title=0&byline=0&portrait=0";
        ov.classList.add("off");
        now.classList.add("on");
    });
});

})();