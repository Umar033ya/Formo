import logoImg from '../assets/formo.png';

export default function FormoLogo({ className = '' }) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <div className="relative h-12 w-12 shrink-0 overflow-hidden">
        <img
          src={logoImg}
          alt="Formo"
          className="pointer-events-none absolute left-1/2 top-[42%] h-[270%] w-[270%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{ mixBlendMode: 'lighten', filter: 'contrast(1.2) brightness(1.15)' }}
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[15px] font-black leading-tight tracking-wide text-white">Formo</p>
        <p className="truncate text-[11px] font-semibold leading-tight text-slate-400">tikuv sex</p>
      </div>
    </div>
  );
}
