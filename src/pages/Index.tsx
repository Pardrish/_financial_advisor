
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PortfolioTracker from '@/components/PortfolioTracker';
import ChatBot from '@/components/ChatBot';
import FraudAlerts from '@/components/FraudAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartLine, MessageSquare, ShieldAlert } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  
  return (
    <Layout>
      <Tabs 
        defaultValue="portfolio" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full animate-fade-in"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="portfolio" className="flex items-center space-x-2">
            <ChartLine className="h-4 w-4" />
            <span>Portfolio Tracker</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="fraud" className="flex items-center space-x-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Fraud Alerts</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="animate-scale-in">
          <PortfolioTracker />
        </TabsContent>
        
        <TabsContent value="chatbot" className="animate-scale-in">
          <ChatBot />
        </TabsContent>
        
        <TabsContent value="fraud" className="animate-scale-in">
          <FraudAlerts />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
