"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DiaryEntry, getDiaryEntries, createDiaryEntry, updateDiaryEntry, deleteDiaryEntry } from "@/lib/diary";
import { BookOpen, Plus, Edit, Trash, Lock, Clock, Smile, Frown, Meh, Zap, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const moodIcons = {
  happy: <Smile className="h-4 w-4 text-green-500" />,
  sad: <Frown className="h-4 w-4 text-blue-500" />,
  neutral: <Meh className="h-4 w-4 text-gray-500" />,
  excited: <Zap className="h-4 w-4 text-yellow-500" />,
  stressed: <AlertTriangle className="h-4 w-4 text-red-500" />
};

export default function Diary() {
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  
  const { register, handleSubmit, reset, setValue } = useForm<{
    title: string;
    content: string;
    mood: "happy" | "sad" | "neutral" | "excited" | "stressed";
  }>();

  useEffect(() => {
    if (status === "authenticated") {
      setEntries(getDiaryEntries());
    }
  }, [status]);

  const onSubmit = (data: any) => {
    if (editingEntry) {
      const updated = updateDiaryEntry(editingEntry.id, data);
      if (updated) {
        setEntries(getDiaryEntries());
        toast.success("Entry updated successfully!");
      }
    } else {
      const newEntry = createDiaryEntry(data);
      setEntries(getDiaryEntries());
      toast.success("Entry created successfully!");
    }

    setIsDialogOpen(false);
    setEditingEntry(null);
    reset();
  };

  const handleEditEntry = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setValue("title", entry.title);
    setValue("content", entry.content);
    setValue("mood", entry.mood);
    setIsDialogOpen(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    if (deleteDiaryEntry(entryId)) {
      setEntries(getDiaryEntries());
      toast.success("Entry deleted successfully!");
    }
  };

  if (status === "loading") {
    return (
      <div className="py-12 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Lock className="h-16 w-16 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Private Diary</h2>
                <p className="text-muted-foreground mb-6">
                  This section is protected. Please sign in to access your personal diary entries.
                </p>
                <div className="space-y-4">
                  <Button onClick={() => signIn()} className="w-full">
                    Sign In to Access Diary
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Demo credentials: admin@portfolio.com / password123
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Personal Diary</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A private space to document your thoughts, experiences, and daily reflections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entries List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Recent Entries</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEntry ? "Edit Entry" : "Create New Entry"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingEntry ? "Update your diary entry." : "Write a new diary entry."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input {...register("title", { required: true })} placeholder="Entry title..." />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea 
                        {...register("content", { required: true })} 
                        placeholder="Write your thoughts..."
                        rows={8}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="mood">Mood</Label>
                      <Select onValueChange={(value) => setValue("mood", value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How are you feeling?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="happy">😊 Happy</SelectItem>
                          <SelectItem value="excited">⚡ Excited</SelectItem>
                          <SelectItem value="neutral">😐 Neutral</SelectItem>
                          <SelectItem value="sad">😢 Sad</SelectItem>
                          <SelectItem value="stressed">⚠️ Stressed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsDialogOpen(false);
                        setEditingEntry(null);
                        reset();
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingEntry ? "Update Entry" : "Save Entry"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {entries.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No entries yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start documenting your journey by creating your first diary entry.
                    </p>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Entry
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedEntry(entry)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{entry.title}</CardTitle>
                            {moodIcons[entry.mood]}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {dayjs(entry.createdAt).format("MMM D, YYYY")}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost" onClick={(e) => {
                                e.stopPropagation();
                                handleEditEntry(entry);
                              }}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEntry(entry.id);
                              }}>
                                <Trash className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">
                          {entry.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Entry Details */}
            {selectedEntry && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Entry Details</span>
                    {moodIcons[selectedEntry.mood]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedEntry.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {dayjs(selectedEntry.createdAt).format("MMMM D, YYYY [at] h:mm A")}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {selectedEntry.content}
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Created: {dayjs(selectedEntry.createdAt).format("MMM D, YYYY")}</span>
                      <span>Updated: {dayjs(selectedEntry.updatedAt).format("MMM D, YYYY")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mood Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Mood Overview</CardTitle>
                <CardDescription>Your emotional journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(moodIcons).map(([mood, icon]) => {
                    const count = entries.filter(entry => entry.mood === mood).length;
                    const percentage = entries.length > 0 ? (count / entries.length) * 100 : 0;
                    
                    return (
                      <div key={mood} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {icon}
                          <span className="text-sm capitalize">{mood}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Writing Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Entries</span>
                    <span className="font-medium">{entries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Words</span>
                    <span className="font-medium">
                      {entries.reduce((total, entry) => total + entry.content.split(' ').length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-medium">
                      {entries.filter(entry => 
                        dayjs(entry.createdAt).format("YYYY-MM") === dayjs().format("YYYY-MM")
                      ).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}