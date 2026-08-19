import { motion } from "framer-motion";

export interface TaxonomicMetadataProps {
  className?: string;
  lat?: string;
  lon?: string;
  hub?: string;
  spec?: string;
  status?: string;
  version?: string;
}

export function TaxonomicMetadata({
  className = "",
  lat = "-22.9068°",
  lon = "-47.0616°",
  hub = "CAMPINAS/SP",
  spec = "OBSIDIAN V6",
  status = "VERIFIED",
  version = "v8.0",
}: TaxonomicMetadataProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Metadados de Engenharia Territorial"
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-1 text-[10px] md:text-[11px] font-mono tracking-[0.14em] uppercase text-white/40 select-none ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4 border-b border-white/[0.05] pb-2">
        {/* Metadados Territoriais (Coordenadas + Hub) */}
        <div className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676]" aria-hidden="true" />
          <span className="text-white/60 hover:text-white transition-colors">
            LAT <span className="text-white/80 tabular-nums">{lat}</span> / LON <span className="text-white/80 tabular-nums">{lon}</span>
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white/60">
            HUB <span className="text-white/90 font-medium">{hub}</span>
          </span>
        </div>

        {/* Metadados de Especificação & Governança */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-white/30">SPEC:</span>
            <span className="text-white/70 font-medium">{spec}</span>
          </div>

          <span className="hidden sm:inline text-white/20">·</span>

          <div className="flex items-center gap-1.5">
            <span className="text-white/30">STATUS:</span>
            <span className="inline-flex items-center gap-1 text-[#00E676] font-medium bg-[#00E676]/10 px-1.5 py-0.5 rounded border border-[#00E676]/20">
              <span className="size-1 rounded-full bg-[#00E676]" />
              {status} {version}
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
