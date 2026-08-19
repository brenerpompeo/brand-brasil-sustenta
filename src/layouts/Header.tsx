import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const cn = (...classes: (string | boolean | undefined | null | number)[]) => classes.filter(Boolean).join(" ");

export interface NavItem {
  id: string;
  num: string;
  label: string;
  desc: string;
  accent?: string;
}

export interface NavGroup {
  id: string;
  title: string;
  accent: string;
  items: NavItem[];
}

export const CANONICAL_NAV_GROUPS: NavGroup[] = [
  {
    id: "identidade",
    title: "Identidade",
    accent: "#00E676",
    items: [
      {
        id: "visao-manifesto",
        num: "01",
        label: "Visão & Manifesto",
        desc: "Tese de shared value e compromissos inegociáveis",
        accent: "#00E676",
      },
      {
        id: "logo-geometria",
        num: "02",
        label: "Logomarca & Geometria",
        desc: "Malha cartesiana, safe-zone e Do's & Don'ts",
        accent: "#00E676",
      },
      {
        id: "sistema-cromatico",
        num: "03",
        label: "Sistema Cromático",
        desc: "Swatches de luminância e 3 elevações tonais",
        accent: "#00E676",
      },
      {
        id: "tipografia-escultural",
        num: "04",
        label: "Tipografia Escultural",
        desc: "Antonio Display, Outfit e Geist Mono",
        accent: "#FFD600",
      },
    ],
  },
  {
    id: "tokens",
    title: "Design Tokens",
    accent: "#FFD600",
    items: [
      {
        id: "tom-de-voz",
        num: "05",
        label: "Tom de Voz",
        desc: "Filtro anti-greenwashing e calçada high-end",
        accent: "#2979FF",
      },
      {
        id: "diretriz-fotografica",
        num: "06",
        label: "Diretriz Fotográfica",
        desc: "Tratamento documental e granulação orgânica",
        accent: "#2979FF",
      },
      {
        id: "componentes-bento",
        num: "07",
        label: "Componentes & Bento UI",
        desc: "Bento cards, botões cápsula e fit score Suzely",
        accent: "#00E676",
      },
    ],
  },
  {
    id: "impacto-metodo",
    title: "Impacto & Método",
    accent: "#2979FF",
    items: [
      {
        id: "ods-governanca",
        num: "08",
        label: "Agenda ODS 1-18 & Governança",
        desc: "18 metas territoriais, MEC 10% e framework ADR",
        accent: "#FFD600",
      },
    ],
  },
];

export const CANONICAL_SECTION_IDS = CANONICAL_NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

/** Hook robusto para scroll spy de seções */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] || "visao-manifesto");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentSection = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }
      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids]);

  return active;
}

