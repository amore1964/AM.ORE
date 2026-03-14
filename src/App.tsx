import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Send, Menu } from 'lucide-react';

// --- TYPES ---
interface TextItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

// --- DATA ---
const TEXTS: TextItem[] = [
  {
    id: 1,
    title: "Cicatrices d'encre",
    date: "2024",
    excerpt: "Le bitume ne ment pas, il boit nos larmes sans broncher. J'écris pour ne pas oublier que sous la peau, ça brûle encore...",
    content: `Le bitume ne ment pas, il boit nos larmes sans broncher.
J'écris pour ne pas oublier que sous la peau, ça brûle encore.
Chaque mot est une suture, un fil de soie sur une plaie ouverte.
On nous a dit de nous taire, alors on a hurlé en silence sur les murs de la ville.

L'encre est mon sang, le papier ma terre d'asile.
Je ne cherche pas la beauté, je cherche la vérité brute.
Celle qui gratte, celle qui dérange, celle qui libère.
Parce que la résilience n'est pas un mot doux, c'est un combat de chaque instant.`
  },
  {
    id: 2,
    title: "Révolte Intime",
    date: "2023",
    excerpt: "Ils veulent des rimes qui caressent, je leur donne des vers qui cognent. Ma poésie est un poing levé dans le noir...",
    content: `Ils veulent des rimes qui caressent, je leur donne des vers qui cognent.
Ma poésie est un poing levé dans le noir, une étincelle dans le brouillard.
On ne guérit pas en ignorant la blessure, on guérit en la regardant en face.
En acceptant que la chute fait partie du vol.

Je suis le produit de mes échecs et de mes colères.
Mais de cette boue, j'en fais de l'or noir.
Une poésie de survie, une esthétique de la rupture.
Rien n'est jamais fini tant que le dernier mot n'est pas posé.`
  },
  {
    id: 3,
    title: "L'Amour en Sursis",
    date: "2024",
    excerpt: "On s'aime comme on survit : avec urgence et peur du lendemain. Nos cœurs sont des zones de guerre où fleurissent des roses de fer...",
    content: `On s'aime comme on survit : avec urgence et peur du lendemain.
Nos cœurs sont des zones de guerre où fleurissent des roses de fer.
L'amour n'est pas un long fleuve tranquille, c'est un torrent qui emporte tout.
C'est la seule chose qui nous rappelle qu'on est encore vivants.

Même si ça fait mal, même si ça finit mal.
On recommence, on s'obstine, on s'accroche.
Parce que sans cette tension, la vie n'est qu'un long silence.
Et moi, j'ai trop de choses à dire pour me taire.`
  }
];

