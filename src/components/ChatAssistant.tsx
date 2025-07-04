import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { language } = useLanguage();

  const chatContent = {
    fr: {
      title: "Assistant Maritime",
      placeholder: "Posez votre question sur nos services...",
      typing: "Assistant en train d'écrire...",
      welcomeMessage: "Bonjour ! Je suis votre assistant maritime. Comment puis-je vous aider avec vos questions sur nos services de consignation, manutention ou transit ?",
      quickActions: [
        "Tarifs de consignation",
        "Délais de manutention", 
        "Procédures douanières",
        "Contact urgence"
      ]
    },
    en: {
      title: "Maritime Assistant",
      placeholder: "Ask your question about our services...",
      typing: "Assistant is typing...",
      welcomeMessage: "Hello! I'm your maritime assistant. How can I help you with questions about our consignment, handling or transit services?",
      quickActions: [
        "Consignment rates",
        "Handling timeframes",
        "Customs procedures", 
        "Emergency contact"
      ]
    }
  };

  const content = chatContent[language];

  // Simulated FAQ responses
  const getFAQResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (language === 'fr') {
      if (lowerQuestion.includes('tarif') || lowerQuestion.includes('prix')) {
        return "Nos tarifs de consignation démarrent à partir de 150 000 FCFA selon le tonnage du navire. Contactez-nous pour un devis personnalisé.";
      }
      if (lowerQuestion.includes('délai') || lowerQuestion.includes('temps')) {
        return "Les opérations de manutention prennent généralement 24-48h selon le type de marchandise et les conditions météorologiques.";
      }
      if (lowerQuestion.includes('douane') || lowerQuestion.includes('dédouanement')) {
        return "Nous nous occupons de toutes les formalités douanières. Le délai moyen de dédouanement est de 2-4 jours ouvrables.";
      }
      if (lowerQuestion.includes('urgence') || lowerQuestion.includes('contact')) {
        return "Pour les urgences 24/7, appelez le +221 77 XXX XX XX ou écrivez à urgence@ndoukoumane-services.sn";
      }
      return "Merci pour votre question. Un de nos experts vous répondra sous peu. Pour une réponse immédiate, contactez-nous au +221 33 XXX XX XX.";
    } else {
      if (lowerQuestion.includes('rate') || lowerQuestion.includes('price')) {
        return "Our consignment rates start from 150,000 FCFA depending on vessel tonnage. Contact us for a personalized quote.";
      }
      if (lowerQuestion.includes('timeframe') || lowerQuestion.includes('time')) {
        return "Handling operations typically take 24-48h depending on cargo type and weather conditions.";
      }
      if (lowerQuestion.includes('customs')) {
        return "We handle all customs formalities. Average customs clearance time is 2-4 business days.";
      }
      if (lowerQuestion.includes('emergency') || lowerQuestion.includes('contact')) {
        return "For 24/7 emergencies, call +221 77 XXX XX XX or write to urgence@ndoukoumane-services.sn";
      }
      return "Thank you for your question. One of our experts will respond shortly. For immediate response, contact us at +221 33 XXX XX XX.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getFAQResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: content.welcomeMessage,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    initializeChat();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          className="bg-white hover:bg-white/90 text-blue-deep rounded-full w-14 h-14 transition-all duration-300 animate-pulse"
          style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Badge className="absolute -top-2 -left-2 bg-white text-blue-deep border border-blue-deep/20">
          24/7
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        {/* Chat Header */}
        <CardHeader className="pb-3 bg-blue-deep text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white rounded-full">
                <Bot className="h-4 w-4 text-blue-deep" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">
                  {content.title}
                </CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-white/80">En ligne</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-deep text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-deep" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5" />
                        )}
                        <div className="text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-deep" />
                        <div className="text-sm text-gray-600">
                          {content.typing}
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-3 border-t">
                <div className="grid grid-cols-2 gap-2">
                  {content.quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs p-2 h-auto border-blue-deep text-blue-deep hover:bg-blue-deep hover:text-white"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={content.placeholder}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-deep hover:bg-blue-deep/90 text-white px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatAssistant;
