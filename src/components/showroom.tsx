import { useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  BadgeCheck,
  Cog,
  Gauge,
  Waypoints,
  LayoutGrid,
  Camera,
  Sofa,
  Play,
  Check,
  ChevronDown,
  ShieldCheck,
  Fuel,
  Calendar,
  Milestone,
  MapPin,
  Expand,
  CircleDollarSign,
  Sparkles,
  Volume2,
  Sun,
  Video as VideoIcon,
} from "lucide-react";
import { vehicle, gallery, specs, equipment, formatGs, type GalleryCategory } from "../data/vehicle";

/* ============ HERO GALLERY ============ */
export function HeroGallery({
  index,
  onChange,
  onOpen,
  fav,
  onFav,
  onShare,
}: {
  index: number;
  onChange: (i: number) => void;
  onOpen: () => void;
  fav: boolean;
  onFav: () => void;
  onShare: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const total = gallery.length;
  const current = gallery[((index % total) + total) % total];

  return (
    <section className="relative">
      <div
        className="relative aspect-[4/3.4] w-full overflow-hidden bg-black"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) onChange(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {gallery.map((g, i) => (
          <img
            key={g.id}
            src={g.src}
            alt={g.alt}
            draggable={false}
            onClick={onOpen}
            className={`absolute inset-0 h-full w-full cursor-zoom-in object-cover transition-all duration-500 ${
              i === ((index % total) + total) % total
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />

        {/* top actions */}
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={onFav}
            aria-label="Favorito"
            className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition active:scale-90 ${
              fav ? "bg-[#FFD21F] text-black" : "bg-black/50 text-white ring-1 ring-white/20"
            }`}
          >
            <Heart className={`h-[18px] w-[18px] ${fav ? "fill-black" : ""}`} />
          </button>
          <button
            onClick={onShare}
            aria-label="Compartir"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-black/70 active:scale-90"
          >
            <Share2 className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* arrows */}
        <button
          onClick={() => onChange(index - 1)}
          aria-label="Anterior"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/15 backdrop-blur transition hover:bg-black/70 active:scale-90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => onChange(index + 1)}
          aria-label="Siguiente"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/15 backdrop-blur transition hover:bg-black/70 active:scale-90"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* bottom badges */}
        <div className="absolute inset-x-0 bottom-3 flex items-end justify-between px-4">
          <div className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-[#FFD21F] px-3.5 py-1.5 text-[13px] font-extrabold text-black shadow-lg">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
              {vehicle.status}
            </span>
            <button
              onClick={onOpen}
              className="flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-bold text-white/90 ring-1 ring-white/15 backdrop-blur hover:bg-black/75"
            >
              <Expand className="h-3 w-3" /> {current.label} · Ver galería
            </button>
          </div>
          <span className="rounded-full bg-black/55 px-3.5 py-1.5 text-[13px] font-bold tabular-nums text-white ring-1 ring-white/15 backdrop-blur">
            {current.id} / {total}
          </span>
        </div>
      </div>

      {/* filmstrip */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto bg-[#0B0B0C] px-4 py-3">
        {gallery.map((g, i) => (
          <button
            key={g.id}
            onClick={() => onChange(i)}
            className={`h-[52px] w-[76px] shrink-0 overflow-hidden rounded-xl transition ${
              i === ((index % total) + total) % total
                ? "ring-2 ring-[#FFD21F]"
                : "opacity-45 hover:opacity-90"
            }`}
          >
            <img src={g.thumb} alt={g.alt} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}

/* ============ VEHICLE HEADING ============ */
export function VehicleHeading() {
  const [currency, setCurrency] = useState<"gs" | "usd">("gs");
  return (
    <section className="px-5 pb-1 pt-1">
      <h1 className="text-[22px] font-extrabold leading-tight tracking-tight">
        {vehicle.title}
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-medium text-white/55">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> {vehicle.year}
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1.5">
          <Milestone className="h-3.5 w-3.5" /> {vehicle.km}
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1.5">
          <Fuel className="h-3.5 w-3.5" /> {vehicle.fuel}
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> Asunción
        </span>
      </div>

      <div className="mt-3.5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[30px] font-extrabold leading-none tracking-tight">
            {currency === "gs" ? formatGs(vehicle.priceGs) : `USD ${vehicle.priceUsd.toLocaleString("en-US")}`}
          </p>
          <button
            onClick={() => setCurrency(currency === "gs" ? "usd" : "gs")}
            className="mt-1.5 text-[13px] font-medium text-white/50 underline decoration-dotted underline-offset-4 hover:text-[#FFD21F]"
          >
            {currency === "gs"
              ? `(USD ${vehicle.priceUsd.toLocaleString("en-US")} aprox.) · ver en USD`
              : `(${formatGs(vehicle.priceGs)}) · ver en Gs.`}
          </button>
        </div>
        <span className="mb-1 flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1.5 text-[11px] font-bold text-emerald-300 ring-1 ring-emerald-400/25">
          <BadgeCheck className="h-3.5 w-3.5" /> Verificado
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: ShieldCheck, t: "Garantía 12m", s: "Motor y caja" },
          { icon: BadgeCheck, t: "Único dueño", s: "Service oficial" },
          { icon: CircleDollarSign, t: "Financiación", s: "Hasta 60 meses" },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl bg-[#141416] px-2.5 py-3 text-center ring-1 ring-white/[0.07]">
            <c.icon className="mx-auto h-5 w-5 text-[#FFD21F]" />
            <p className="mt-1.5 text-[11.5px] font-extrabold leading-tight">{c.t}</p>
            <p className="text-[10.5px] text-white/45">{c.s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ TABS ============ */
export type TabId = "resumen" | "especificaciones" | "equipamiento" | "video";

export function Tabs({ tab, onTab }: { tab: TabId; onTab: (t: TabId) => void }) {
  const tabs: { id: TabId; label: string }[] = [
    { id: "resumen", label: "Resumen" },
    { id: "especificaciones", label: "Especificaciones" },
    { id: "equipamiento", label: "Equipamiento" },
    { id: "video", label: "Video" },
  ];
  return (
    <div className="sticky top-[60px] z-30 mt-4 border-b border-white/10 bg-[#0B0B0C]/95 backdrop-blur-xl">
      <div className="no-scrollbar mx-auto flex max-w-[430px] gap-6 overflow-x-auto px-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            className={`relative shrink-0 py-3.5 text-[14.5px] font-bold transition ${
              tab === t.id ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t.label}
            <span
              className={`absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-[#FFD21F] transition-all duration-300 ${
                tab === t.id ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ RESUMEN ============ */
const summaryIcons = [Cog, Gauge, Waypoints, LayoutGrid];

export function Resumen({ onQuote }: { onQuote: () => void }) {
  return (
    <div className="anim-fade-up px-5 py-5">
      <div className="stagger divide-y divide-white/[0.07]">
        {vehicle.summary.map((s, i) => {
          const Icon = summaryIcons[i];
          return (
            <div key={s.key} className="anim-fade-up flex items-center gap-4 py-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
                <Icon className="h-[22px] w-[22px] text-white/90" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[15px] font-extrabold">{s.label}</p>
                <p className="text-[14px] text-white/50">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-3xl bg-[#141416] p-5 ring-1 ring-white/[0.07]">
        <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] text-[#FFD21F]">
          <Sparkles className="h-3.5 w-3.5" /> DESCRIPCIÓN
        </p>
        <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">{vehicle.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {vehicle.highlights.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-[12px] font-bold text-white/80 ring-1 ring-white/10"
            >
              <Check className="h-3 w-3 text-[#FFD21F]" strokeWidth={3} /> {h}
            </span>
          ))}
        </div>
      </div>

      <Financing />

      <button
        onClick={onQuote}
        className="mt-4 w-full rounded-2xl border border-white/15 py-3.5 text-sm font-bold text-white/80 transition hover:border-[#FFD21F]/50 hover:text-[#FFD21F]"
      >
        Ver más detalles
      </button>
    </div>
  );
}

/* ============ FINANCING ============ */
export function Financing() {
  const [downPct, setDownPct] = useState(30);
  const [months, setMonths] = useState(36);
  const result = useMemo(() => {
    const down = Math.round((vehicle.priceGs * downPct) / 100);
    const financed = vehicle.priceGs - down;
    const annualRate = 0.135;
    const r = annualRate / 12;
    const cuota =
      r > 0 ? (financed * r) / (1 - Math.pow(1 + r, -months)) : financed / months;
    return { down, financed, cuota: Math.round(cuota) };
  }, [downPct, months]);

  return (
    <div id="financiacion" className="mt-4 scroll-mt-32 rounded-3xl border border-[#FFD21F]/20 bg-gradient-to-b from-[#FFD21F]/[0.08] to-transparent p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] text-[#FFD21F]">
          <CircleDollarSign className="h-4 w-4" /> SIMULÁ TU CUOTA
        </p>
        <span className="rounded-full bg-[#FFD21F] px-2.5 py-1 text-[11px] font-extrabold text-black">
          13,5% a.
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[13px] font-bold">
          <span className="text-white/60">Entrega inicial</span>
          <span className="text-[#FFD21F]">{downPct}% · {formatGs(result.down)}</span>
        </div>
        <input
          type="range"
          min={10}
          max={70}
          step={5}
          value={downPct}
          onChange={(e) => setDownPct(Number(e.target.value))}
          style={{ ["--fill" as string]: `${((downPct - 10) / 60) * 100}%` }}
          className="mt-2.5 w-full"
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[13px] font-bold">
          <span className="text-white/60">Plazo</span>
          <span className="text-[#FFD21F]">{months} meses</span>
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {[12, 24, 36, 48, 60].slice(0, 4).map((m) => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              className={`rounded-xl py-2 text-[12px] font-extrabold transition ${
                months === m
                  ? "bg-[#FFD21F] text-black"
                  : "bg-black/40 text-white/55 ring-1 ring-white/10 hover:text-white"
              }`}
            >
              {m}m
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-black/50 px-4 py-3.5 ring-1 ring-white/10">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-white/45">CUOTA ESTIMADA</p>
          <p className="text-[20px] font-extrabold text-[#FFD21F]">
            {formatGs(result.cuota)}
            <span className="text-[12px] font-bold text-white/50"> /mes</span>
          </p>
        </div>
        <p className="text-right text-[11px] leading-snug text-white/40">
          Monto a financiar
          <br />
          <span className="text-[13px] font-bold text-white/75">{formatGs(result.financed)}</span>
        </p>
      </div>
      <p className="mt-2.5 text-center text-[10.5px] text-white/30">
        Simulación referencial. Sujeta a aprobación crediticia.
      </p>
    </div>
  );
}

/* ============ ESPECIFICACIONES ============ */
export function Especificaciones() {
  const [open, setOpen] = useState<number[]>([0, 1, 2]);
  return (
    <div className="anim-fade-up space-y-3 px-5 py-5">
      {specs.map((g, gi) => {
        const isOpen = open.includes(gi);
        return (
          <div key={g.group} className="overflow-hidden rounded-3xl bg-[#141416] ring-1 ring-white/[0.07]">
            <button
              onClick={() =>
                setOpen(isOpen ? open.filter((o) => o !== gi) : [...open, gi])
              }
              className="flex w-full items-center justify-between px-5 py-4"
            >
              <p className="text-[14px] font-extrabold">{g.group}</p>
              <ChevronDown
                className={`h-4 w-4 text-[#FFD21F] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-0 px-5 pb-4">
                  {g.items.map((it) => (
                    <div
                      key={it.label}
                      className="flex items-center justify-between gap-3 border-t border-white/[0.06] py-2.5 first:border-0"
                    >
                      <span className="text-[13px] text-white/50">{it.label}</span>
                      <span className="text-right text-[13px] font-bold">{it.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="rounded-3xl bg-[#141416] p-5 ring-1 ring-white/[0.07]">
        <p className="text-[13px] font-extrabold">Ficha técnica completa</p>
        <p className="mt-1 text-[12px] text-white/45">
          Stock {vehicle.stockId} · Historial de service verificado por BMW Paraguay.
        </p>
      </div>
    </div>
  );
}

/* ============ EQUIPAMIENTO ============ */
const groupIcons = [Sun, Sofa, Volume2, ShieldCheck];

export function Equipamiento() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="anim-fade-up space-y-3 px-5 py-5">
      {equipment.map((g, gi) => {
        const Icon = groupIcons[gi % groupIcons.length];
        return (
          <div key={g.group} className="rounded-3xl bg-[#141416] p-5 ring-1 ring-white/[0.07]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD21F]/12 text-[#FFD21F] ring-1 ring-[#FFD21F]/25">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-[15px] font-extrabold">{g.group}</p>
              <span className="ml-auto rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-bold text-white/50">
                {g.items.length} ítems
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {(expanded ? g.items : g.items.slice(0, 3)).map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[13.5px] text-white/75">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFD21F]/15">
                    <Check className="h-3 w-3 text-[#FFD21F]" strokeWidth={3} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full rounded-2xl border border-white/15 py-3.5 text-sm font-bold text-white/80 transition hover:border-[#FFD21F]/50 hover:text-[#FFD21F]"
      >
        {expanded ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
}

/* ============ VIDEO ============ */
export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="anim-fade-up px-5 py-5">
      <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
        {playing ? (
          <video
            src={vehicle.videoUrl}
            poster={vehicle.videoPoster}
            controls
            autoPlay
            playsInline
            className="aspect-video w-full bg-black object-cover"
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="group relative block w-full text-left">
            <img src={vehicle.videoPoster} alt="Video BMW X6" className="aspect-video w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFD21F] text-black shadow-[0_10px_40px_rgba(255,210,31,.5)] transition group-hover:scale-105 group-active:scale-95">
              <Play className="ml-1 h-6 w-6 fill-black" />
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-extrabold tracking-widest backdrop-blur">
              TOUR 360° · 1:24
            </span>
            <span className="absolute inset-x-4 bottom-4">
              <span className="block text-[15px] font-extrabold">Walkaround cinematográfico</span>
              <span className="block text-[12px] text-white/60">Exterior · Interior · Sonido motor</span>
            </span>
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {[
          { icon: Camera, t: "Exterior 4K", s: "6 tomas" },
          { icon: VideoIcon, t: "Prueba dinámica", s: "Próximamente" },
        ].map((c) => (
          <div key={c.t} className="flex items-center gap-3 rounded-2xl bg-[#141416] p-3.5 ring-1 ring-white/[0.07]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07]">
              <c.icon className="h-5 w-5 text-[#FFD21F]" />
            </span>
            <span>
              <span className="block text-[13px] font-extrabold leading-tight">{c.t}</span>
              <span className="block text-[11px] text-white/45">{c.s}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ GALERIA ============ */
export function GalleryGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const filters: { id: GalleryCategory | "all"; label: string; icon: typeof Camera }[] = [
    { id: "all", label: "Todas", icon: LayoutGrid },
    { id: "exterior", label: "Exterior", icon: Camera },
    { id: "interior", label: "Interior", icon: Sofa },
    { id: "detalle", label: "Detalles", icon: Expand },
  ];
  const list = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section id="galeria" className="scroll-mt-32 border-t border-white/[0.07] bg-[#0D0D0F] px-5 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-extrabold">Galería</h2>
        <span className="rounded-full bg-white/5 px-3 py-1.5 text-[12px] font-bold text-white/55">
          {list.length} fotos
        </span>
      </div>
      <div className="no-scrollbar -mx-5 mt-3.5 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold transition ${
              filter === f.id
                ? "bg-[#FFD21F] text-black"
                : "bg-white/[0.06] text-white/60 ring-1 ring-white/10 hover:text-white"
            }`}
          >
            <f.icon className="h-4 w-4" /> {f.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {list.map((g) => {
          const globalIndex = gallery.findIndex((x) => x.id === g.id);
          return (
            <button
              key={g.id}
              onClick={() => onOpen(globalIndex)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              <img
                src={g.thumb}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-2 bottom-2 rounded-xl bg-black/55 px-2.5 py-1.5 text-left text-[11px] font-bold backdrop-blur">
                {g.label}
              </span>
              {g.category === "interior" && (
                <span className="absolute right-2 top-2 rounded-full bg-[#FFD21F] p-1.5 text-black">
                  <Play className="h-3 w-3 fill-black" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 space-y-2.5">
        {[
          { icon: Camera, t: "Exterior", s: "6 fotos · Showroom + urbano" },
          { icon: Sofa, t: "Interior", s: "3 fotos · Cuero Vernasca" },
          { icon: Play, t: "Video", s: "Tour 1:24 min" },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center gap-3.5 rounded-2xl bg-[#141416] p-3 ring-1 ring-white/[0.07]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07]">
              <r.icon className="h-5 w-5 text-white/85" />
            </span>
            <span>
              <span className="block text-[14px] font-extrabold">{r.t}</span>
              <span className="block text-[12px] text-white/45">{r.s}</span>
            </span>
            <ChevronRight className="ml-auto h-4 w-4 text-white/25" />
          </div>
        ))}
      </div>
    </section>
  );
}
