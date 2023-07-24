interface PieChartData {
    label: string;
    value: number;
    color: string;
  }
  
  interface PieChartProps {
    data: PieChartData[];
    radius: number;
    strokeWidth: number;
  }
  
  export default function PieChart({ data, radius, strokeWidth }: PieChartProps) {
    const calculateAngle = (value: number, total: number) => (value / total) * 360;
  
    const createSlicePath = (
      startAngle: number,
      endAngle: number,
      cx: number,
      cy: number,
      r: number,
      strokeWidth: number
    ) => {
      const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
      const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
      const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
      const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      return `
        M ${cx} ${cy}
        L ${x1} ${y1}
        A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
    };
  
    const total = data.reduce((sum, item) => sum + item.value, 0);

    let startAngle = 0;
    const slices = data.map((item, index) => {
      const angle = calculateAngle(item.value, total);
      const endAngle = startAngle + angle;
      const slicePath = createSlicePath(
        startAngle,
        endAngle,
        radius,
        radius,
        radius,
        strokeWidth
      );
      startAngle = endAngle;
  
      return (
        <path
          key={index}
          d={slicePath}
          fill={item.color}
          stroke="#f3f3f2"
          strokeWidth={strokeWidth}
        />
      );
    });

  
  return (
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        {slices}
      </svg>
  );
}