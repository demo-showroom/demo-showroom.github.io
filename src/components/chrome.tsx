import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Sunrise,
  Send,
  ChevronLeft,
  ChevronRight,
  Expand,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  User,
  Loader2,
} from "lucide-react";
import { gallery, vehicle, formatGs } from "../data/vehicle";

/* ---------------- Header ---------------- */
export function Header({ onMenu }: { onMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[#0B0B0C]/90 backdrop-blur-xl"
          : "border-transparent bg-[#0B0B0C]"
      }`}
    >
      <div className="mx-auto flex h-[60px] max-w-[430px] items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD21F] ring-2 ring-[#FFD21F]/30">
            <Sunrise className="h-5 w-5 text-black" strokeWidth={2.4} />
          </span>
          <div className="leading-none">
            <p className="text-[15px] font-extrabold tracking-[0.12em] text-white">
              SOL NACIENTE
            </p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-white/40">
              SHOWROOM DIGITAL
            </p>
          </div>
        </div>
        <button
          onClick={onMenu}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10 active:scale-95"
        >
          <Menu className="h-6 w-6 text-[#FFD21F]" strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Menu Drawer ---------------- */
export function MenuDrawer({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}) {
  if (!open) return null;
  const links = [
    { id: "resumen", label: "Resumen del vehículo", desc: "Precio y destacados" },
    { id: "galeria", label: "Galería", desc: "12 fotos · Exterior / Interior" },
    { id: "especificaciones", label: "Especificaciones", desc: "Motor, chasis, medidas" },
    { id: "equipamiento", label: "Equipamiento", desc: "Paquete M Sport Pro" },
    { id: "video", label: "Video", desc: "Tour cinematográfico" },
    { id: "financiacion", label: "Financiación", desc: "Simulá tu cuota" },
  ];
  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="anim-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <aside className="anim-drawer relative flex h-full w-[86%] max-w-[340px] flex-col bg-[#101012] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD21F]">
              <Sunrise className="h-4 w-4 text-black" strokeWidth={2.5} />
            </span>
            <p className="text-sm font-extrabold tracking-widest">SOL NACIENTE</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scroll">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => {
                onNavigate(l.id);
                onClose();
              }}
              className="anim-fade-up group flex w-full items-center justify-between rounded-2xl px-3 py-3.5 text-left transition hover:bg-white/5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span>
                <span className="block text-[15px] font-bold text-white group-hover:text-[#FFD21F]">
                  {l.label}
                </span>
                <span className="block text-xs text-white/45">{l.desc}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-white/25 group-hover:text-[#FFD21F]" />
            </button>
          ))}
          <div className="mx-3 mt-4 rounded-2xl border border-[#FFD21F]/20 bg-[#FFD21F]/5 p-4">
            <p className="text-xs font-bold tracking-widest text-[#FFD21F]">CONTACTO DIRECTO</p>
            <p className="mt-1 text-sm font-bold">+595 981 126 769</p>
            <p className="text-xs text-white/50">Lun a Sáb · 8:00 a 18:00</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="tel:+595981126769"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 py-2.5 text-xs font-bold hover:bg-white/15"
              >
                <Phone className="h-3.5 w-3.5" /> Llamar
              </a>
              <a
                href="https://wa.me/595981126769?text=Hola,%20me%20interesa%20el%20BMW%20X6%20xDrive40i"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FFD21F] py-2.5 text-xs font-extrabold text-black hover:brightness-105"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </nav>
        <div className="border-t border-white/10 px-5 py-3">
          <p className="text-[11px] text-white/35">Stock {vehicle.stockId} · {vehicle.location}</p>
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Bottom CTA ---------------- */
export function BottomCTA({ onQuote }: { onQuote: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-[430px] px-4 pb-4 pt-2">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <button
          onClick={onQuote}
          className="anim-glow relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#FFD21F] py-4 text-[15px] font-extrabold text-black shadow-[0_12px_36px_rgba(255,210,31,.35)] transition hover:brightness-105 active:scale-[0.98]"
        >
          <Send className="h-[18px] w-[18px]" strokeWidth={2.4} />
          Solicitar cotización / Test drive
        </button>
        <div className="relative mx-auto mt-2.5 h-[5px] w-32 rounded-full bg-white/25" />
      </div>
    </div>
  );
}

/* ---------------- Lightbox ---------------- */
export function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const total = gallery.length;
  const current = gallery[((index % total) + total) % total];

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(index + 1);
      if (e.key === "ArrowLeft") onChange(index - 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [index, onClose, onChange]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="anim-fade-in fixed inset-0 z-[80] flex flex-col bg-black/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4">
        <p className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-bold tabular-nums">
          {current.id} / {total}
        </p>
        <p className="text-sm font-semibold text-white/60">{current.label}</p>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2">
        <img
          key={current.id}
          src={current.src}
          alt={current.alt}
          className="anim-zoom max-h-[62vh] w-full max-w-[720px] rounded-2xl object-cover shadow-2xl"
        />
        <button
          onClick={() => onChange(index - 1)}
          className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/20 backdrop-blur transition hover:bg-black/80 active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => onChange(index + 1)}
          className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/20 backdrop-blur transition hover:bg-black/80 active:scale-95"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="px-4 pb-8 pt-4">
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1">
          {gallery.map((g, i) => (
            <button
              key={g.id}
              onClick={() => onChange(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                i === ((index % total) + total) % total
                  ? "ring-[#FFD21F]"
                  : "ring-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <img src={g.thumb} alt={g.alt} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Quote Modal ---------------- */
export function QuoteModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "sending" | "done">("form");
  const [tipo, setTipo] = useState<"cotizacion" | "testdrive">("cotizacion");
  const [form, setForm] = useState({ nombre: "", telefono: "", fecha: "", mensaje: "" });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("sending");
    setTimeout(() => setStep("done"), 1400);
  };

  const waLink = `https://wa.me/595981126769?text=${encodeURIComponent(
    `Hola Sol Naciente, soy ${form.nombre || "un interesado"} (${form.telefono || "sin teléfono"}). Quiero ${tipo === "testdrive" ? "agendar un TEST DRIVE" : "una COTIZACIÓN"} del BMW X6 xDrive40i M Sport 2022 (${formatGs(vehicle.priceGs)}). ${form.fecha ? `Fecha preferida: ${form.fecha}. ` : ""}${form.mensaje}`
  )}`;

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center sm:items-center">
      <div className="anim-fade-in absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="anim-slide-up relative w-full max-w-[430px] rounded-t-[28px] border-t border-white/10 bg-[#131315] p-6 pb-8 shadow-2xl sm:rounded-[28px]">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15 sm:hidden" />
        {step === "done" ? (
          <div className="py-6 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD21F]/15 ring-1 ring-[#FFD21F]/40">
              <CheckCircle2 className="h-8 w-8 text-[#FFD21F]" />
            </span>
            <h3 className="mt-4 text-xl font-extrabold">¡Solicitud recibida!</h3>
            <p className="mx-auto mt-2 max-w-[300px] text-sm leading-relaxed text-white/55">
              Un asesor de <span className="font-bold text-white">Sol Naciente</span> te contactará
              en menos de 30 minutos en horario comercial.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFD21F] py-3.5 text-sm font-extrabold text-black"
              >
                <MessageCircle className="h-4 w-4" /> Ir a WhatsApp
              </a>
              <button
                onClick={onClose}
                className="rounded-2xl bg-white/10 py-3.5 text-sm font-bold hover:bg-white/15"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#FFD21F]">
                  {vehicle.stockId}
                </p>
                <h3 className="mt-1 text-[20px] font-extrabold leading-tight">
                  {tipo === "testdrive" ? "Agendar test drive" : "Solicitar cotización"}
                </h3>
                <p className="mt-0.5 text-[13px] text-white/50">{vehicle.title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-black/40 p-1.5 ring-1 ring-white/10">
              {(["cotizacion", "testdrive"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  className={`rounded-xl py-2.5 text-[13px] font-extrabold transition ${
                    tipo === t ? "bg-[#FFD21F] text-black" : "text-white/55 hover:text-white"
                  }`}
                >
                  {t === "cotizacion" ? "Cotización" : "Test drive"}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 rounded-2xl bg-black/40 px-4 ring-1 ring-white/10 focus-within:ring-[#FFD21F]/60">
                <User className="h-4 w-4 shrink-0 text-white/35" />
                <input
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Nombre y apellido"
                  className="w-full bg-transparent py-3.5 text-sm font-semibold placeholder:font-medium placeholder:text-white/30 focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-black/40 px-4 ring-1 ring-white/10 focus-within:ring-[#FFD21F]/60">
                <Phone className="h-4 w-4 shrink-0 text-white/35" />
                <input
                  required
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="Celular / WhatsApp"
                  inputMode="tel"
                  className="w-full bg-transparent py-3.5 text-sm font-semibold placeholder:font-medium placeholder:text-white/30 focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-black/40 px-4 ring-1 ring-white/10 focus-within:ring-[#FFD21F]/60">
                <Calendar className="h-4 w-4 shrink-0 text-white/35" />
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  className="w-full bg-transparent py-3.5 text-sm font-semibold text-white/80 [color-scheme:dark] focus:outline-none"
                />
              </label>
              <textarea
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                placeholder="Mensaje opcional: entrega, permuta, financiación…"
                rows={2}
                className="w-full resize-none rounded-2xl bg-black/40 px-4 py-3.5 text-sm font-medium placeholder:text-white/30 ring-1 ring-white/10 focus:outline-none focus:ring-[#FFD21F]/60"
              />
            </div>

            <button
              type="submit"
              disabled={step === "sending"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFD21F] py-4 text-[15px] font-extrabold text-black transition hover:brightness-105 active:scale-[0.98] disabled:opacity-70"
            >
              {step === "sending" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  <Send className="h-[18px] w-[18px]" strokeWidth={2.4} />
                  {tipo === "testdrive" ? "Confirmar test drive" : "Enviar solicitud"}
                </>
              )}
            </button>
            <p className="mt-3 text-center text-[11px] text-white/35">
              Al enviar aceptás ser contactado por Sol Naciente · Respuesta en ~30 min
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */
export function Footer({ onQuote }: { onQuote: () => void }) {
  return (
    <footer className="border-t border-white/10 bg-[#0E0E10] px-5 pb-32 pt-8">
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD21F]">
          <Sunrise className="h-5 w-5 text-black" strokeWidth={2.4} />
        </span>
        <div>
          <p className="text-[15px] font-extrabold tracking-[0.12em]">SOL NACIENTE</p>
          <p className="text-xs text-white/45">Motors · Asunción, Paraguay</p>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <p className="flex items-center gap-3 text-white/70">
          <MapPin className="h-4 w-4 text-[#FFD21F]" /> Av. Mariscal López 4250 c/ Cruz del Chaco
        </p>
        <p className="flex items-center gap-3 text-white/70">
          <Clock className="h-4 w-4 text-[#FFD21F]" /> Lun a Vie 8:00–18:00 · Sáb 8:00–13:00
        </p>
        <p className="flex items-center gap-3 text-white/70">
          <Phone className="h-4 w-4 text-[#FFD21F]" /> +595 981 126 769
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-white/10">
        <div className="relative h-36 bg-[radial-gradient(circle_at_30%_20%,#2a2a2e,#101012_70%)]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD21F] shadow-[0_8px_28px_rgba(255,210,31,.5)]">
              <MapPin className="h-5 w-5 text-black" />
            </span>
            <p className="mt-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold backdrop-blur">
              Sol Naciente Motors
            </p>
          </div>
        </div>
        <button
          onClick={onQuote}
          className="flex w-full items-center justify-center gap-2 bg-white/5 py-3.5 text-[13px] font-extrabold text-[#FFD21F] hover:bg-white/10"
        >
          <Expand className="h-4 w-4" /> Cómo llegar / Agendar visita
        </button>
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-white/30">
        Precio y disponibilidad sujetos a confirmación. Fotos ilustrativas del vehículo real en
        stock {vehicle.stockId}. © 2026 Sol Naciente Motors.
      </p>
    </footer>
  );
}
