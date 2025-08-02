"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Globe } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const timezones = [
  { name: "Local Time", zone: dayjs.tz.guess() },
  { name: "New York", zone: "America/New_York" },
  { name: "Los Angeles", zone: "America/Los_Angeles" },
  { name: "London", zone: "Europe/London" },
  { name: "Paris", zone: "Europe/Paris" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
  { name: "Sydney", zone: "Australia/Sydney" },
  { name: "Dubai", zone: "Asia/Dubai" },
  { name: "Singapore", zone: "Asia/Singapore" },
];

export default function ClockPage() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [selectedTimezone, setSelectedTimezone] = useState(dayjs.tz.guess());
  const [clockType, setClockType] = useState<"digital" | "analog">("digital");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (timezone: string) => {
    return currentTime.tz(timezone);
  };

  const formatTime = (time: dayjs.Dayjs) => {
    return {
      time: time.format("HH:mm:ss"),
      date: time.format("dddd, MMMM D, YYYY"),
      ampm: time.format("h:mm:ss A"),
    };
  };

  const AnalogClock = ({ time }: { time: dayjs.Dayjs }) => {
    const hours = time.hour() % 12;
    const minutes = time.minute();
    const seconds = time.second();

    const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
    const minuteAngle = (minutes * 6) - 90;
    const secondAngle = (seconds * 6) - 90;

    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Clock face */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) - 90;
            const x1 = 100 + 80 * Math.cos(angle * Math.PI / 180);
            const y1 = 100 + 80 * Math.sin(angle * Math.PI / 180);
            const x2 = 100 + 70 * Math.cos(angle * Math.PI / 180);
            const y2 = 100 + 70 * Math.sin(angle * Math.PI / 180);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              />
            );
          })}

          {/* Hour hand */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="50"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-primary"
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${hourAngle}deg)`,
            }}
            animate={{ transform: `rotate(${hourAngle}deg)` }}
            transition={{ duration: 0.5 }}
          />

          {/* Minute hand */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-secondary"
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${minuteAngle}deg)`,
            }}
            animate={{ transform: `rotate(${minuteAngle}deg)` }}
            transition={{ duration: 0.5 }}
          />

          {/* Second hand */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="25"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            className="text-red-500"
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${secondAngle}deg)`,
            }}
            animate={{ transform: `rotate(${secondAngle}deg)` }}
            transition={{ duration: 0.1 }}
          />

          {/* Center dot */}
          <circle
            cx="100"
            cy="100"
            r="4"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>
    );
  };

  const selectedTime = getTimeInTimezone(selectedTimezone);
  const formattedTime = formatTime(selectedTime);

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">World Clock</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keep track of time across different timezones with both digital and analog displays.
          </p>
        </motion.div>

        {/* Main Clock Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Time</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {timezones.find(tz => tz.zone === selectedTimezone)?.name}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select value={clockType} onValueChange={(value: "digital" | "analog") => setClockType(value)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="analog">Analog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {clockType === "digital" ? (
                <div className="text-center space-y-4">
                  <motion.div
                    key={formattedTime.time}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl lg:text-6xl font-mono font-bold text-primary"
                  >
                    {formattedTime.time}
                  </motion.div>
                  <div className="text-lg text-muted-foreground">
                    {formattedTime.date}
                  </div>
                  <div className="text-2xl font-medium">
                    {formattedTime.ampm}
                  </div>
                </div>
              ) : (
                <div className="py-8">
                  <AnalogClock time={selectedTime} />
                  <div className="text-center mt-4">
                    <div className="text-xl font-medium">{formattedTime.ampm}</div>
                    <div className="text-sm text-muted-foreground">{formattedTime.date}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timezone Selection</CardTitle>
              <CardDescription>Choose a timezone to display</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.zone} value={tz.zone}>
                        <div className="flex items-center justify-between w-full">
                          <span>{tz.name}</span>
                          <span className="text-muted-foreground ml-4">
                            {getTimeInTimezone(tz.zone).format("HH:mm")}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <h4 className="font-medium">Quick Access</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timezones.slice(0, 6).map((tz) => (
                      <Button
                        key={tz.zone}
                        variant={selectedTimezone === tz.zone ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimezone(tz.zone)}
                      >
                        {tz.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* World Clock Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              World Time
            </CardTitle>
            <CardDescription>Current time in major cities around the world</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timezones.map((tz) => {
                const time = getTimeInTimezone(tz.zone);
                const formatted = formatTime(time);
                
                return (
                  <motion.div
                    key={tz.zone}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      selectedTimezone === tz.zone 
                        ? "bg-primary/10 border-primary" 
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                    onClick={() => setSelectedTimezone(tz.zone)}
                  >
                    <div className="text-center">
                      <h3 className="font-medium mb-1">{tz.name}</h3>
                      <div className="text-2xl font-mono font-bold mb-1">
                        {formatted.time}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {time.format("MMM D, YYYY")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatted.ampm}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}