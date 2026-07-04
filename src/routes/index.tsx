import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dumbbell, Flame, Trophy, Activity, HeartPulse, Zap,
  ShieldCheck, Award, Salad, Users, Waves, CalendarClock,
  Instagram, Facebook, Youtube, Twitter, Star, ArrowRight, Menu, X, Plus, Minus,
} from "lucide-react";

import { FloatingScene } from "@/components/FloatingScene";
import heroAthlete from "@/assets/hero-athlete.jpg";
import gymBg from "@/assets/gym-bg.jpg";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";
import trainer4 from "@/assets/trainer-4.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IRONFORGE — Elite Premium Fitness Club" },
      { name: "description", content: "Transform your body. Build your legacy. Elite trainers, world-class equipment, and a community that never quits." },
    ],
  }),
  component: Index,
});

gsap.registerPlugin(ScrollTrigger);

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Home", "Programs", "Trainers", "Pricing", "Contact"];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong py-3" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-glow glow-primary">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-2xl tracking-widest">IRON<span className="text-primary">FORGE</span></span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">{l}</a>
          ))}
        </nav>
        <a href="#pricing" className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.22_45/0.5)] transition-transform hover:scale-105 md:inline-block">Join Now</a>
        <button onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="glass-strong mx-6 mt-3 rounded-2xl p-6 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm uppercase tracking-widest">{l}</a>)}
            <a href="#pricing" onClick={() => setOpen(false)} className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold uppercase text-primary-foreground">Join Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: "power4.out", delay: 0.2 });
      gsap.from(".hero-sub", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.9 });
      gsap.from(".hero-cta", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 1.1 });
      gsap.from(".hero-img", { scale: 1.15, opacity: 0, duration: 1.6, ease: "power3.out" });
    }, heroRef);

    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(imgRef.current, { x, y, rotateY: x * 0.3, rotateX: -y * 0.3, duration: 0.8, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => { ctx.revert(); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden pt-24">
      {/* bg */}
      <div className="absolute inset-0">
        <img src={gymBg} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        {/* LEFT */}
        <div>
          <div className="hero-line inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Elite fitness club · Est. 2013
          </div>
          <h1 className="mt-6 font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            <span className="hero-line block">TRANSFORM</span>
            <span className="hero-line block">YOUR <span className="text-gradient">BODY.</span></span>
            <span className="hero-line block">BUILD YOUR</span>
            <span className="hero-line block text-gradient">LEGACY.</span>
          </h1>
          <p className="hero-sub mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
            Push beyond your limits with elite trainers, world-class equipment, and a community that never quits.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#pricing" className="hero-cta group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_40px_oklch(0.72_0.22_45/0.6)] transition-transform hover:scale-105">
              Start Membership <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="hero-cta inline-flex items-center gap-2 rounded-full glass-strong px-8 py-4 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary">
              Book Free Trial
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex h-[520px] items-center justify-center lg:h-[680px]" style={{ perspective: "1200px" }}>
          <div className="absolute inset-8 rounded-[2rem] bg-gradient-to-br from-primary/30 to-transparent blur-3xl animate-pulse-glow" />
          <div ref={imgRef} className="hero-img relative h-full w-full max-w-md" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-elegant">
              <img src={heroAthlete} alt="Elite athlete training" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
          <FloatingScene />
        </div>
      </div>

      {/* marquee */}
      <div className="relative overflow-hidden border-y border-border/50 bg-ink/50 py-6">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, i) => ["STRENGTH", "DISCIPLINE", "POWER", "LEGACY", "GRIT", "ELITE", "FORGED", "RELENTLESS"].map((w) => (
            <span key={`${i}-${w}`} className="mx-10 font-display text-4xl tracking-widest text-muted-foreground/40">
              {w} <span className="text-primary">✦</span>
            </span>
          )))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 85%",
      onEnter: () => gsap.to(obj, { v: end, duration: 2, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString() + suffix; } }),
    });
  }, [end, suffix]);
  return (
    <div className="text-center">
      <div ref={ref} className="font-display text-6xl text-gradient md:text-7xl lg:text-8xl">0{suffix}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}
