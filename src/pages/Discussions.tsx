import { useEffect, useState } from "react";
import { MessageCircle, Send, Search, Users, Clock, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { getDiscussions } from "@/composables/useDiscussions";
import { getMessages, sendMessage } from "@/composables/useMessages";
import type { Discussion, Message } from "@/types";

const Discussions = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let mounted = true;
    getDiscussions().then((data) => {
      if (mounted) {
        setDiscussions(data);
        if (data.length > 0) setSelectedDiscussion(data[0].id);
      }
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (selectedDiscussion === null) return;
    let mounted = true;
    getMessages(selectedDiscussion).then((data) => {
      if (mounted) setMessages(data);
    });
    return () => { mounted = false; };
  }, [selectedDiscussion]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedDiscussion === null) return;
    await sendMessage({
      discussionId: selectedDiscussion,
      author: "Moi",
      content: newMessage,
      isOwn: true,
    });
    setNewMessage("");
    // Refetch messages after sending
    const updated = await getMessages(selectedDiscussion);
    setMessages(updated);
  };

  const activeDiscussion = discussions.find(d => d.id === selectedDiscussion);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Discussions</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Discussions List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Mes Discussions</span>
                  <Button size="sm">
                    <a href="/discussions/new" className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Nouvelle
                    </a>
                  </Button>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedDiscussion === discussion.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedDiscussion(discussion.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {discussion.pinned && <Pin className="h-4 w-4 text-primary" />}
                          <h3 className="font-medium text-sm line-clamp-1">{discussion.title}</h3>
                        </div>
                        {discussion.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {discussion.unread}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {discussion.lastMessage}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {discussion.participants}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {discussion.category}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {discussion.lastMessageTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages Area */}
          <div className="lg:col-span-2">
            {selectedDiscussion && activeDiscussion ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">
                    {activeDiscussion.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {activeDiscussion.participants} participants
                    </span>
                    <Badge variant="outline">
                      {activeDiscussion.category}
                    </Badge>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex space-x-3 max-w-[70%] ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {message.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`rounded-lg p-3 ${
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}>
                            <div className="text-xs font-medium mb-1 opacity-80">
                              {message.author}
                            </div>
                            <p className="text-sm">{message.content}</p>
                            <div className="text-xs opacity-60 mt-1">{message.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[40px] max-h-32"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Sélectionnez une discussion pour commencer</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
