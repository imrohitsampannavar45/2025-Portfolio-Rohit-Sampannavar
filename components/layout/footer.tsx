import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{personalInfo.name}</h3>
            <p className="text-sm text-muted-foreground">
              {personalInfo.bio.slice(0, 100)}...
            </p>
            <div className="flex space-x-4">
              <Link href={personalInfo.social.github} className="text-muted-foreground hover:text-primary">
                <Github size={20} />
              </Link>
              <Link href={personalInfo.social.linkedin} className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </Link>
              <Link href={personalInfo.social.twitter} className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-primary">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-muted-foreground hover:text-primary">Home</Link>
              <Link href="/education" className="block text-muted-foreground hover:text-primary">Education</Link>
              <Link href="/experience" className="block text-muted-foreground hover:text-primary">Experience</Link>
              <Link href="/projects" className="block text-muted-foreground hover:text-primary">Projects</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Tools</h4>
            <div className="space-y-2 text-sm">
              <Link href="/calendar" className="block text-muted-foreground hover:text-primary">Calendar</Link>
              <Link href="/diary" className="block text-muted-foreground hover:text-primary">Diary</Link>
              <Link href="/clock" className="block text-muted-foreground hover:text-primary">Clock</Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}