function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        <Counter end={5000} suffix="+" label="Members" />
        <Counter end={45} suffix="+" label="Trainers" />
        <div className="text-center">
          <div className="font-display text-6xl text-gradient md:text-7xl lg:text-8xl">24/7</div>
          <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Open</div>
        </div>
        <Counter end={12} label="Years Experience" />
      </div>
    </section>
  );
}

/* ---------------- PROGRAMS ---------------- */
const programs = [
  { icon: Dumbbell, title: "Strength Training", desc: "Progressive overload systems built to unlock raw, functional strength." },
  { icon: Flame, title: "Fat Loss", desc: "Metabolic conditioning + nutrition science for lasting transformation." },
  { icon: Trophy, title: "Bodybuilding", desc: "Sculpt every muscle with periodized hypertrophy protocols." },
  { icon: Activity, title: "Functional Fitness", desc: "Move better in life and sport with total-body athleticism." },
  { icon: Users, title: "Personal Training", desc: "1-on-1 coaching engineered around your goals and biomechanics." },
  { icon: HeartPulse, title: "Cardio", desc: "HIIT, endurance and heart-rate zones — designed, not guessed." },
];
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateX: -y * 10, rotateY: x * 12, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
  };
  const reset = () => { if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" }); };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
function Programs() {
  const secRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prog-card", { y: 60, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: secRef.current, start: "top 75%" } });
    }, secRef);
    return () => ctx.revert();
  }, []);
  return (
    <section id="programs" ref={secRef} className="relative py-32">
      <SectionHeader eyebrow="Our Programs" title={<>BUILT FOR<br /><span className="text-gradient">RELENTLESS</span> RESULTS.</>} />
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map(({ icon: Icon, title, desc }) => (
          <TiltCard key={title} className="prog-card group relative">
            <div className="glass-strong h-full rounded-3xl p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_oklch(0.72_0.22_45/0.4)]">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 text-primary transition-transform duration-500 group-hover:rotate-12">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-3xl">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
const features = [
  { icon: Dumbbell, title: "Premium Equipment", desc: "Rogue, Hammer Strength, Technogym. The gear pros train on." },
  { icon: Award, title: "Certified Trainers", desc: "NSCA, ACE and NASM-certified coaches with elite pedigrees." },
  { icon: Salad, title: "Nutrition Plans", desc: "Macro-tailored meal systems built by registered dietitians." },
  { icon: ShieldCheck, title: "Personal Coaching", desc: "Weekly check-ins, form audits and progressive periodization." },
  { icon: Waves, title: "Recovery Zone", desc: "Cryo, sauna, infrared, and mobility studios for full recovery." },
  { icon: CalendarClock, title: "Flexible Memberships", desc: "Month-to-month or annual — pause, freeze or upgrade anytime." },
];
function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <SectionHeader eyebrow="Why Ironforge" title={<>OBSESSED WITH <span className="text-gradient">DETAILS.</span></>} />
      <div className="relative mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="why-card group glass rounded-2xl p-8 transition-all hover:bg-white/[0.06]">
            <div className="relative mb-5 inline-flex">
              <div className="absolute inset-0 rounded-xl bg-primary/40 blur-xl transition-opacity group-hover:opacity-100 opacity-40" />
              <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TRAINERS ---------------- */
const trainers = [
  { img: trainer1, name: "Marcus Kane", role: "Head Strength Coach" },
  { img: trainer2, name: "Sofia Reyes", role: "HIIT & Conditioning" },
  { img: trainer3, name: "Diego Ramos", role: "Bodybuilding Coach" },
  { img: trainer4, name: "Ava Bennett", role: "Mobility & Recovery" },
];
function Trainers() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trainer-card", { y: 60, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="trainers" ref={ref} className="relative py-32">
      <SectionHeader eyebrow="Meet the Team" title={<>ELITE COACHES.<br /><span className="text-gradient">REAL RESULTS.</span></>} />
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((t) => (
          <TiltCard key={t.name} className="trainer-card group">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 100%, oklch(0.72 0.22 45 / 0.35), transparent 60%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl tracking-wide">{t.name}</h3>
                <p className="text-xs uppercase tracking-widest text-primary">{t.role}</p>
                <div className="mt-4 flex gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <a href="#" className="grid h-8 w-8 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Instagram className="h-3.5 w-3.5" /></a>
                  <a href="#" className="grid h-8 w-8 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Twitter className="h-3.5 w-3.5" /></a>
                  <a href="#" className="grid h-8 w-8 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Youtube className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
const plans = [
  { name: "Basic", price: 39, features: ["Gym floor access", "Locker room + showers", "1 group class / week", "Standard hours"], highlight: false },
  { name: "Pro", price: 79, features: ["24/7 unlimited access", "Unlimited group classes", "2 PT sessions / month", "Recovery zone access", "Nutrition guidance"], highlight: true },
  { name: "Elite", price: 149, features: ["Everything in Pro", "Weekly 1-on-1 coaching", "Personalized meal plans", "Priority booking", "Guest passes included"], highlight: false },
];
function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".plan-card", { y: 60, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="pricing" ref={ref} className="relative py-32">
      <SectionHeader eyebrow="Membership Plans" title={<>PICK YOUR <span className="text-gradient">PATH.</span></>} />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-3">
        {plans.map((p) => (
          <TiltCard key={p.name} className={`plan-card ${p.highlight ? "lg:-translate-y-4" : ""}`}>
            <div className={`relative h-full rounded-3xl p-8 transition-all duration-500 ${p.highlight ? "glass-strong border-primary/40 shadow-[0_0_60px_oklch(0.72_0.22_45/0.35)]" : "glass"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">Most Popular</div>
              )}
              <h3 className="font-display text-3xl tracking-widest">{p.name}</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-6xl">${p.price}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full ${p.highlight ? "bg-primary text-primary-foreground" : "bg-white/10"}`}>
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5"><path d="M2 6l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-10 w-full rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] ${p.highlight ? "bg-primary text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.22_45/0.5)]" : "glass-strong hover:border-primary"}`}>
                Choose {p.name}
              </button>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const reviews = [
  { name: "Jasmine Wu", role: "Member · 2 yrs", text: "Lost 22 lbs and hit my first bodyweight bench press. The coaches actually care.", avatar: "https://i.pravatar.cc/120?img=48" },
  { name: "Ethan Cole", role: "Member · 4 yrs", text: "Best equipment in the city, cinematic vibe, and programming that actually works.", avatar: "https://i.pravatar.cc/120?img=13" },
  { name: "Priya Shah", role: "Member · 1 yr", text: "Felt intimidated at first — left feeling like an athlete. This place is a family.", avatar: "https://i.pravatar.cc/120?img=45" },
  { name: "Marco Silva", role: "Member · 3 yrs", text: "Ironforge rebuilt my body after injury. The recovery zone is unreal.", avatar: "https://i.pravatar.cc/120?img=32" },
];
function Testimonials() {
  return (
    <section className="relative overflow-hidden py-32">
      <SectionHeader eyebrow="Members Speak" title={<>REAL PEOPLE. <span className="text-gradient">REAL WINS.</span></>} />
      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex gap-6 whitespace-normal">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="glass-strong w-[380px] shrink-0 rounded-3xl p-8">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={r.avatar} alt={r.name} loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/40" />
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BMI ---------------- */
function BMI() {
  const [h, setH] = useState(175);
  const [w, setW] = useState(72);
  const bmi = w / ((h / 100) ** 2);
  const bmiClamped = Math.max(15, Math.min(40, bmi));
  const pct = ((bmiClamped - 15) / (40 - 15)) * 100;
  const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  const color = bmi < 18.5 ? "oklch(0.75 0.15 220)" : bmi < 25 ? "oklch(0.75 0.18 145)" : bmi < 30 ? "oklch(0.78 0.2 70)" : "oklch(0.65 0.22 25)";
  const R = 90, C = 2 * Math.PI * R;
  return (
    <section className="relative py-32">
      <SectionHeader eyebrow="BMI Calculator" title={<>KNOW YOUR <span className="text-gradient">BASELINE.</span></>} />
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
        <div className="glass-strong rounded-3xl p-8">
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Height</label>
                <span className="font-display text-3xl">{h}<span className="ml-1 text-sm text-muted-foreground">cm</span></span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => setH((v) => Math.max(120, v - 1))} className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Minus className="h-4 w-4" /></button>
                <input type="range" min={120} max={220} value={h} onChange={(e) => setH(+e.target.value)} className="flex-1 accent-[oklch(0.72_0.22_45)]" />
                <button onClick={() => setH((v) => Math.min(220, v + 1))} className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Weight</label>
                <span className="font-display text-3xl">{w}<span className="ml-1 text-sm text-muted-foreground">kg</span></span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => setW((v) => Math.max(30, v - 1))} className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Minus className="h-4 w-4" /></button>
                <input type="range" min={30} max={200} value={w} onChange={(e) => setW(+e.target.value)} className="flex-1 accent-[oklch(0.72_0.22_45)]" />
                <button onClick={() => setW((v) => Math.min(200, v + 1))} className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-strong flex flex-col items-center justify-center rounded-3xl p-8">
          <div className="relative">
            <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
              <circle cx="110" cy="110" r={R} stroke="oklch(1 0 0 / 0.08)" strokeWidth="14" fill="none" />
              <circle cx="110" cy="110" r={R} stroke={color} strokeWidth="14" fill="none" strokeDasharray={C} strokeDashoffset={C - (pct / 100) * C} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.6s ease", filter: `drop-shadow(0 0 12px ${color})` }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-display text-5xl">{bmi.toFixed(1)}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">BMI</div>
            </div>
          </div>
          <div className="mt-6 rounded-full glass px-5 py-2 text-sm uppercase tracking-widest" style={{ color }}>{category}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
const gallery = [g1, g2, g3, g4, g5, g6];
function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".g-item", { y: 60, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative py-32">
      <SectionHeader eyebrow="Inside The Forge" title={<>THE <span className="text-gradient">ATMOSPHERE.</span></>} />
      <div className="mx-auto mt-16 max-w-7xl px-6">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((src, i) => (
            <button key={i} onClick={() => setOpen(src)} className="g-item mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 group cursor-zoom-in">
              <img src={src} alt="" loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-110" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] grid animate-fade-in place-items-center bg-black/90 p-6 backdrop-blur-lg">
          <img src={open} alt="" className="max-h-[90vh] max-w-full animate-scale-in rounded-2xl" />
        </div>
      )}
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [particles] = useState(() => Array.from({ length: 40 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 3 + 1, d: Math.random() * 8 + 4,
  })));
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-title", { y: 60, opacity: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative overflow-hidden py-40">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-glow/10" />
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span key={i} className="absolute rounded-full bg-primary/60"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, filter: "blur(1px)",
              animation: `float-slow ${p.d}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h2 className="cta-title font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl">
          YOUR STRONGEST SELF<br /><span className="text-gradient">STARTS TODAY.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">No excuses. No shortcuts. Just work — and the team to guide it.</p>
        <a href="#pricing" className="group mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-12 py-5 font-display text-2xl tracking-widest text-primary-foreground shadow-[0_0_80px_oklch(0.72_0.22_45/0.6)] transition-transform hover:scale-105">
          JOIN NOW <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/50 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-glow"><Dumbbell className="h-5 w-5 text-primary-foreground" /></span>
            <span className="font-display text-2xl tracking-widest">IRON<span className="text-primary">FORGE</span></span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Elite fitness club engineered for those who refuse to plateau.</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube, Twitter].map((I, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Programs", "Trainers", "Pricing", "Recovery Zone", "Nutrition"].map((l) => <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>112 Warehouse Row, LA</li>
            <li>hello@ironforge.club</li>
            <li>+1 (555) 010-0912</li>
            <li>Open 24/7</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Newsletter</div>
          <p className="mt-4 text-sm text-muted-foreground">Weekly training drops + member-only offers.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex overflow-hidden rounded-full glass-strong">
            <input placeholder="you@email.com" className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60" />
            <button className="bg-primary px-5 text-primary-foreground"><ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border/50 px-6 pt-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Ironforge Athletic Club. All rights reserved.</div>
        <div className="flex gap-6"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div>
      </div>
    </footer>
  );
}

/* ---------------- Section header ---------------- */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sh-el", { y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="mx-auto max-w-3xl px-6 text-center">
      <div className="sh-el inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground"><Zap className="h-3 w-3 text-primary" /> {eyebrow}</div>
      <h2 className="sh-el mt-6 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">{title}</h2>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Programs />
      <WhyUs />
      <Trainers />
      <Pricing />
      <Testimonials />
      <BMI />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}
