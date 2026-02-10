import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-offwhite pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <Image
                src="/logo.svg"
                alt="DekorSwap Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none">DekorSwap</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mt-1">
                Endless Style
              </span>
            </div>
          </Link>
          <p className="text-brand-offwhite/60 text-sm leading-relaxed mb-6">
            Endless style for your home. Curated décor delivered monthly, keeping your space fresh and clutter-free.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-accent transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              <Twitter size={20} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-6 uppercase tracking-wider text-xs">Service</h3>
          <ul className="space-y-4 text-sm text-brand-offwhite/60">
            <li><Link href="/how-it-works" className="hover:text-brand-offwhite transition-colors">How It Works</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-offwhite transition-colors">Pricing Plans</Link></li>
            <li><Link href="#" className="hover:text-brand-offwhite transition-colors">Sample Kits</Link></li>
            <li><Link href="#" className="hover:text-brand-offwhite transition-colors">Gift Cards</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 uppercase tracking-wider text-xs">Company</h3>
          <ul className="space-y-4 text-sm text-brand-offwhite/60">
            <li><Link href="/about" className="hover:text-brand-offwhite transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-brand-offwhite transition-colors">Sustainability</Link></li>
            <li><Link href="#" className="hover:text-brand-offwhite transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-brand-offwhite transition-colors">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 uppercase tracking-wider text-xs">Contact</h3>
          <ul className="space-y-4 text-sm text-brand-offwhite/60">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-accent" />
              <span>Raipur, C.G, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-accent" />
              <a href="mailto:dekorswap@gmail.com" className="hover:text-brand-offwhite transition-colors">dekorswap@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-accent" />
              <span>+91 9996234649</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-offwhite/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-offwhite/40">
        <p>© 2026 DekorSwap. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-brand-offwhite transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-brand-offwhite transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-brand-offwhite transition-colors">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
