const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  return (
    <header className="border-b border-mystic-mint bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a
          className="inline-flex items-center gap-2 font-heading text-lg font-bold text-nocturnal-expedition sm:text-xl"
          href="#hero"
        >
          <span
            aria-hidden="true"
            className="h-5 w-5 bg-current text-oceanic-noir [mask-image:url('/assets/svgs/cube-16-solid.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/assets/svgs/cube-16-solid.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          />
          DataForge AI
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              className="text-sm font-medium text-oceanic-noir/70 transition-colors hover:text-nocturnal-expedition"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-oceanic-noir px-4 py-2 text-sm font-bold text-mystic-mint shadow-sm shadow-oceanic-noir/10 transition-colors hover:bg-nocturnal-expedition focus:outline-none focus:ring-2 focus:ring-oceanic-noir focus:ring-offset-2 focus:ring-offset-white"
          href="#pricing"
        >
          Get Started
          <span
            aria-hidden="true"
            className="h-5 w-5 bg-current text-mystic-mint [mask-image:url('/assets/svgs/arrow-trending-up.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/assets/svgs/arrow-trending-up.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          />
        </a>
      </nav>
    </header>
  );
}
