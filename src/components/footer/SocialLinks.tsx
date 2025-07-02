
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Twitter } from 'lucide-react';

interface SocialLinksProps {
  followText: string;
}

const SocialLinks = ({ followText }: SocialLinksProps) => {
  return (
    <div>
      <p className="text-white text-sm mb-4">
        {followText}
      </p>
      <div className="flex space-x-3">
        <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white/80 hover:bg-blue-deep/20 transition-all duration-200">
          <Facebook className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white/80 hover:bg-blue-deep/20 transition-all duration-200">
          <Linkedin className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white/80 hover:bg-blue-deep/20 transition-all duration-200">
          <Twitter className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SocialLinks;