export default function App() {
  const [selectedText, setSelectedText] = useState<TextItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const navLinks = [
    { name: 'Manifeste', href: '#accueil' },
    { name: 'Le Projet', href: '#projet' },
    { name: 'Textes', href: '#textes' },
    { name: 'À Propos', href: '#propos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen bg-ink-black overflow-x-hidden">
      <div className="noise-bg fixed inset-0 z-50"></div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[60] mix-blend-difference px-6 py-8 flex justify-between items-center">
        <a href="#accueil" className="text-2xl font-display tracking-tighter text-paper-white uppercase">
          AM.ORE
        </a>
        
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-blood-red transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-paper-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[55] bg-ink-black flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display uppercase tracking-tighter hover:text-blood-red transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION: ACCUEIL --- */}
      <section id="accueil" className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[20vw] md:text-[25vw] leading-[0.8] mb-8 select-none">
            AM<span className="text-blood-red">.</span>ORE
          </h1>
          <div className="max-w-3xl">
            <p className="text-2xl md:text-4xl font-serif italic leading-tight mb-12">
              "L'écriture comme un cri de survie, une poésie de la rupture où la blessure devient la source."
            </p>
            <div className="h-px w-24 bg-blood-red mb-12"></div>
            <p className="text-xs uppercase tracking-[0.5em] opacity-50">
              Artiste-Auteur / Poésie Brute / Résilience Urbaine
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION: LE PROJET --- */}
      <section id="projet" className="py-32 px-6 md:px-24 bg-street-grey/30">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <h2 className="text-6xl md:text-8xl mb-8">Le Projet</h2>
            <div className="text-blood-red font-bold text-sm uppercase tracking-widest mb-4">La démarche</div>
          </div>
          <div className="space-y-12 text-lg md:text-xl leading-relaxed opacity-80">
            <p>
              Mon travail d'écriture n'est pas une quête esthétique, c'est une nécessité vitale. 
              C'est mettre des mots sur ce qui se tait, sur ce qui gratte, sur ce qui empêche de dormir.
            </p>
            <p>
              Je puise mon inspiration dans le bitume, dans les tensions de la ville, dans les regards 
              fuyants et les mains qui tremblent. Ma poésie est brute, sans filtre, comme une affiche 
              déchirée sur un mur de briques.
            </p>
            <p className="border-l-2 border-blood-red pl-8 italic font-serif">
              "Il n'y a pas de lumière sans ombre, pas de résilience sans chute. J'écris depuis la faille."
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION: TEXTES --- */}
      <section id="textes" className="py-32 px-6 md:px-24">
        <h2 className="text-6xl md:text-8xl mb-24 text-right">Textes</h2>
        
        <div className="grid md:grid-cols-3 gap-px bg-paper-white/10 border border-paper-white/10">
          {TEXTS.map((text) => (
            <motion.div 
              key={text.id}
              whileHover={{ backgroundColor: 'rgba(139, 0, 0, 0.05)' }}
              className="p-12 flex flex-col h-full group cursor-pointer"
              onClick={() => setSelectedText(text)}
            >
              <div className="text-[10px] uppercase tracking-widest opacity-40 mb-8">{text.date}</div>
              <h3 className="text-3xl mb-6 group-hover:text-blood-red transition-colors">{text.title}</h3>
              <p className="text-sm opacity-60 mb-12 flex-grow leading-relaxed">
                {text.excerpt}
              </p>
              <div className="flex items-center space-x-4 text-xs uppercase tracking-widest font-bold">
                <span>Lire l'extrait</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION: À PROPOS --- */}
      <section id="propos" className="py-32 px-6 md:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="aspect-[3/4] bg-street-grey relative overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/artist/800/1200?grayscale" 
                  alt="AM.ORE" 
                  className="object-cover w-full h-full opacity-50 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blood-red/10"></div>
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-6xl md:text-8xl mb-12">À Propos</h2>
              <div className="space-y-8 opacity-80 text-lg">
                <p>
                  AM.ORE est un nom d'emprunt, une identité forgée dans l'urgence. 
                  Auteur autodidacte, j'utilise les mots comme des outils de transformation.
                </p>
                <p>
                  Mon parcours est jalonné de silences et de bruits sourds. 
                  L'écriture est arrivée comme une bouée de sauvetage, puis est devenue 
                  une arme de construction massive.
                </p>
                <p>
                  Je ne cherche pas à plaire, je cherche à toucher le point de rupture. 
                  Là où tout s'arrête et où tout commence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: CONTACT --- */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-street-grey/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl mb-12">Contact</h2>
          <p className="text-xl opacity-60 mb-16">Pour les collaborations, les lectures ou les mots partagés.</p>
          
          <form onSubmit={handleContactSubmit} className="text-left space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="border-b border-paper-white/20 pb-4 focus-within:border-blood-red transition-colors">
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Nom</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-transparent outline-none text-xl"
                  placeholder="Votre nom"
                />
              </div>
              <div className="border-b border-paper-white/20 pb-4 focus-within:border-blood-red transition-colors">
                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-transparent outline-none text-xl"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div className="border-b border-paper-white/20 pb-4 focus-within:border-blood-red transition-colors">
              <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Message</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-transparent outline-none text-xl resize-none"
                placeholder="Écrivez ici..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={formStatus !== 'idle'}
              className="group flex items-center space-x-6 text-2xl font-display uppercase tracking-tighter hover:text-blood-red transition-colors"
            >
              <span>{formStatus === 'idle' ? 'Envoyer' : formStatus === 'sending' ? 'Envoi...' : 'Envoyé'}</span>
              <Send size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 md:px-24 border-t border-paper-white/10 flex flex-col md:flex-row justify-between items-center opacity-40 text-[10px] uppercase tracking-[0.3em]">
        <p>© {new Date().getFullYear()} AM.ORE — TOUS DROITS RÉSERVÉS</p>
        <p>ÉCRITURE BRUTE / SURVIE POÉTIQUE</p>
      </footer>

      {/* --- MODAL: TEXTE COMPLET --- */}
      <AnimatePresence>
        {selectedText && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink-black/95 backdrop-blur-md"
            onClick={() => setSelectedText(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-street-grey w-full max-w-3xl max-h-[85vh] overflow-y-auto p-12 md:p-20 relative border border-paper-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedText(null)}
                className="absolute top-8 right-8 text-paper-white/40 hover:text-blood-red transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="text-[10px] uppercase tracking-widest opacity-40 mb-8">{selectedText.date}</div>
              <h2 className="text-4xl md:text-6xl mb-12">{selectedText.title}</h2>
              
              <div className="whitespace-pre-line text-lg md:text-xl leading-relaxed font-serif italic text-paper-white/90 border-l-2 border-blood-red pl-8">
                {selectedText.content}
              </div>

              <div className="mt-20 pt-12 border-t border-paper-white/10 flex justify-center">
                <button 
                  onClick={() => setSelectedText(null)}
                  className="text-[10px] uppercase tracking-[0.5em] font-bold text-paper-white/40 hover:text-blood-red transition-colors"
                >
                  Fermer la lecture
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
