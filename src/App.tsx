import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Send, ChevronRight, BookOpen, User, Info, Mail, Heart } from 'lucide-react';

// --- TYPES ---
interface TextItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: 'Poésie' | 'Rap';
}

// --- DATA (Exemples de textes) ---
const TEXTS: TextItem[] = [
  {
    id: 1,
    title: "L'écho du silence",
    category: 'Poésie',
    excerpt: "Dans le creux de la nuit, quand les mots se dérobent, je cherche la lumière sous les décombres de mes songes...",
    content: `Dans le creux de la nuit, quand les mots se dérobent,
Je cherche la lumière sous les décombres de mes songes.
Le silence n'est pas vide, il est une robe
Que l'on porte quand le cœur en a fini des mensonges.

Chaque battement est une rime qui s'ignore,
Un rythme sourd qui bat la mesure de l'absence.
Mais dans cette pénombre, je sens encore
La force fragile d'une nouvelle naissance.

Les traumatismes sont des encres indélébiles,
Mais la plume est un scalpel qui libère le sang.
Écrire pour ne plus être ce jouet immobile,
Écrire pour redevenir un être vivant.`
  },
  {
    id: 2,
    title: "Bitume et Résilience",
    category: 'Rap',
    excerpt: "Micro en main, je déballe le sac, trop de poids sur le cœur, trop de coups dans le bac. La rue m'a appris que rien n'est gratuit...",
    content: `Micro en main, je déballe le sac,
Trop de poids sur le cœur, trop de coups dans le bac.
La rue m'a appris que rien n'est gratuit,
Que la douleur se soigne quand la rime s'enfuit.

J'ai vu des frères tomber, des sœurs s'effacer,
Des destins brisés qu'on ne peut plus ramasser.
Mais le rap est mon souffle, ma thérapie brute,
C'est le cri de l'âme qui refuse la chute.

On nous dit de nous taire, de rester dans le rang,
Mais ma voix est un torrent, un vent dérangeant.
Je transforme la haine en une force de vie,
Car c'est dans le texte que je trouve mon abri.`
  },
  {
    id: 3,
    title: "Le chemin vers soi",
    category: 'Poésie',
    excerpt: "Il a fallu des années pour désapprendre la peur, pour laisser la tendresse fleurir sur les cicatrices...",
    content: `Il a fallu des années pour désapprendre la peur,
Pour laisser la tendresse fleurir sur les cicatrices.
Le chemin est long, semé de mille douleurs,
Mais chaque pas nous éloigne des anciens sacrifices.

Regarder le miroir sans baisser les yeux,
Accepter l'ombre pour mieux chérir la clarté.
Nous sommes des êtres brisés mais merveilleux,
Façonnés par l'orage et la volonté.

Les mots sont des ponts jetés sur l'abîme,
Des mains tendues vers celui que l'on fut.
Chaque vers est une victoire, chaque rime
Est un territoire que l'on a reconquis.`
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedText, setSelectedText] = useState<TextItem | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const navLinks = [
    { name: 'Accueil', href: '#accueil', icon: <BookOpen size={18} /> },
    { name: 'Le Projet', href: '#projet', icon: <Info size={18} /> },
    { name: 'Textes', href: '#textes', icon: <Heart size={18} /> },
    { name: 'À Propos', href: '#propos', icon: <User size={18} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="min-h-screen selection:bg-warm-accent/20">
      {/* --- NAVIGATION --- */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-warm-bg/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#accueil" className="text-2xl font-serif font-bold tracking-tight text-warm-text">
            Wordstherapy <span className="text-warm-accent">/</span> AM.ORE
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium hover:text-warm-accent transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-warm-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-warm-bg shadow-xl py-8 px-6 md:hidden flex flex-col space-y-6 border-t border-black/5"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium flex items-center space-x-4"
                >
                  <span className="text-warm-accent">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- SECTION: ACCUEIL (HERO) --- */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-warm-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warm-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight"
          >
            Le pouvoir des mots <br />
            <span className="italic text-warm-accent">pour guérir</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-warm-text/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Un espace de poésie et de rap thérapeutique pour mettre des mots sur les douleurs, 
            les traumatismes et tracer le chemin de la résilience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="#textes" 
              className="inline-flex items-center space-x-3 bg-warm-text text-warm-bg px-8 py-4 rounded-full hover:bg-warm-accent transition-all group"
            >
              <span className="font-medium uppercase tracking-widest text-sm">Découvrir les textes</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION: LE PROJET --- */}
      <section id="projet" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://picsum.photos/seed/writing/800/800" 
                alt="Écriture thérapeutique" 
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-warm-accent/10 mix-blend-multiply"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Le Concept</h2>
              <div className="space-y-6 text-lg text-warm-text/80 leading-relaxed">
                <p>
                  Wordstherapy est né d'une conviction profonde : l'écriture est un remède. 
                  À travers la création de poèmes et de textes rap personnalisés, je propose 
                  un accompagnement par les mots pour explorer ses émotions.
                </p>
                <p>
                  Il ne s'agit pas de "soigner" au sens médical, mais d'offrir un espace 
                  d'expression brute où le traumatisme peut être nommé, déconstruit et 
                  transformé en un récit de force.
                </p>
                <p>
                  Chaque texte est une étape sur le chemin vers soi, une main tendue pour 
                  retrouver sa propre voix au milieu du tumulte intérieur.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION: TEXTES --- */}
      <section id="textes" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Fragments de Résilience</h2>
            <p className="text-warm-text/60 uppercase tracking-widest text-sm">Poésie & Rap Thérapeutique</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEXTS.map((text, index) => (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-xl transition-all flex flex-col h-full"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-warm-accent mb-4 block">
                  {text.category}
                </span>
                <h3 className="text-2xl font-serif mb-4">{text.title}</h3>
                <p className="text-warm-text/70 mb-8 flex-grow italic">
                  "{text.excerpt}"
                </p>
                <button 
                  onClick={() => setSelectedText(text)}
                  className="inline-flex items-center space-x-2 text-warm-text font-bold hover:text-warm-accent transition-colors group"
                >
                  <span className="uppercase tracking-widest text-xs">Lire le texte</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: À PROPOS --- */}
      <section id="propos" className="py-24 bg-warm-accent/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-12 md:p-16 rounded-3xl shadow-sm border border-black/5">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center">À Propos</h2>
            <div className="space-y-8 text-lg text-warm-text/80 leading-relaxed">
              <p>
                Mon parcours est celui d'une reconstruction. L'écriture, le rap et la poésie 
                ont été mes piliers dans les moments de doute et de tempête. C'est cette 
                résilience personnelle que je souhaite partager aujourd'hui.
              </p>
              <p>
                J'ai créé Wordstherapy pour transformer les silences pesants en paroles 
                libératrices. Mon approche utilise les codes du rap pour sa force percutante 
                et ceux de la poésie pour sa douceur contemplative.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-warm-accent/20 flex items-center justify-center text-warm-accent">
                  <Heart size={24} />
                </div>
                <p className="font-serif italic text-xl">
                  "Les mots ne changent pas le passé, mais ils éclairent l'avenir."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: CONTACT --- */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Contact</h2>
              <p className="text-lg text-warm-text/70 mb-8 leading-relaxed">
                Vous souhaitez un texte personnalisé, collaborer sur un projet ou simplement 
                partager votre ressenti ? N'hésitez pas à m'écrire.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-warm-text/60">
                  <Mail size={20} />
                  <span>contact@wordstherapy.fr</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2">Nom</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-warm-accent transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-warm-accent transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-warm-accent transition-colors resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={formStatus !== 'idle'}
                className={`w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
                  formStatus === 'sent' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-warm-text text-warm-bg hover:bg-warm-accent'
                }`}
              >
                {formStatus === 'idle' && (
                  <>
                    <span>Envoyer le message</span>
                    <Send size={18} />
                  </>
                )}
                {formStatus === 'sending' && <span>Envoi en cours...</span>}
                {formStatus === 'sent' && <span>Message envoyé !</span>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-sm text-warm-text/40 uppercase tracking-widest">
          © {new Date().getFullYear()} Wordstherapy / AM.ORE — L'art de la résilience
        </p>
      </footer>

      {/* --- MODAL: TEXTE COMPLET --- */}
      <AnimatePresence>
        {selectedText && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-warm-text/40 backdrop-blur-sm"
            onClick={() => setSelectedText(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-warm-bg w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-12 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedText(null)}
                className="absolute top-6 right-6 text-warm-text/40 hover:text-warm-text transition-colors"
              >
                <X size={24} />
              </button>
              
              <span className="text-xs font-bold uppercase tracking-widest text-warm-accent mb-4 block">
                {selectedText.category}
              </span>
              <h2 className="text-4xl font-serif mb-8">{selectedText.title}</h2>
              
              <div className="whitespace-pre-line text-lg md:text-xl leading-relaxed font-serif italic text-warm-text/90">
                {selectedText.content}
              </div>

              <div className="mt-12 pt-8 border-t border-black/5 flex justify-center">
                <button 
                  onClick={() => setSelectedText(null)}
                  className="text-sm uppercase tracking-widest font-bold text-warm-text/40 hover:text-warm-text transition-colors"
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
