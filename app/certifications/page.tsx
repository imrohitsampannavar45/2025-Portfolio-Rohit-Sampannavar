"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { certifications } from "@/lib/data";
import { Award, Calendar, Download, ExternalLink } from "lucide-react";

export default function Certifications() {
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
            <Award className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Certifications</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise in various technologies and platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="overflow-hidden"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300"
                    />
                  </motion.div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-green-50">
                      <Award className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {cert.title}
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {cert.issuer}
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Issued {cert.date}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    Credential ID: {cert.credentialId}
                  </div>

                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={cert.pdfUrl}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Flip effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ transform: "translateZ(0)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Active Certifications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2024</div>
                  <div className="text-sm text-muted-foreground">Latest Certification</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-secondary/5 to-accent/5 border-secondary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Continuous Learning</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I believe in continuous learning and staying up-to-date with the latest technologies. 
                Currently working towards additional certifications in cloud architecture and machine learning.
              </p>
              <Button asChild>
                <Link href="/contact">
                  Discuss My Expertise
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}