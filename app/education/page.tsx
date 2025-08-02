"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { education } from "@/lib/data";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export default function Education() {
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
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Education</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic journey in computer science and the knowledge that shaped my career.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />
                
                <div className="md:ml-16">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Image
                              src={item.logo}
                              alt={item.school}
                              width={60}
                              height={60}
                              className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{item.degree}</CardTitle>
                            <CardDescription className="text-lg font-medium text-primary">
                              {item.school}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          GPA: {item.gpa}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">{item.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <div className="flex items-center space-x-4 mb-4">
                              <Image
                                src={item.logo}
                                alt={item.school}
                                width={60}
                                height={60}
                                className="rounded-lg"
                              />
                              <div>
                                <DialogTitle>{item.degree}</DialogTitle>
                                <DialogDescription className="text-lg">
                                  {item.school} • {item.period}
                                </DialogDescription>
                              </div>
                            </div>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Academic Performance</h4>
                              <p className="text-sm text-muted-foreground">
                                Maintained a {item.gpa} GPA throughout the program, demonstrating consistent academic excellence.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Program Focus</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Notable Achievements</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                {item.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Award className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}