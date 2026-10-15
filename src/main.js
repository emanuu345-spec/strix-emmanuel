import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { contact, projects, services, process, testimonials, referral, faq } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const pad = (n) => String(n).padStart(2, '0');
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ───────────────────────── Render content from data.js ───────────────────────── */
const waLink = (text = '') => `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

function render() {
  // marquee
  const words = ['AI-powered CRMs', 'Agentic ERPs', 'AI agents', 'Knowledge bases', 'Web & mobile apps', 'M-Pesa built in', 'Voice AI', 'Automation'];
  const row = words.map((w, i) => `<span class="marquee__item">${i % 2 ? `<em>${w}</em>` : w}<i></i></span>`).join('');
  $('.js-marquee').innerHTML = row + row;


  // work
  $('.js-work').innerHTML = projects
    .map(
      (p, i) => `<article class="work-card">
        <div class="work-card__meta">
          <div class="work-card__top"><span>${pad(i + 1)} / ${pad(projects.length)}</span><span>${esc(p.kind)} · ${p.year}</span></div>
          <h3 class="work-card__name">${esc(p.name)}</h3>
          <p class="work-card__summary">${esc(p.summary)}</p>
          <ul class="work-card__shipped">${p.shipped.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          ${p.tags?.length ? `<div class="work-card__stack">${p.tags.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>` : ''}
          ${p.url ? `<a class="work-card__link" href="${p.url}" target="_blank" rel="noopener">See it live ↗</a>` : ''}
        </div>
        <div class="work-card__visual">${mock(p.mock)}</div>
      </article>`
    )
    .join('');

  // services
  $('.js-services').innerHTML = services
    .map(
      (s, i) => `<li class="svc"><span class="svc__n">(${pad(i + 1)})</span><h3 class="svc__title">${esc(s.title)}</h3><p class="svc__body">${esc(s.body)}</p><span class="svc__arrow" aria-hidden="true">→</span></li>`
    )
    .join('');

  // process
  $('.js-process').innerHTML = process
    .map((p, i) => `<article class="step"><span class="step__n">0${i + 1}</span><div><h3>${esc(p.step)}</h3><p>${esc(p.body)}</p></div></article>`)
    .join('');

  // testimonials: only real ones, section stays hidden otherwise
  if (testimonials.length) {
    $('.testimonials').hidden = false;
    $('.js-testimonials').innerHTML = testimonials
      .map((t) => `<figure class="quote"><blockquote>“${esc(t.quote)}”</blockquote><figcaption>${esc(t.name)} · ${esc(t.role)}</figcaption></figure>`)
      .join('');
  }

  // referral
  $('.js-ref-reward').textContent = referral.reward;
  $('.js-ref-body').textContent = referral.body;
  $('.js-ref-link').href = waLink('Hi Emmanuel, I’d like to refer a business: ');
  $('.js-ref-link').target = '_blank';

  // faq
  $('.js-faq').innerHTML = faq
    .map(
      (f, i) => `<div class="qa"><button class="qa__q" aria-expanded="false" aria-controls="qa-${i}" data-hover>${esc(f.q)}<span class="qa__icon" aria-hidden="true"></span></button><div class="qa__a" id="qa-${i}" role="region"><p>${esc(f.a)}</p></div></div>`
    )
    .join('');

  // contact bits
  $$('.js-email').forEach((el) => (el.textContent = contact.email));
  const mail = $('.js-email-link');
  mail.textContent = contact.email;
  mail.href = `mailto:${contact.email}`;
  $('.js-location').textContent = contact.location;
  $('.js-socials').innerHTML = contact.socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" data-hover>${esc(s.label)} ↗</a></li>`).join('');
  $('.js-year').textContent = new Date().getFullYear();
  const wa = $('.js-wa');
  wa.href = waLink('Hi Emmanuel, I’d like to talk about a project.');
  if (contact.bookingUrl) $$('a[href="#contact"].btn').forEach((a) => { a.href = contact.bookingUrl; a.target = '_blank'; });
}

