
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

// Sample data for demonstration
const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 5500 },
  { name: 'Oct', value: 7000 },
  { name: 'Nov', value: 6600 },
  { name: 'Dec', value: 8100 },
];

interface TimeRange {
  label: string;
  value: string;
}

const timeRanges: TimeRange[] = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
  { label: 'All', value: 'all' },
];

interface PortfolioChartProps {
  className?: string;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ className }) => {
  const [selectedRange, setSelectedRange] = useState<string>('1y');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRangeChange = (range: string) => {
    setIsLoading(true);
    setSelectedRange(range);
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const isPositiveChange = sampleData[sampleData.length - 1].value > sampleData[0].value;
  const lineColor = isPositiveChange ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';

  return (
    <div className={cn("rounded-lg p-4 bg-card animate-fade-in", className)}>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h3 className="text-lg font-medium">Portfolio Value</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-medium">$124,568.94</span>
            <span className={cn(
              "ml-2 text-sm",
              isPositiveChange ? "text-green-500" : "text-red-500"
            )}>
              {isPositiveChange ? '+' : '-'}7.2%
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1 bg-secondary/50 rounded-lg p-1 self-start">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleRangeChange(range.value)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                selectedRange === range.value
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full mt-4 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-xs z-10 animate-fade-in">
            <div className="animate-pulse-subtle">Loading data...</div>
          </div>
        )}
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
              tickMargin={10} 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
              tickMargin={10} 
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={lineColor} 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;
