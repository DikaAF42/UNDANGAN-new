import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft,
  Music,
  UserCheck,
  MessageCircle,
  Copy,
  Gift
} from 'lucide-react';

const BRIDE_NAME = "Nesa";
const GROOM_NAME = "Dika";
const HASHTAG = "#DikaNesaSakinah";
const WEDDING_DATE = new Date("2026-12-12T09:00:00").getTime();
const MUSIC_URL = "https://res.cloudinary.com/ixgqzlok/video/upload/v1785517422/ssstik.io_1785517026819_lgew9r.mp3";

const EVENT_DETAILS = {
  akad: {
    title: "Akad Nikah",
    date: "Sabtu, 12 Desember 2026",
    time: "08:00 - 10:00 WIB",
    location: "Kediaman Mempelai Wanita",
    address: "Desa Semingkir RT.03 RW.02, Kec. Randudongkal, Kab. Pemalang",
    mapLink: "https://maps.google.com/?q=Desa+Semingkir+Randudongkal+Pemalang"
  },
  resepsi: {
    title: "Resepsi Pernikahan",
    date: "Sabtu, 12 Desember 2026",
    time: "11:00 WIB - Selesai",
    location: "Rumah Mempelai Wanita",
    address: "Desa Semingkir RT.03 RW.02, Kec. Randudongkal, Kab. Pemalang",
    mapLink: "https://maps.google.com/?q=Desa+Semingkir+Randudongkal+Pemalang"
  }
};

const formatWishWithGeminiMock = async (rawWish) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const poeticalPrefixes = [
        "Ingkang sinungging ing serat rinonce: ",
        "Bait doa hangat kami panjatkan, ",
        "Mewangi kembang melati ing hari bahagia: ",
        "Semoga limpahan berkah senantiasa menaungi: "
      ];
      const randomPrefix = poeticalPrefixes[Math.floor(Math.random() * poeticalPrefixes.length)];
      const cleaned = rawWish.trim();
      const enhanced = `${randomPrefix}"${cleaned}" - Semoga Mahabbah dan kebahagiaan sejati senantiasa menyertai Dika & Nesa mengarungi bahtera rumah tangga yang sakinah, mawaddah, warahmah.`;
      resolve(enhanced);
    }, 1200);
  });
};

const GununganIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 120" className={className} fill="currentColor">
    <path d="M50 5 L85 70 L75 110 L25 110 L15 70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M50 12 L78 68 L70 102 L30 102 L22 68 Z" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 28 L50 52 M38 40 L62 40" stroke="currentColor" strokeWidth="1" />
    <path d="M50 60 C 40 75, 30 85, 30 105 M50 60 C 60 75, 70 85, 70 105" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 5 L50 115" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
  </svg>
);

