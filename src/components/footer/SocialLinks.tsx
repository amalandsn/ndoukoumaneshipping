
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Twitter } from 'lucide-react';

interface SocialLinksProps {
  followText: string;
}

const SocialLinks = ({ followText }: SocialLinksProps) => {
  return (
    <div>
      <p className="text-blue-200 text-sm mb-4">
        {followText}
      </p>
      <div className="flex space-x-3">
        <Button variant="ghost" size="sm" className="p-2 text-blue-200 hover:text-white hover:bg-blue-800">
          <Facebook className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 text-blue-200 hover:text-white hover:bg-blue-800">
          <Linkedin className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 text-blue-200 hover:text-white hover:bg-blue-800">
          <Twitter className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SocialLinks;
