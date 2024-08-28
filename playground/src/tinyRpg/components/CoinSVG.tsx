export default function CoinSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="coinGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#ffcc4d" />
          <stop offset="100%" stopColor="#ffac33" />
        </radialGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#coinGradient)"
        stroke="#ffcc4d"
        strokeWidth="2"
      />
    </svg>
  )
}
