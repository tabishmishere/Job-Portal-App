const CurvedDottedArrow = () => (
  <svg
    width="80"
    height="40"
    viewBox="0 0 80 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20 C30 0, 50 40, 80 20"
      stroke="#22C55E"
      strokeWidth="2"
      strokeDasharray="5,5"
      fill="none"
      markerEnd="url(#arrowhead)"
    />
    <defs>
      <marker
        id="arrowhead"
        markerWidth="6"
        markerHeight="6"
        refX="3"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L6,3 z" fill="#22C55E" />
      </marker>
    </defs>
  </svg>
);

export default CurvedDottedArrow;
