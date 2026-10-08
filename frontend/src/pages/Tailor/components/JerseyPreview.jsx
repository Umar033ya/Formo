const LIGHT_COLORS = ['#f8fafc', '#ffffff', '#facc15', '#fde68a', '#fef3c7'];

function readableInk(hex) {
  return LIGHT_COLORS.includes(String(hex).toLowerCase()) ? '#0f172a' : '#ffffff';
}

export default function JerseyPreview({ color = '#dc2626', number = 9, name = 'DILSHOD' }) {
  const ink = readableInk(color);

  return (
    <svg
      viewBox="0 0 240 268"
      className="h-full w-full"
      role="img"
      aria-label={`${name} futbolka maketi`}
    >
      <defs>
        <linearGradient id="jerseyShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="jerseyShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="252" rx="78" ry="9" fill="#000000" opacity="0.45" />

      <path
        d="M84 24 L44 38 L16 106 L54 124 L70 94 L70 230 Q120 244 170 230 L170 94 L186 124 L224 106 L196 38 L156 24 C154 54 86 54 84 24 Z"
        fill={color}
      />
      <path
        d="M84 24 L44 38 L16 106 L54 124 L70 94 L70 230 Q120 244 170 230 L170 94 L186 124 L224 106 L196 38 L156 24 C154 54 86 54 84 24 Z"
        fill="url(#jerseyShade)"
      />

      <path d="M44 38 L16 106 L34 114 L62 50 Z" fill="#ffffff" opacity="0.14" />
      <path d="M196 38 L224 106 L206 114 L178 50 Z" fill="#ffffff" opacity="0.14" />

      <path
        d="M84 24 C86 54 154 54 156 24"
        fill="none"
        stroke={ink}
        strokeOpacity="0.75"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <rect x="70" y="230" width="100" height="6" fill="url(#jerseyShadow)" />

      <text
        x="120"
        y="76"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={ink}
        letterSpacing="4"
      >
        {String(name).slice(0, 10)}
      </text>
      <text
        x="120"
        y="164"
        textAnchor="middle"
        fontSize="76"
        fontWeight="800"
        fill={ink}
        opacity="0.95"
      >
        {number}
      </text>
    </svg>
  );
}
