import { useState } from "react";
import { MessageCircle, Send, Search, Users, Clock, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";

const Discussions = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");

  const discussions = [
    {
      id: 1,
      title: "Questions sur l'imprimante 3D Prusa",
      lastMessage: "Merci pour l'aide, j'ai réussi à résoudre le problème !",
      lastMessageTime: "Il y a 5 min",
      participants: 4,
      unread: 2,
      pinned: true,
      category: "Matériel",
    },
    {
      id: 2,
      title: "Projet Innovation Durable - Équipe recherche",
      lastMessage: "La prochaine réunion est prévue vendredi à 14h",
      lastMessageTime: "Il y a 20 min",
      participants: 8,
      unread: 0,
      pinned: false,
      category: "Projet",
    },
    {
      id: 3,
      title: "Réservation matériel événement du 15 juillet",
      lastMessage: "Est-ce que quelqu'un peut me prêter un appareil photo ?",
      lastMessageTime: "Il y a 1h",
      participants: 12,
      unread: 1,
      pinned: false,
      category: "Réservation",
    },
  ];

  const messages = [
    {
      id: 1,
      author: "Pierre Martin",
      content:
        "Bonjour, j'ai un problème avec l'imprimante 3D. Le filament ne sort pas correctement, des idées ?",
      timestamp: "14h32",
      isOwn: false,
    },
    {
      id: 2,
      author: "Sophie Chen",
      content:
        "Salut Pierre ! As-tu vérifié la température de l'extrudeur ? Il faut qu'elle soit à 210°C pour le PLA.",
      timestamp: "14h35",
      isOwn: false,
    },
    {
      id: 3,
      author: "Marie Dubois",
      content: "Exactement ! Et aussi vérifier que le filament n'est pas cassé dans le tube guide.",
      timestamp: "14h38",
      isOwn: true,
    },
    {
      id: 4,
      author: "Pierre Martin",
      content:
        "Merci pour l'aide, j'ai réussi à résoudre le problème ! C'était effectivement la température.",
      timestamp: "14h45",
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

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
            {selectedDiscussion ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">
                    {discussions.find((d) => d.id === selectedDiscussion)?.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {discussions.find((d) => d.id === selectedDiscussion)?.participants}{" "}
                      participants
                    </span>
                    <Badge variant="outline">
                      {discussions.find((d) => d.id === selectedDiscussion)?.category}
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
                          <div
                            className={`rounded-lg p-3 ${
                              message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
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
