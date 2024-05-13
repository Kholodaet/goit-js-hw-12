import{a as b,i as n,S as v}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const w="43226566-fed9ea78cdf96918d4e965adc",M="https://pixabay.com/api/";async function p(i="",t,r){const a=new URLSearchParams({per_page:r,page:t,key:w,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true"}),{data:e}=await b.get(`${M}?${a}`);return e}function m(i){return i.map(({webformatURL:t,largeImageURL:r,tags:a,likes:e,views:o,comments:c,downloads:L})=>`<li class="card">
        <a href="${r}">
          <img src="${t}" alt="${a}" width="360" height="152"/>
        </a>
        <ul class="list-stat">
          <li class="item">
            <h2 class="title">likes</h2>
            <p class="stat">${e}</p>
          </li>
          <li class="item">
            <h2 class="title">Views</h2>
            <p class="stat">${o}</p>
          </li>
          <li class="item">
            <h2 class="title">Comments</h2>
            <p class="stat">${c}</p>
          </li>
          <li class="item">
            <h2 class="title">Downloads</h2>
            <p class="stat">${L}</p>
          </li>
        </ul>
      </li>`).join("")}const s={form:document.querySelector(".js-form"),gallery:document.querySelector(".js-gallery"),btnLoadMore:document.querySelector(".btn-load-more"),loader:document.querySelector(".loader")};let d,u=1,l=15;s.form.addEventListener("submit",S);s.btnLoadMore.addEventListener("click",$);async function S(i){i.preventDefault(),g(),s.gallery.innerHTML="";const{text:t}=i.currentTarget.elements;if(d=t.value.trim(),d===""){f(),n.warning({color:"#fc6e51",message:"Field is empty!",position:"topCenter"});return}try{const{hits:r}=await p(d,u=1,l);if(r.length===0){n.warning({color:"#fc6e51",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),f();return}if(r.length<l){s.gallery.insertAdjacentHTML("beforeend",m(r)),h.refresh(),n.warning({color:"#fc6e51",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"}),f();return}s.gallery.insertAdjacentHTML("beforeend",m(r)),h.refresh(),y()}catch(r){n.error({color:"red",message:`${r}`,position:"topCenter"})}finally{s.form.reset()}}async function $(i){g(),u+=1;try{const{hits:t,totalHits:r}=await p(d,u,l),a=Math.ceil(r/l);if(u===a){const e=r-(a-1)*l,o=t.slice(0,e);s.gallery.insertAdjacentHTML("beforeend",m(o)),h.refresh(),f(),n.warning({color:"#fc6e51",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"});return}s.gallery.insertAdjacentHTML("beforeend",m(t)),h.refresh(),y(),P()}catch(t){n.error({color:"red",message:`${t}`,position:"topCenter"})}finally{s.form.reset()}}const h=new v(".card a",{captionsData:"alt",captionDelay:250,captionPosition:"outside"});function g(){s.loader.classList.remove("is-active"),s.btnLoadMore.classList.add("is-active")}function y(){s.loader.classList.add("is-active"),s.btnLoadMore.classList.remove("is-active")}function f(){s.btnLoadMore.classList.add("is-active"),s.loader.classList.add("is-active")}function P(){const t=document.querySelector(".card").getBoundingClientRect().height;window.scrollBy({left:0,top:t*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
