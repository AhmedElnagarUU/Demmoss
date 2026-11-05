// A drawn smile (before or after treatment). The demo shows illustrations, never real patient photos.
// Three looks differ in which teeth are missing and in the background tint.

type Look = { missing: readonly number[]; background: readonly [string, string] };

const looks: readonly Look[] = [
  { missing: [3, 6], background: ["#ece6dc", "#d6cbbb"] },
  { missing: [2, 4, 7], background: ["#e8ecdf", "#cfd8bf"] },
  { missing: [1, 5, 8], background: ["#e9e4ee", "#d3c9de"] },
];

const TOOTH_COUNT = 10;
const crooked = [-5, 0, 4, 0, -3, 2, 0, -4, 3, 0];

function toothPosition(index: number) {
  const middle = (TOOTH_COUNT - 1) / 2;
  const offset = index - middle;
  return { x: 340 + index * 102, y: 330 + offset * offset * 7 };
}

type Props = { stage: "before" | "after"; look: number; className?: string };

export function SmileIllustration({ stage, look, className }: Props) {
  const chosen = looks[look] ?? looks[0];
  if (!chosen) return null;
  const after = stage === "after";
  const gradientId = `smile-${stage}-${look}`;

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={chosen.background[0]} />
          <stop offset="1" stopColor={chosen.background[1]} />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${gradientId})`} />
      <path
        d="M200 300 Q800 160 1400 300 L1400 470 Q800 380 200 470 Z"
        fill={after ? "#e58f9d" : "#c9707d"}
      />
      <path
        d="M240 640 Q800 800 1360 640 L1360 760 Q800 900 240 760 Z"
        fill={after ? "#e58f9d" : "#c9707d"}
      />
      {Array.from({ length: TOOTH_COUNT }, (_, index) => {
        const { x, y } = toothPosition(index);
        const missing = !after && chosen.missing.includes(index);
        const replaced = after && chosen.missing.includes(index);
        if (missing)
          return <ellipse key={index} cx={x + 42} cy={y + 60} rx="26" ry="14" fill="#a85a66" opacity=".6" />;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width="86"
            height="130"
            rx="34"
            fill={after ? "#ffffff" : "#e3cf9c"}
            stroke={replaced ? "#4a7a0a" : after ? "#d8dccd" : "#b9a372"}
            strokeWidth={replaced ? 5 : 2}
            transform={after ? undefined : `rotate(${crooked[index] ?? 0} ${x + 43} ${y + 65})`}
          />
        );
      })}
    </svg>
  );
}