function mock(type) {
  if (type === 'chat')
    return `<div class="mock mock-window mock-chat"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body">
      <div class="bubble me">When is my Data Structures CAT and what should I revise?</div>
      <div class="bubble ai">Thursday, 10:00, in LT2. Focus on trees and hashing; you flagged both as weak last week. I made you a 3-day plan.<span class="src">↳ from: your Week 6 notes</span></div>
      <div class="voice"><span class="wave">${'<b></b>'.repeat(9).replace(/<b><\/b>/g, (m, o) => `<b style="animation-delay:${(o % 7) * 0.09}s"></b>`)}</span><span>Listening…</span></div>
    </div></div>`;
  if (type === 'erp')
    return `<div class="mock mock-window mock-erp"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body">
      <div class="kpis"><div class="kpi"><small>Collected</small><strong>KES 1.42M</strong></div><div class="kpi"><small>Occupancy</small><strong>94%</strong></div><div class="kpi"><small>Arrears</small><strong>6</strong></div></div>
      <table><tbody>
        <tr><td>Unit A4 · J. Wanjiru</td><td><span class="tag fill">M-Pesa · Paid</span></td></tr>
        <tr><td>Unit B1 · P. Otieno</td><td><span class="tag">Reminder sent</span></td></tr>
        <tr><td>Unit C7 · M. Kamau</td><td><span class="tag fill">M-Pesa · Paid</span></td></tr>
        <tr><td>Unit A9 · Vacant</td><td><span class="tag">Listed</span></td></tr>
      </tbody></table>
    </div></div>`;
  if (type === 'farm') {
    const bars = [52, 61, 58, 70, 66, 78, 74, 85, 81, 92];
    return `<div class="mock mock-window mock-farm"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body">
      <div class="chart-head"><div><small style="opacity:.5">Milk today</small><div class="big">412 L</div></div><span class="tag fill">+8% wk</span></div>
      <div class="chart">${bars.map((h) => `<b style="height:${h}%"></b>`).join('')}</div>
      <div class="rows"><div class="row"><span>Cow #014 · Neema</span><span>21.4 L</span></div><div class="row"><span>Cow #022 · Baraka</span><span>19.8 L</span></div></div>
    </div></div>`;
  }
  const agents = [
    ['S', 'Sales', 'Followed up 14 new leads', 'Working'],
    ['C', 'Customer Support', 'Answered 38 customer questions', 'Working'],
    ['F', 'Finance', 'Weekly cash report ready', 'Review'],
    ['M', 'Marketing', 'Drafted 3 posts for this week', 'Done'],
  ];
  return `<div class="mock mock-window mock-agents"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body">
    <div class="agents-head"><div><small>Your AI team</small><div class="big" style="font-size:22px;letter-spacing:-0.03em;font-weight:500">Good morning</div></div><span class="tag fill">4 agents on</span></div>
    ${agents.map(([a, n, t, s]) => `<div class="agent"><span class="agent__av">${a}</span><span>${n}<span class="agent__task">${t}</span></span><span class="tag${s === 'Review' ? ' fill' : ''}">${s === 'Working' ? '<i class="live"></i>' : ''}${s}</span></div>`).join('')}
  </div></div>`;
}

/* ───────────────────────── Text splitting ───────────────────────── */
// Wraps every word (keeping <em> styling) so it can rise out of a mask or blur in.
function splitWords(el, inner) {
  const out = [];
  const walk = (node, wrapEm) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return out.push(document.createTextNode(' '));
          const word = document.createElement('span');
          word.className = inner === 'blur' ? 'wb' : 'w';
          let content = document.createTextNode(part);
          if (wrapEm) { const em = document.createElement('em'); em.append(content); content = em; }
          if (inner === 'blur') word.append(content);
          else { const wi = document.createElement('span'); wi.className = 'wi'; wi.append(content); word.append(wi); }
          out.push(word);
        });
      } else if (n.nodeName === 'EM') walk(n, true);
      else if (n.nodeName === 'BR') out.push(document.createElement('br'));
      else walk(n, wrapEm);
    });
  };
  walk(el, false);
  el.replaceChildren(...out);
}

/* ───────────────────────── Smooth scroll ───────────────────────── */
let lenis;
function initScroll() {
  if (reduced) return;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  if (import.meta.env.DEV) Object.assign(window, { __lenis: lenis, __st: ScrollTrigger });
}

function scrollToHash(hash) {
  const target = hash === '#top' ? 0 : $(hash);
  if (target === null) return;
  if (lenis) lenis.scrollTo(target, { offset: hash === '#top' ? 0 : -20, duration: 1.4 });
  else window.scrollTo({ top: target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY });
}

