
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, ChartLine } from 'lucide-react';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  quantity?: number;
  value?: number;
}

interface StockCardProps {
  stock: StockData;
  className?: string;
  onSelect?: (symbol: string) => void;
  isSelected?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ 
  stock, 
  className, 
  onSelect,
  isSelected = false
}) => {
  const { symbol, name, price, change, changePercent, quantity, value } = stock;
  const isPositive = change >= 0;
  
  return (
    <div 
      className={cn(
        "glass rounded-lg p-4 transition-all duration-300 ease-in-out animate-scale-in",
        "hover:shadow-md hover:translate-y-[-2px]",
        isSelected && "ring-2 ring-primary ring-opacity-70",
        className
      )}
      onClick={() => onSelect?.(symbol)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <ChartLine className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{symbol}</h3>
              <p className="text-sm text-muted-foreground truncate max-w-[180px]">{name}</p>
            </div>
          </div>
          
          {quantity !== undefined && (
            <div className="mt-3 flex items-center">
              <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                {quantity} shares
              </span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-lg font-medium">${price.toLocaleString()}</div>
          <div className={cn(
            "flex items-center justify-end text-sm",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)</span>
          </div>
          
          {value !== undefined && (
            <div className="text-sm text-muted-foreground mt-1">
              Value: ${value.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockCard;
