
import React, { useState } from 'react';
import StockCard, { StockData } from './StockCard';
import PortfolioChart from './PortfolioChart';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample data for demonstration
const samplePortfolio: StockData[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 1.25, changePercent: 0.68, quantity: 15, value: 2788.8 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 402.65, change: -3.21, changePercent: -0.79, quantity: 8, value: 3221.2 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.87, change: 2.34, changePercent: 1.32, quantity: 12, value: 2146.44 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 164.5, change: 0.87, changePercent: 0.53, quantity: 10, value: 1645 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 237.01, change: -5.62, changePercent: -2.32, quantity: 7, value: 1659.07 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 110.88, change: 1.53, changePercent: 1.40, quantity: 25, value: 2772 },
];

const PortfolioTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  
  const filteredStocks = samplePortfolio.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalValue = samplePortfolio.reduce((acc, stock) => acc + (stock.value || 0), 0);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">Your Portfolio</h2>
          <p className="text-muted-foreground mt-1">
            Total Value: <span className="font-medium text-foreground">${totalValue.toLocaleString()}</span>
          </p>
        </div>
        
        <div className="flex space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>
      
      <PortfolioChart className="shadow-sm" />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Your Holdings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStocks.map((stock) => (
            <StockCard 
              key={stock.symbol} 
              stock={stock} 
              onSelect={setSelectedStock}
              isSelected={selectedStock === stock.symbol}
            />
          ))}
        </div>
        
        {filteredStocks.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No stocks matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioTracker;