/* ───────────────────────── Preloader → hero intro ───────────────────────── */
function intro() {
  $$('.split-rise').forEach((el) => splitWords(el, 'rise'));
  $$('.split-blur').forEach((el) => splitWords(el, 'blur'));

  const heroWords = $$('.hero__title .wi');
  gsap.set(heroWords, { yPercent: 110 });
  gsap.set(['.hero__eyebrow', '.hero .fade-up', '.nav'], { autoAlpha: 0, y: 24 });

  const done = () => {
    document.body.classList.remove('is-loading');
    $('.loader')?.remove();
    lenis?.start();
    ScrollTrigger.refresh();
  };

  const heroIn = gsap.timeline({ paused: true })
    .to(heroWords, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07 })
    .to('.hero__eyebrow', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0.1)
    .to('.hero .fade-up', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1 }, 0.45)
    .to('.nav', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' }, 0.5)
    .to('.wa-float', { scale: 1, duration: 0.8, ease: 'back.out(2)' }, 0.9);

  if (reduced) { done(); heroIn.progress(1); return; }

  const counter = { v: 0 };
  gsap.timeline({ onComplete: done })
    .fromTo('.loader__word span', { yPercent: 105 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 })
    .to(counter, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => ($('.loader__num').textContent = String(Math.round(counter.v)).padStart(3, '0')) }, 0)
    .to('.loader__bar span', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
    .to('.loader__word span', { yPercent: -105, duration: 0.7, ease: 'expo.in', stagger: 0.04 }, '+=0.15')
    .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.2')
    .add(() => heroIn.play(), '-=0.55');
}

/* ───────────────────────── Scroll animations ───────────────────────── */
function animations() {
  // nav hides on scroll down, returns on scroll up
  const nav = $('.nav');
  ScrollTrigger.create({
    start: 200,
    onUpdate: (self) => nav.classList.toggle('is-hidden', self.direction === 1 && !document.body.classList.contains('menu-open')),
    onLeaveBack: () => nav.classList.remove('is-hidden'),
  });

  if (reduced) return;

  // hero drifts away
  gsap.to('.hero__title', { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // marquee: constant drift + scroll velocity boost
  const track = $('.js-marquee');
  const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
      gsap.to(loop, { timeScale: self.direction === 1 ? 1 + Math.abs(v) : -1 - Math.abs(v), duration: 0.3, overwrite: true });
      gsap.to(loop, { timeScale: self.direction === 1 ? 1 : -1, duration: 1.2, delay: 0.3 });
    },
  });

  // headings: words rise from a mask
  $$('.split-rise').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.from($$('.wi', el), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // manifesto: Bending-Spoons-style blur → sharp, word by word, tied to scroll
  $$('.split-blur').forEach((el) => {
    gsap.fromTo($$('.wb', el), { opacity: 0.12, filter: 'blur(10px)' }, {
      opacity: 1, filter: 'blur(0px)', ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
    });
  });

  // generic fade-ups (hero ones are handled by the intro)
  $$('.fade-up').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });


  // work cards: sticky stack. Each earlier card shrinks back and fades out as the next one slides over.
  const cards = $$('.work-card');
  cards.forEach((card, i) => {
    const visual = $('.mock', card);
    gsap.fromTo(visual, { yPercent: 8, rotate: -2 }, { yPercent: -4, rotate: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
    const next = cards[i + 1];
    if (!next) return;
    gsap.fromTo(card, { scale: 1, autoAlpha: 1 }, {
      scale: 0.92, autoAlpha: 0, ease: 'power1.in',
      scrollTrigger: { trigger: next, start: 'top 85%', end: () => `top ${Math.max(0, parseFloat(next.style.getPropertyValue('--stick')) || NAV_GAP)}px`, scrub: true, invalidateOnRefresh: true },
    });
  });
  $$('.mock-farm .chart b').forEach((b, i) => gsap.from(b, { scaleY: 0, duration: 1.2, ease: 'expo.out', delay: i * 0.05, scrollTrigger: { trigger: b.parentElement, start: 'top 85%' } }));

  // numbers count up
  $$('.num__val').forEach((el) => {
    const end = +el.dataset.count;
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' }, onUpdate: () => (el.textContent = Math.round(o.v)) });
  });

  // services rows slide in
  gsap.from('.svc', { y: 50, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '.services__list', start: 'top 82%' } });

  // process: horizontal scroll on wider screens
  ScrollTrigger.matchMedia({
    '(min-width: 761px)': () => {
      const track = $('.js-process');
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.process', start: 'top top', end: () => `+=${dist()}`, pin: '.process__pin', scrub: 0.8, invalidateOnRefresh: true },
      });
    },
    '(max-width: 760px)': () => {
      gsap.from('.step', { y: 50, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.process__track', start: 'top 85%' } });
    },
  });

  // portrait parallax
  gsap.fromTo('.portrait, .about__portrait img', { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });

  // giant footer wordmark rises letter by letter
  gsap.from('.footer__word span', { yPercent: 100, duration: 1.3, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '.footer__word', start: 'top 92%' } });
}


