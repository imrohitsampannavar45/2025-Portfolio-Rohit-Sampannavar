"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experience } from "@/lib/data";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";

export default function Experience() {
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
            <Briefcase className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Professional Experience</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey building scalable applications and leading development teams.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
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
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Image
                              src={job.logo}
                              alt={job.company}
                              width={60}
                              height={60}
                              className="rounded-lg shadow-md"
                            />
                          </motion.div>
                          <div>
                            <CardTitle className="text-xl">{job.position}</CardTitle>
                            <CardDescription className="text-lg font-medium text-primary">
                              {job.company}
                            </CardDescription>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {job.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground">{job.description}</p>
                      
                      <div>
                        <h4 className="font-medium mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Key Projects</h4>
                        <div className="space-y-3">
                          {job.projects.map((project, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                              viewport={{ once: true }}
                              className="p-4 bg-muted/50 rounded-lg border"
                            >
                              <h5 className="font-medium mb-1">{project.name}</h5>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Interested in Working Together?</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new opportunities and exciting projects.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild>
                  <a href="/contact">Get In Touch</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/projects">
                    View My Projects
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}