export function Header() {
  const active = useActiveSection(CANONICAL_SECTION_IDS);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-4 z-50 px-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="relative flex items-center justify-between h-14 px-4 sm:px-6 rounded-full bg-[#08090A]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-colors duration-200 hover:border-white/[0.12]">
          
          {/* Logo Brasil Sustenta integrado com Monograma Tátil */}
          <a
            href="#"
            className="flex items-center gap-2.5 select-none shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
            style={{ textDecoration: "none" }}
            aria-label="Brasil Sustenta Brand Book"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-[#F3F4F6] group-hover:text-white transition-colors">
                BRASIL SUSTENTA<span className="text-[#00E676] ml-0.5">.</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20 hidden sm:inline-block">
                BRAND
              </span>
            </div>
          </a>

          {/* 3 Dropdowns Interativos Desktop por Pilares */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação Principal">
            {CANONICAL_NAV_GROUPS.map((group) => {
              const isGroupActive = group.items.some((i) => i.id === active);
              const isDropdownOpen = activeDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isDropdownOpen ? null : group.id)}
                    aria-expanded={isDropdownOpen}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] rounded-full transition-all duration-200 cursor-pointer font-normal",
                      isDropdownOpen || isGroupActive
                        ? "text-white bg-white/[0.08] font-medium border border-white/[0.10]"
                        : "text-white/65 hover:text-white hover:bg-white/[0.03] border border-transparent"
                    )}
                  >
                    <span>{group.title}</span>
                    <svg
                      className={cn(
                        "size-3 opacity-50 transition-transform duration-200",
                        isDropdownOpen && "rotate-180 opacity-100"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu Flutuante */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className="absolute top-full left-0 pt-2 w-84 z-50"
                      >
                        <div className="rounded-2xl bg-[#121417]/95 backdrop-blur-2xl border border-white/[0.10] p-2 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                          <div className="px-3 py-1.5 mb-1 border-b border-white/[0.06] flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                              Pilar · {group.title}
                            </span>
                            <span className="size-1.5 rounded-full" style={{ background: group.accent }} />
                          </div>

                          <div className="grid gap-1">
                            {group.items.map((item) => {
                              const isItemActive = active === item.id;
                              return (
                                <a
                                  key={item.id}
                                  href={`#${item.id}`}
                                  onClick={handleLinkClick}
                                  style={{ textDecoration: "none" }}
                                  className={cn(
                                    "group flex items-start gap-2.5 p-2.5 rounded-xl transition-all duration-150",
                                    isItemActive
                                      ? "bg-white/[0.08] border border-white/[0.10]"
                                      : "hover:bg-[#1C1F24] border border-transparent"
                                  )}
                                >
                                  <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 mt-0.5 tabular-nums">
                                    {item.num}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[13px] font-medium text-white/90 group-hover:text-white transition-colors block leading-tight truncate">
                                        {item.label}
                                      </span>
                                    </div>
                                    <span className="text-[11px] text-white/40 block leading-snug mt-0.5 font-light">
                                      {item.desc}
                                    </span>
                                  </div>
                                  <span
                                    className="size-1.5 rounded-full mt-1.5 shrink-0 transition-transform group-hover:scale-125"
                                    style={{ background: item.accent ?? "#00E676" }}
                                  />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Ação Direita: Indicador de Versão + Botão Cápsula */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#sistema-cromatico"
              style={{ textDecoration: "none" }}
              className="font-mono text-[11px] text-white/50 hover:text-white transition-colors px-2 py-1 select-none"
            >
              v8.0 High-End
            </a>
            <a
              href="#componentes-bento"
              style={{ textDecoration: "none" }}
              className="relative inline-flex items-center justify-center gap-1.5 px-4 min-h-[36px] h-9 rounded-full bg-white text-[#08090A] text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-[#00E676] active:scale-[0.98] shadow-[0_0_16px_rgba(255,255,255,0.08)] hover:shadow-[0_0_20px_rgba(0,230,118,0.25)] select-none"
            >
              <span>Ver UI</span>
              <span className="text-[10px]" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Botão Mobile Toggle com Touch Target Mínimo de 44px */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="min-w-[44px] min-h-[44px] size-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
              aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isOpen}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <motion.path
                  d="M3 4.5H15"
                  stroke={isOpen ? "#00E676" : "#F3F4F6"}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  animate={isOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ originX: "9px", originY: "4.5px" }}
                />
                <motion.path
                  d="M3 9H15"
                  stroke={isOpen ? "#00E676" : "#F3F4F6"}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.path
                  d="M3 13.5H15"
                  stroke={isOpen ? "#00E676" : "#F3F4F6"}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  animate={isOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ originX: "9px", originY: "13.5px" }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gaveta Mobile Responsiva — Framer Motion com 8 Seções Canônicas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="block md:hidden mt-2 max-w-5xl mx-auto pointer-events-auto"
          >
            <div className="rounded-3xl bg-[#08090A]/98 backdrop-blur-3xl border border-white/[0.08] p-5 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#00E676] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Índice Canônico · 8 Seções
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                  v8.0 High-End
                </span>
              </div>

              {CANONICAL_NAV_GROUPS.map((group) => (
                <div key={group.id} className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                      {group.title}
                    </span>
                    <span className="size-1.5 rounded-full" style={{ background: group.accent }} />
                  </div>
                  
                  <div className="grid gap-1">
                    {group.items.map((item) => {
                      const isItemActive = active === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={handleLinkClick}
                          style={{ textDecoration: "none" }}
                          className={cn(
                            "flex items-center justify-between min-h-[44px] p-2.5 rounded-xl text-xs transition-colors",
                            isItemActive
                              ? "bg-white/[0.08] text-[#00E676] font-medium border border-white/[0.08]"
                              : "text-white/70 hover:text-white hover:bg-white/[0.03]"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] text-white/30 tabular-nums">
                              {item.num}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-medium text-white/90 text-[13px]">{item.label}</span>
                              <span className="text-[10px] text-white/40 font-light">{item.desc}</span>
                            </div>
                          </div>
                          <span
                            className="size-1.5 rounded-full shrink-0"
                            style={{ background: item.accent ?? "#00E676" }}
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href="#componentes-bento"
                  onClick={handleLinkClick}
                  style={{ textDecoration: "none" }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full bg-white text-[#08090A] text-xs font-semibold uppercase tracking-wider hover:bg-[#00E676] transition-colors"
                >
                  <span>Acessar Biblioteca UI</span>
                  <span className="text-[11px]">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