// dark ⇄ light page flip as sections reach the middle of the viewport.
// Created last so their positions include the pinned process section.
function themeTriggers() {
  $$('[data-theme]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 55%',
      refreshPriority: -1,
      onToggle: (self) => self.isActive && document.body.classList.toggle('theme-light', sec.dataset.theme === 'light'),
    });
  });
}

/* ───────────────────────── Interactions ───────────────────────── */
function interactions() {
  // anchor links go through Lenis
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash.length < 2) return;
    e.preventDefault();
    closeMenu();
    scrollToHash(hash);
  });

  // mobile menu
  const burger = $('.nav__burger');
  burger.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    $('.menu').setAttribute('aria-hidden', !open);
    open ? lenis?.stop() : lenis?.start();
    if (open) gsap.fromTo('.menu__links a', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
  });
  function closeMenu() {
    if (!document.body.classList.contains('menu-open')) return;
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    $('.menu').setAttribute('aria-hidden', 'true');
    lenis?.start();
  }

  // FAQ accordion
  $$('.qa').forEach((qa) => {
    const btn = $('.qa__q', qa);
    const ans = $('.qa__a', qa);
    btn.addEventListener('click', () => {
      const open = !qa.classList.contains('is-open');
      $$('.qa.is-open').forEach((o) => {
        if (o === qa) return;
        o.classList.remove('is-open');
        $('.qa__q', o).setAttribute('aria-expanded', 'false');
        gsap.to($('.qa__a', o), { height: 0, duration: 0.6, ease: 'expo.inOut' });
      });
      qa.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open);
      gsap.to(ans, { height: open ? 'auto' : 0, duration: 0.7, ease: 'expo.inOut', onComplete: () => ScrollTrigger.refresh() });
    });
  });


  // contact form → one tap, saved straight to the enquiries inbox via /api/enquiry
  const form = $('.js-form');
  const status = $('.js-form-status');
  const valid = {
    phone: (v) => v.replace(/\D/g, '').length >= 9,
    email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.classList.contains('is-sending')) return;
    let ok = true;
    $$('input:not([name="website"]), textarea', form).forEach((f) => {
      const v = f.value.trim();
      const bad = (f.required && !v) || (!!valid[f.name] && !valid[f.name](v));
      f.parentElement.classList.toggle('is-error', bad);
      if (bad) ok = false;
    });
    if (!ok) { status.textContent = 'Please fill in the highlighted fields.'; return; }
    const d = Object.fromEntries(new FormData(form));
    form.classList.add('is-sending');
    status.textContent = 'Sending…';
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      if (!res.ok) throw new Error(String(res.status));
      // greet the visitor by the first name they typed
      $('.js-done-name').textContent = `, ${d.name.trim().split(/\s+/)[0]}`;
      form.classList.add('is-sent');
      ScrollTrigger.refresh();
    } catch {
      status.innerHTML = `Something went wrong sending that. Please try again, or <a href="${waLink('Hi Emmanuel, I’d like to talk about a project.')}" target="_blank" rel="noopener">message me on WhatsApp</a>.`;
    } finally {
      form.classList.remove('is-sending');
    }
  });

  if (!finePointer || reduced) return;

  // magnetic buttons
  $$('.magnetic').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

/* ───────────────────────── Work card stack ───────────────────────── */
// A card taller than the screen pins with a negative top, so it's read in full (link included)
// before the next one covers it. Runs even with reduced motion, since the stack is plain CSS sticky.
const NAV_GAP = 96;
function initStack() {
  const setStick = () => $$('.work-card').forEach((c) => c.style.setProperty('--stick', `${Math.min(NAV_GAP, window.innerHeight - c.offsetHeight - 24)}px`));
  setStick();
  ScrollTrigger.addEventListener('refreshInit', setStick);
}

/* ───────────────────────── Boot ───────────────────────── */
render();
initScroll();
interactions();
const start = () => { initStack(); intro(); animations(); themeTriggers(); ScrollTrigger.sort(); ScrollTrigger.refresh(); };
document.fonts?.ready ? document.fonts.ready.then(start) : window.addEventListener('load', start);