const MusicPlayer = ({ isPlaying, setIsPlaying, audioRef }) => {
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Playback failed:", err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 ${
          isPlaying 
            ? 'bg-amber-800 text-amber-200 border-amber-400 shadow-amber-900/50' 
            : 'bg-stone-900 text-stone-400 border-stone-700'
        }`}
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse text-amber-300" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
};

const HeroSection = ({ onOpenInvitation, isOpen }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 bg-[#2B090A] text-amber-100 overflow-hidden">
      {/* Background Ornament Overlays */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Top Banner Floral Motif */}
      <div className="pt-8 z-10">
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-amber-300/80 tracking-[0.3em] uppercase text-xs font-serif mb-2"
        >
          Undangan Pernikahan
        </motion.p>
        <GununganIcon className="w-16 h-20 mx-auto text-amber-400 opacity-90 my-2" />
      </div>

      {/* Main Bride & Groom Display */}
      <div className="z-10 my-auto py-6">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-amber-200/90 text-sm md:text-base mb-3"
        >
          Walimatul 'Ursy
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-serif text-amber-300 tracking-wide my-4 font-bold"
        >
          {GROOM_NAME} <span className="text-3xl md:text-5xl font-light text-amber-400/80">&</span> {BRIDE_NAME}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4"
        />

        <p className="text-amber-100/80 font-serif text-sm md:text-base">
          Sabtu, 12 Desember 2026
        </p>
        <p className="text-amber-300/70 text-xs mt-1">
          Semingkir, Randudongkal, Pemalang
        </p>
      </div>

      {/* Bottom Cover Action / Status */}
      <div className="pb-12 z-10 w-full max-w-sm">
        {!isOpen ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenInvitation}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-serif font-semibold text-sm tracking-widest shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2 border border-amber-300/50"
          >
            <Music className="w-4 h-4" />
            BUKA UNDANGAN
          </motion.button>
        ) : (
          <div className="text-amber-300/60 text-xs tracking-widest font-serif flex items-center justify-center gap-1 animate-pulse">
            GULIR KE BAWAH UNTUK MELIHAT SLIDE <ChevronRight className="w-3 h-3 rotate-90" />
          </div>
        )}
      </div>
    </section>
  );
};

const SalamVerseSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1F0607] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <GununganIcon className="w-12 h-16 mx-auto text-amber-500/80" />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-serif text-amber-300"
        >
          Assalamu’alaikum Warahmatullahi Wabarakatuh
        </motion.h2>

        <p className="text-stone-300 font-light leading-relaxed text-sm md:text-base max-w-xl mx-auto">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami.
        </p>

        <div className="bg-[#2B090A]/80 border border-amber-800/40 p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl mx-auto relative">
          <p className="text-amber-200 font-serif italic text-sm md:text-base leading-loose mb-4">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <span className="text-xs text-amber-400/80 uppercase tracking-widest font-serif">
            — QS. Ar-Rum: 21 —
          </span>
        </div>
      </div>
    </section>
  );
};

const CoupleProfileSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#2B090A] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div>
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-serif">Mempelai Pernikahan</span>
          <h2 className="text-3xl md:text-4xl font-serif text-amber-300 mt-2">Dika & Nesa</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Mempelai Pria */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1F0607]/90 p-8 rounded-2xl border border-amber-800/40 shadow-xl"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-700 to-amber-400 p-1 mb-4 shadow-lg">
              <div className="w-full h-full bg-[#2B090A] rounded-full flex items-center justify-center">
                <span className="text-3xl font-serif text-amber-300">D</span>
              </div>
            </div>
            <h3 className="text-2xl font-serif text-amber-300 mb-1">DAI ANDIKA SHOLEH AFIF</h3>
            <p className="text-amber-200/80 text-xs font-serif mb-4">Mempelai Pria</p>
            <p className="text-stone-300 text-xs leading-relaxed">
              Putra terbaik dari Keluarga Bapak & Ibu <br />
              <span className="text-amber-400/80 italic">Desa Brenggolo, Kalitidu, Bojonegoro</span>
            </p>
          </motion.div>

          {/* Mempelai Wanita */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1F0607]/90 p-8 rounded-2xl border border-amber-800/40 shadow-xl"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-700 to-amber-400 p-1 mb-4 shadow-lg">
              <div className="w-full h-full bg-[#2B090A] rounded-full flex items-center justify-center">
                <span className="text-3xl font-serif text-amber-300">N</span>
              </div>
            </div>
            <h3 className="text-2xl font-serif text-amber-300 mb-1">NESA AYU NITILAS</h3>
            <p className="text-amber-200/80 text-xs font-serif mb-4">Mempelai Wanita</p>
            <p className="text-stone-300 text-xs leading-relaxed">
              Putri tercinta dari Keluarga Bapak & Ibu <br />
              <span className="text-amber-400/80 italic">Desa Semingkir, Randudongkal, Pemalang</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1F0607] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div>
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-serif">Menuju Hari Bahagia</span>
          <h2 className="text-3xl md:text-4xl font-serif text-amber-300 mt-2">Hitung Mundur Acara</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
          {timeBlocks.map((block, idx) => (
            <motion.div 
              key={block.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#2B090A] border border-amber-800/50 p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg"
            >
              <span className="text-3xl md:text-5xl font-serif text-amber-300 font-bold mb-1">
                {block.value}
              </span>
              <span className="text-xs text-amber-200/70 uppercase tracking-widest font-serif">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-stone-400 text-xs font-serif italic">
          Sabtu Legi, 12 Desember 2026 • Semingkir, Pemalang
        </p>
      </div>
    </section>
  );
};

const EventDetailsSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#2B090A] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-serif">Waktu & Lokasi</span>
          <h2 className="text-3xl md:text-4xl font-serif text-amber-300 mt-2">Rangkaian Acara</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(EVENT_DETAILS).map(([key, event], idx) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-[#1F0607]/90 p-8 rounded-2xl border border-amber-800/40 shadow-xl flex flex-col justify-between text-center"
            >
              <div>
                <GununganIcon className="w-10 h-12 mx-auto text-amber-500 mb-4" />
                <h3 className="text-2xl font-serif text-amber-300 mb-6">{event.title}</h3>
                
                <div className="space-y-4 text-stone-300 text-sm mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start justify-center gap-3 text-left">
                    <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-amber-200">{event.location}</span>
                      <span className="block text-xs text-stone-400 mt-1">{event.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href={event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-full bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 border border-amber-600/50 transition-colors text-xs tracking-widest font-serif flex items-center justify-center gap-2 mt-4"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                PETUKULAN MAPS
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GiftSection = () => {
  const [copied, setCopied] = useState(false);
  const accountNumber = "1234-5678-9101";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1F0607] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <Gift className="w-12 h-12 mx-auto text-amber-400" />
        <div>
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-serif">Ungkapan Tanda Kasih</span>
          <h2 className="text-3xl font-serif text-amber-300 mt-2">Kado Digital</h2>
          <p className="text-stone-300 text-xs md:text-sm mt-3 leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih, Anda dapat mengirimpannya melalui:
          </p>
        </div>

        <div className="bg-[#2B090A] border border-amber-800/50 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-serif">Bank BRI</p>
          <p className="text-2xl font-mono text-amber-200 tracking-wider">{accountNumber}</p>
          <p className="text-xs text-stone-400">a.n. Mempelai Pernikahan (Dika / Nesa)</p>
          
          <button
            onClick={handleCopy}
            className="py-2.5 px-5 rounded-full bg-amber-800/40 hover:bg-amber-700/50 border border-amber-500/40 text-amber-200 text-xs font-serif tracking-wider flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? "Berhasil Disalin!" : "Salin Nomor Rekening"}
          </button>
        </div>
      </div>
    </section>
  );
};

const RSVPSection = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#2B090A] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-xl mx-auto w-full space-y-8">
        <div className="text-center">
          <UserCheck className="w-10 h-10 mx-auto text-amber-400 mb-2" />
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-serif">Konfirmasi Kehadiran</span>
          <h2 className="text-3xl font-serif text-amber-300 mt-2">Formulir RSVP</h2>
        </div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1F0607] border border-emerald-600/50 p-8 rounded-2xl text-center space-y-3"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-serif text-emerald-300">Matur Nuwun!</h3>
            <p className="text-stone-300 text-xs">Konfirmasi konfirmasi kehadiran Anda telah tersimpan dengan baik.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#1F0607]/90 p-6 md:p-8 rounded-2xl border border-amber-800/40 space-y-5 shadow-xl">
            <div>
              <label className="block text-xs font-serif text-amber-200 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                required
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-lg bg-[#2B090A] border border-amber-800/60 text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm font-light"
              />
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-2">Status Kehadiran</label>
              <select 
                defaultValue="" 
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2B090A] border border-amber-800/60 text-amber-100 focus:outline-none focus:border-amber-400 text-sm font-light"
              >
                <option value="" disabled>Pilih Status Kehadiran</option>
                <option value="hadir">Inggih, Saya Akan Hadir</option>
                <option value="tidak">Nuwun Sewu, Belum Bisa Hadir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-2">Jumlah Tamu</label>
              <select 
                defaultValue="1" 
                className="w-full px-4 py-3 rounded-lg bg-[#2B090A] border border-amber-800/60 text-amber-100 focus:outline-none focus:border-amber-400 text-sm font-light"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-serif font-semibold rounded-lg text-sm tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {status === 'submitting' ? 'Mengirim...' : 'Kirim Konfirmasi'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const WishesSection = () => {
  const [wishes, setWishes] = useState([
    { id: 1, name: "Budi & Keluarga", text: "Selamat menempuh hidup baru Dika dan Nesa. Semoga menjadi keluarga sakinah mawaddah warahmah.", isAiFormatted: false },
    { id: 2, name: "Siska Pertiwi", text: "Bait doa hangat kami panjatkan, \"Sugeng nempuh kawruh engal kagem Dika & Nesa\" - Semoga Mahabbah dan kebahagiaan sejati senantiasa menyertai mengarungi bahtera rumah tangga.", isAiFormatted: true }
  ]);

  const [newName, setNewName] = useState('');
  const [newWish, setNewWish] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedWish, setEnhancedWish] = useState('');
  const [showEnhanced, setShowEnhanced] = useState(false);

  const handleEnhance = async () => {
    if (!newWish.trim()) return;
    setIsEnhancing(true);
    try {
      const formatted = await formatWishWithGeminiMock(newWish);
      setEnhancedWish(formatted);
      setShowEnhanced(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || (!newWish.trim() && !enhancedWish.trim())) return;

    const finalText = showEnhanced ? enhancedWish : newWish;

    setWishes(prev => [
      { id: Date.now(), name: newName, text: finalText, isAiFormatted: showEnhanced },
      ...prev
    ]);

    setNewName('');
    setNewWish('');
    setEnhancedWish('');
    setShowEnhanced(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1F0607] text-amber-100 px-6 py-20 border-t border-amber-900/30">
      <div className="max-w-4xl mx-auto w-full space-y-10">
        <div className="text-center">
          <MessageCircle className="w-10 h-10 mx-auto text-amber-400 mb-2" />
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-serif">Doa & Harapan</span>
          <h2 className="text-3xl font-serif text-amber-300 mt-2">Kartu Ucapan </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input & AI Enhancer Form */}
          <div className="bg-[#2B090A] p-6 rounded-2xl border border-amber-800/50 space-y-4 shadow-xl">
            <h3 className="text-lg font-serif text-amber-300">Kirim Doa Restu</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-2.5 rounded-lg bg-[#1F0607] border border-amber-800/60 text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs font-light"
              />

              <textarea 
                required={!showEnhanced}
                rows={3}
                value={newWish}
                onChange={(e) => {
                  setNewWish(e.target.value);
                  if (showEnhanced) setShowEnhanced(false);
                }}
                placeholder="Tuliskan ucapan / doa sederhana Anda..."
                className="w-full px-4 py-2.5 rounded-lg bg-[#1F0607] border border-amber-800/60 text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs font-light resize-none"
              />

              {showEnhanced && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-amber-900/30 border border-amber-500/40 rounded-lg text-xs space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-amber-300 font-serif">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Versi Puitis:</span>
                  </div>
                  <p className="text-amber-100 italic font-serif leading-relaxed">"{enhancedWish}"</p>
                  <button 
                    type="button" 
                    onClick={() => setShowEnhanced(false)}
                    className="text-[10px] text-amber-400 underline"
                  >
                    Batal perindah
                  </button>
                </motion.div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleEnhance}
                  disabled={isEnhancing || !newWish.trim() || showEnhanced}
                  className="flex-1 py-2.5 px-3 bg-amber-950 hover:bg-amber-900 border border-amber-600/50 text-amber-200 rounded-lg text-xs font-serif flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {isEnhancing ? "Merapikan..." : "Perindah"}
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold font-serif rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Doa
                </button>
              </div>
            </form>
          </div>

          {/* List of Wishes */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {wishes.map((w) => (
              <div 
                key={w.id} 
                className={`p-4 rounded-xl border ${w.isAiFormatted ? 'bg-[#2B090A]/90 border-amber-500/50' : 'bg-[#1F0607]/90 border-amber-900/40'} shadow-md`}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="font-serif text-sm text-amber-300">{w.name}</h4>
                  {w.isAiFormatted && (
                    <span className="text-[10px] bg-amber-900/60 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> 
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed italic">
                  "{w.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play error on user click:", err);
      });
    }
  };

  return (
    <div className="font-sans bg-[#1F0607] text-amber-100 min-h-screen selection:bg-amber-800 selection:text-amber-100">
      {/* Global CSS for font & custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1F0607; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #52181a; border-radius: 10px; }
        html { scroll-behavior: smooth; }
      `}} />

      {/* Hidden HTML Audio Element */}
      <audio ref={audioRef} loop src={MUSIC_URL} preload="auto" />

      {/* 8 Sections / Slides */}
      <HeroSection onOpenInvitation={handleOpenInvitation} isOpen={isOpen} />
      
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <SalamVerseSection />
          <CoupleProfileSection />
          <CountdownSection />
          <EventDetailsSection />
          <GiftSection />
          <RSVPSection />
          <WishesSection />

          {/* Footer */}
          <footer className="py-12 bg-[#120304] text-center text-xs text-amber-400/60 font-serif border-t border-amber-900/30">
            <GununganIcon className="w-8 h-10 mx-auto text-amber-600/60 mb-3" />
            <p className="mb-1">{GROOM_NAME} & {BRIDE_NAME} Wedding</p>
            <p className="text-stone-500 font-sans text-[10px]">{HASHTAG} • Desa Semingkir, Randudongkal, Pemalang</p>
          </footer>
        </motion.div>
      )}

      {/* Floating Audio Controls */}
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
    </div>
  );
}
