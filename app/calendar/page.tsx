"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarEvent, getCalendarEvents, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "@/lib/calendar";
import { Calendar, Plus, Edit, Trash, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  
  const { register, handleSubmit, reset, setValue, watch } = useForm<{
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    type: "personal" | "work" | "project" | "meeting";
  }>();

  useEffect(() => {
    setEvents(getCalendarEvents());
  }, []);

  const eventTypeColors = {
    personal: "#8B5CF6",
    work: "#10B981", 
    project: "#F59E0B",
    meeting: "#3B82F6"
  };

  const onSubmit = (data: any) => {
    const startDateTime = new Date(`${data.date}T${data.startTime}`);
    const endDateTime = new Date(`${data.date}T${data.endTime}`);
    
    const eventData = {
      title: data.title,
      description: data.description,
      start: startDateTime,
      end: endDateTime,
      type: data.type,
      color: eventTypeColors[data.type as keyof typeof eventTypeColors]
    };

    if (editingEvent) {
      const updated = updateCalendarEvent(editingEvent.id, eventData);
      if (updated) {
        setEvents(getCalendarEvents());
        toast.success("Event updated successfully!");
      }
    } else {
      const newEvent = createCalendarEvent(eventData);
      setEvents(getCalendarEvents());
      toast.success("Event created successfully!");
    }

    setIsDialogOpen(false);
    setEditingEvent(null);
    reset();
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setValue("title", event.title);
    setValue("description", event.description || "");
    setValue("date", dayjs(event.start).format("YYYY-MM-DD"));
    setValue("startTime", dayjs(event.start).format("HH:mm"));
    setValue("endTime", dayjs(event.end).format("HH:mm"));
    setValue("type", event.type);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (deleteCalendarEvent(eventId)) {
      setEvents(getCalendarEvents());
      toast.success("Event deleted successfully!");
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      dayjs(event.start).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    );
  };

  const days = getDaysInMonth(selectedDate);
  const today = new Date();

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
            <Calendar className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Calendar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your schedule, track events, and stay organized with your personal calendar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {dayjs(selectedDate).format("MMMM YYYY")}
                    </CardTitle>
                    <CardDescription>
                      {events.length} events this month
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    >
                      →
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {editingEvent ? "Edit Event" : "Create New Event"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingEvent ? "Update your event details." : "Add a new event to your calendar."}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input {...register("title", { required: true })} />
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea {...register("description")} />
                          </div>
                          
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input type="date" {...register("date", { required: true })} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startTime">Start Time</Label>
                              <Input type="time" {...register("startTime", { required: true })} />
                            </div>
                            <div>
                              <Label htmlFor="endTime">End Time</Label>
                              <Input type="time" {...register("endTime", { required: true })} />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="type">Event Type</Label>
                            <Select onValueChange={(value) => setValue("type", value as any)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="project">Project</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => {
                              setIsDialogOpen(false);
                              setEditingEvent(null);
                              reset();
                            }}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              {editingEvent ? "Update Event" : "Create Event"}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const dayEvents = getEventsForDate(day.date);
                    const isToday = dayjs(day.date).format("YYYY-MM-DD") === dayjs(today).format("YYYY-MM-DD");
                    
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`
                          min-h-[80px] p-1 border rounded-md cursor-pointer transition-colors
                          ${day.isCurrentMonth ? "bg-background" : "bg-muted/50"}
                          ${isToday ? "bg-primary/10 border-primary" : "border-border"}
                          hover:bg-muted/50
                        `}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          day.isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                        } ${isToday ? "text-primary font-bold" : ""}`}>
                          {day.date.getDate()}
                        </div>
                        
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs p-1 rounded truncate"
                              style={{ backgroundColor: event.color + "20", color: event.color }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Today's Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getEventsForDate(today).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events scheduled for today.</p>
                ) : (
                  <div className="space-y-3">
                    {getEventsForDate(today).map((event) => (
                      <div key={event.id} className="p-3 border rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {dayjs(event.start).format("HH:mm")} - {dayjs(event.end).format("HH:mm")}
                        </p>
                        <Badge variant="outline" style={{ color: event.color }}>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Types Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(eventTypeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}