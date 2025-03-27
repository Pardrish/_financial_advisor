
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShieldAlert, ExternalLink, Search, AlertTriangle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Sample data for demonstration
const sampleFraudulentSites = [
  {
    id: '1',
    name: 'CryptoDoubleX',
    url: 'cryptodoublex.com',
    category: 'crypto',
    description: 'Promises to double cryptocurrency investments within 24 hours. Known Ponzi scheme.',
    riskLevel: 'high',
    dateAdded: '2023-09-15',
  },
  {
    id: '2',
    name: 'StockProfitNow',
    url: 'stockprofitnow.net',
    category: 'stock',
    description: 'Fake stock trading platform that steals user credentials and payment information.',
    riskLevel: 'high',
    dateAdded: '2023-10-21',
  },
  {
    id: '3',
    name: 'NFTFastFlip',
    url: 'nftfastflip.io',
    category: 'nft',
    description: 'Fraudulent NFT marketplace selling fake or non-existent tokens.',
    riskLevel: 'medium',
    dateAdded: '2023-11-05',
  },
  {
    id: '4',
    name: 'ForexElitePro',
    url: 'forexelitepro.org',
    category: 'forex',
    description: 'Unregulated forex trading platform with fake testimonials and guaranteed returns.',
    riskLevel: 'high',
    dateAdded: '2023-12-12',
  },
  {
    id: '5',
    name: 'InvestmentGoldMine',
    url: 'investgoldmine.com',
    category: 'investment',
    description: 'Fake investment firm promising unrealistic returns on commodities trading.',
    riskLevel: 'medium',
    dateAdded: '2024-01-18',
  },
];

const FraudAlerts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredSites = sampleFraudulentSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'stock', label: 'Stock Trading' },
    { value: 'nft', label: 'NFTs' },
    { value: 'forex', label: 'Forex' },
    { value: 'investment', label: 'Investment' },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-destructive/10 p-2 rounded-full">
            <ShieldAlert className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h2 className="text-2xl font-medium tracking-tight">Fraud Alerts</h2>
            <p className="text-muted-foreground">Stay informed about fraudulent investment websites</p>
          </div>
        </div>
      </div>
      
      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-muted-foreground mb-4 flex items-start">
          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
          <p>
            Be cautious of websites promising unrealistic returns or requesting sensitive information. 
            Verify all investment platforms through official channels before investing.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search fraudulent sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          
          <Button variant="outline">
            Report a Site
          </Button>
        </div>
        
        <div className="rounded-md overflow-hidden border">
          <table className="w-full">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 text-sm font-medium">Site Name</th>
                <th className="px-4 py-3 text-sm font-medium">URL</th>
                <th className="px-4 py-3 text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-sm font-medium">Risk Level</th>
                <th className="px-4 py-3 text-sm font-medium">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredSites.map((site) => (
                <tr key={site.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <AlertTriangle className={cn(
                        "h-4 w-4 mr-2",
                        site.riskLevel === 'high' ? "text-destructive" : "text-amber-500"
                      )} />
                      <span>{site.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center">
                      {site.url}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      site.category === 'crypto' && "bg-blue-100 text-blue-800",
                      site.category === 'stock' && "bg-green-100 text-green-800",
                      site.category === 'nft' && "bg-purple-100 text-purple-800",
                      site.category === 'forex' && "bg-amber-100 text-amber-800",
                      site.category === 'investment' && "bg-gray-100 text-gray-800",
                    )}>
                      {site.category === 'crypto' && 'Cryptocurrency'}
                      {site.category === 'stock' && 'Stock Trading'}
                      {site.category === 'nft' && 'NFT'}
                      {site.category === 'forex' && 'Forex'}
                      {site.category === 'investment' && 'Investment'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      site.riskLevel === 'high' && "bg-red-100 text-red-800",
                      site.riskLevel === 'medium' && "bg-amber-100 text-amber-800",
                      site.riskLevel === 'low' && "bg-green-100 text-green-800",
                    )}>
                      {site.riskLevel === 'high' && 'High Risk'}
                      {site.riskLevel === 'medium' && 'Medium Risk'}
                      {site.riskLevel === 'low' && 'Low Risk'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-sm">
                    {new Date(site.dateAdded).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSites.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No fraudulent sites matching your search criteria.
            </div>
          )}
        </div>
      </div>
      
      <div className="glass p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">How to Stay Safe</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </span>
            <span>Verify all investment platforms through official regulatory websites.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </span>
            <span>Be skeptical of platforms promising unrealistic or guaranteed returns.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </span>
            <span>Never share your private keys or security phrases with any website or individual.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </span>
            <span>Use secure, unique passwords for each investment platform.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </span>
            <span>Enable two-factor authentication whenever possible.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FraudAlerts;
