"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "./actions";
import { Paperclip, SendHorizontal, BrainCircuit, Bot, User, X } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BotTypingIndicator } from "@/components/bot-typing-indicator";

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set initial message only on the client-side to avoid hydration mismatch
    setMessages([
        { id: 'initial-message', sender: 'bot', text: "Hello! I'm Claribee 🐝. How can I assist you with college-related questions today?" }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userQuery = input.trim();
    if (!userQuery && !pdfFile) return;

    const userMessage: Message = { 
      id: crypto.randomUUID(), 
      sender: 'user', 
      text: userQuery || `File: ${pdfFile?.name}` 
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");
    setPdfFile(null);

    try {
      const botResponseText = await sendMessage(userQuery);
      const botMessage: Message = { id: crypto.randomUUID(), sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
      const errorMessage: Message = { id: crypto.randomUUID(), sender: 'bot', text: "I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        setPdfFile(file);
      } else if (file) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a PDF file.",
        });
        setPdfFile(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-2 sm:p-4">
      <Card className="w-full max-w-3xl h-[95vh] flex flex-col shadow-2xl rounded-2xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-2xl flex-row items-center gap-4">
          <BrainCircuit className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold font-headline">Claribee 🐝</h1>
            <p className="text-sm text-primary-foreground/80">Your AI guide to college life</p>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex items-end gap-3", msg.sender === 'user' ? 'justify-end' : '')}>
                  {msg.sender === 'bot' && (
                    <Avatar className="w-9 h-9 border">
                      <AvatarFallback>
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[75%] p-3 rounded-xl shadow-sm", msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none')}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                   {msg.sender === 'user' && (
                    <Avatar className="w-9 h-9 border">
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && <BotTypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-2 sm:p-4 border-t">
          <form onSubmit={handleSend} className="flex items-center w-full gap-2">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden" 
              id="pdf-upload"
            />
             {pdfFile ? (
              <div className="flex items-center gap-2 text-sm bg-muted/70 pl-3 pr-2 py-1 rounded-full text-muted-foreground whitespace-nowrap">
                <span className="max-w-[120px] truncate">{pdfFile.name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button type="button" variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="w-4 h-4" />
                <span className="sr-only">Attach PDF</span>
              </Button>
            )}
            <Input 
              type="text" 
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 rounded-full px-4 focus-visible:ring-accent"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading || (!input.trim() && !pdfFile)} className="bg-accent hover:bg-accent/90 rounded-full">
              <SendHorizontal className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
