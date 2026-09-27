import { useCallback, useState } from "react";
import {
  Sunrise,
  ShieldCheck,
  Star,
  Award,
  Phone,
  MessageCircle,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";
import { Header, MenuDrawer, BottomCTA, Lightbox, QuoteModal, Footer } from "./components/chrome";
import {
  HeroGallery,
  VehicleHeading,
  Tabs,
  Resumen,
  Especificaciones,
  Equipamiento,
  VideoSection,
  GalleryGrid,
  type TabId,
} from "./components/showroom";
import { vehicle, formatGs } from "./data/vehicle";

export default function App() {
  const [tab, setTab] = useState<TabId>("resumen");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [fav, setFav] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `${vehicle.title} ${vehicle.year} · ${formatGs(vehicle.priceGs)} · Sol Naciente`;
    try {
      if (navigator.share) {
        await navigator.share({ title: vehicle.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text} — ${url}`);
        showToast("Enlace copiado al portapapeles");
      }
    } catch {
      /* cancelado */
    }
  }, [showToast]);

  const handleNavigate = useCallback(
    (id: string) => {
      if (id === "galeria" || id === "financiacion") {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        if (id === "financiacion") setTab("resumen");
      } else {
        setTab(id as TabId);
        requestAnimationFrame(() => {
          document.getElementById("tabs-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    []
  );

  return (
    <div className="relative min-h-screen bg-[#060607]">
      {/* ambient desktop background */}
      <div className="pointer-events-none fixed inset-0 hidden lg:block">
        <img
          src="https://images.pexels.com/photos/9411653/pexels-photo-9411653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt=""
          className="h-full w-full object-cover opacity-[0.14] blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#060607]/80 to-[#060607]" />
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD21F]/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1200px] items-start justify-center gap-10 px-0 lg:px-8 lg:py-8">
        {/* LEFT — desktop pitch */}
        <aside className="sticky top-8 hidden w-[300px] shrink-0 lg:block">
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD21F]">
              <Sunrise className="h-6 w-6 text-black" strokeWidth={2.4} />
            </span>
            <div>
              <p className="text-base font-extrabold tracking-[0.12em]">SOL NACIENTE</p>
              <p className="text-xs text-white/45">Showroom Digital · Unidad única</p>
            </div>
          </div>
          <h2 className="mt-8 text-[34px] font-extrabold leading-[1.05] tracking-tight">
            El X6 que estabas esperando,{" "}
            <span className="text-[#FFD21F]">sin vueltas.</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/55">
            Explorá la unidad real en stock: 12 fotos, video walkaround, ficha técnica y cuota
            estimada. Todo desde tu celular.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {[
              { n: "18+", l: "Años" },
              { n: "4.9", l: "Rating ★" },
              { n: "2.4k", l: "Vendidos" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/[0.05] p-3 text-center ring-1 ring-white/10">
                <p className="text-lg font-extrabold text-[#FFD21F]">{s.n}</p>
                <p className="text-[11px] font-bold text-white/50">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2.5">
            {["Inspección 180 puntos aprobada", "Garantía escrita 12 meses", "Transferencia incluida"].map(
              (t) => (
                <p key={t} className="flex items-center gap-2.5 text-[13px] font-semibold text-white/70">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#FFD21F]" /> {t}
                </p>
              )
            )}
          </div>
        </aside>

        {/* CENTER — mobile app shell */}
        <main className="relative w-full max-w-[430px] shrink-0 overflow-hidden bg-[#0B0B0C] shadow-[0_0_80px_rgba(0,0,0,.6)] lg:rounded-[32px] lg:ring-1 lg:ring-white/15">
          <Header onMenu={() => setMenuOpen(true)} />

          <HeroGallery
            index={photoIndex}
            onChange={(i) => setPhotoIndex((i + 12) % 12)}
            onOpen={() => setLightbox(photoIndex)}
            fav={fav}
            onFav={() => {
              setFav(!fav);
              showToast(fav ? "Eliminado de favoritos" : "Guardado en favoritos");
            }}
            onShare={handleShare}
          />

          <VehicleHeading />

          <div id="tabs-anchor" className="scroll-mt-[60px]" />
          <Tabs tab={tab} onTab={setTab} />

          {tab === "resumen" && <Resumen onQuote={() => setTab("especificaciones")} />}
          {tab === "especificaciones" && <Especificaciones />}
          {tab === "equipamiento" && <Equipamiento />}
          {tab === "video" && <VideoSection />}

          <GalleryGrid onOpen={(i) => setLightbox(i)} />

          {/* trust strip */}
          <section className="border-t border-white/[0.07] px-5 py-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FFD21F] text-[#FFD21F]" />
              ))}
              <span className="ml-2 text-[12px] font-bold text-white/60">
                4.9 · 380 reseñas verificadas
              </span>
            </div>
            <div className="mt-3 rounded-3xl bg-[#141416] p-5 ring-1 ring-white/[0.07]">
              <Award className="h-6 w-6 text-[#FFD21F]" />
              <p className="mt-2 text-[14px] font-semibold leading-relaxed text-white/80">
                “Compré mi X5 sin pisar el local. Me mandaron video en vivo, historial y me lo
                llevaron al interior. Impecable.”
              </p>
              <p className="mt-2 text-[12px] font-bold text-white/40">
                — Rodrigo M. · Cliente verificado
              </p>
            </div>
          </section>

          <Footer onQuote={() => setQuoteOpen(true)} />
          <BottomCTA onQuote={() => setQuoteOpen(true)} />
        </main>

        {/* RIGHT — desktop sticky card */}
        <aside className="sticky top-8 hidden w-[300px] shrink-0 lg:block">
          <div className="rounded-3xl bg-[#101013]/90 p-6 ring-1 ring-white/10 backdrop-blur-xl">
            <p className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.2em] text-[#FFD21F]">
              <BadgeCheck className="h-4 w-4" /> {vehicle.status.toUpperCase()} · {vehicle.stockId}
            </p>
            <h3 className="mt-2 text-xl font-extrabold leading-tight">{vehicle.title}</h3>
            <p className="mt-1 text-[13px] text-white/50">
              {vehicle.year} · {vehicle.km} · {vehicle.fuel}
            </p>
            <p className="mt-3 text-[28px] font-extrabold">{formatGs(vehicle.priceGs)}</p>
            <p className="text-[13px] text-white/50">(USD {vehicle.priceUsd.toLocaleString("en-US")} aprox.)</p>
            <button
              onClick={() => setQuoteOpen(true)}
              className="mt-4 w-full rounded-2xl bg-[#FFD21F] py-3.5 text-sm font-extrabold text-black transition hover:brightness-105 active:scale-[0.98]"
            >
              Solicitar cotización / Test drive
            </button>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <a
                href="tel:+595981126769"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3 text-[13px] font-bold hover:bg-white/15"
              >
                <Phone className="h-4 w-4" /> Llamar
              </a>
              <a
                href="https://wa.me/595981126769?text=Hola,%20me%20interesa%20el%20BMW%20X6%20xDrive40i"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3 text-[13px] font-bold hover:bg-white/15"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
              {vehicle.summary.map((s) => (
                <div key={s.key} className="flex justify-between text-[13px]">
                  <span className="text-white/45">{s.label}</span>
                  <span className="font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
            <CheckCircle2 className="h-3.5 w-3.5" /> Unidad física verificada en salón
          </p>
        </aside>
      </div>

      {/* overlays */}
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={handleNavigate} />
      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          onClose={() => setLightbox(null)}
          onChange={(i) => {
            setLightbox((i + 12) % 12);
            setPhotoIndex((i + 12) % 12);
          }}
        />
      )}
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}

      {toast && (
        <div className="anim-slide-up fixed bottom-24 left-1/2 z-[90] -translate-x-1/2">
          <p className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1c1c1f] px-4 py-2.5 text-[13px] font-bold shadow-2xl ring-1 ring-white/15">
            <CheckCircle2 className="h-4 w-4 text-[#FFD21F]" /> {toast}
          </p>
        </div>
      )}
    </div>
  );
}
