import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Shield, Target, TrendingUp, Lock, Star, ChevronRight, Zap } from "lucide-react";

// ── Animated counter hook ─────────────────────────────────────────────────
const useCounter = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);
    useEffect(() => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, start]);
    return count;
};

// ── Stat counter card ─────────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, delay }) => {
    const count = useCounter(value, 2000);
    return (
        <div
            className="flex flex-col items-center gap-1"
            style={{ animationDelay: delay, animation: "fadeUp 0.8s ease forwards", opacity: 0 }}
        >
            <p className="text-3xl font-black text-white tabular-nums">
                {count.toLocaleString()}{suffix}
            </p>
            <p className="text-sm text-slate-400 tracking-wide uppercase">{label}</p>
        </div>
    );
};

// ── Feature card ──────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, color, delay }) => {
    const colorMap = {
        green:  { bg: "bg-green-500/10",  text: "text-green-400",  border: "border-green-500/20",  glow: "shadow-green-500/10"  },
        blue:   { bg: "bg-blue-500/10",   text: "text-blue-400",   border: "border-blue-500/20",   glow: "shadow-blue-500/10"   },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "shadow-purple-500/10" },
        amber:  { bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/20",  glow: "shadow-amber-500/10"  },
    };
    const c = colorMap[color];
    return (
        <div
            className={`group rounded-2xl border ${c.border} ${c.bg} p-6 shadow-xl ${c.glow} hover:scale-[1.03] transition-transform duration-300 cursor-default`}
            style={{ animationDelay: delay, animation: "fadeUp 0.8s ease forwards", opacity: 0 }}
        >
            <div className={`mb-4 w-fit rounded-xl p-3 ${c.bg} ${c.text}`}>
                {icon}
            </div>
            <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
        </div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────
const HomePage = () => {
    const navigate = useNavigate();
    const [walletConnected, setWalletConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const handleConnect = () => {
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setWalletConnected(true);
            setTimeout(() => navigate("/dashboard"), 800);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">

            {/* ── Keyframe styles injected ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                @keyframes pulse-ring {
                    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(139,92,246,0.5); }
                    70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(139,92,246,0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(139,92,246,0);   }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px);   }
                    50%       { transform: translateY(-10px); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg);   }
                    to   { transform: rotate(360deg); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .font-display { font-family: 'Syne', sans-serif; }
                .font-body    { font-family: 'DM Sans', sans-serif; }

                .shimmer-text {
                    background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #a78bfa);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 4s linear infinite;
                }
                .glow-btn {
                    box-shadow: 0 0 24px rgba(139,92,246,0.45), 0 2px 8px rgba(0,0,0,0.4);
                    transition: box-shadow 0.3s, transform 0.2s;
                }
                .glow-btn:hover {
                    box-shadow: 0 0 40px rgba(139,92,246,0.7), 0 4px 16px rgba(0,0,0,0.5);
                    transform: translateY(-2px);
                }
                .mesh-bg {
                    background:
                        radial-gradient(ellipse 60% 40% at 20% 20%, rgba(139,92,246,0.12) 0%, transparent 70%),
                        radial-gradient(ellipse 50% 40% at 80% 70%, rgba(37,99,235,0.10) 0%, transparent 70%),
                        radial-gradient(ellipse 40% 30% at 60% 10%, rgba(52,211,153,0.07) 0%, transparent 70%),
                        #020617;
                }
                .grid-overlay {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 48px 48px;
                }
                .vault-ring {
                    animation: pulse-ring 2.5s ease-in-out infinite;
                }
                .float-anim { animation: float 4s ease-in-out infinite; }
            `}</style>

            {/* ── Background ── */}
            <div className="fixed inset-0 mesh-bg grid-overlay pointer-events-none z-0" />

            {/* ── Navbar ── */}
            <nav
                className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-sm"
                style={{ animation: "fadeUp 0.5s ease forwards" }}
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
                        <Zap size={16} className="text-white" />
                    </div>
                    <span className="font-display text-lg font-bold tracking-tight text-white">AlgoVault</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-body">
                    <span className="hover:text-white transition cursor-pointer">Features</span>
                    <span className="hover:text-white transition cursor-pointer">How it Works</span>
                    <span className="hover:text-white transition cursor-pointer">Rewards</span>
                    <span className="hover:text-white transition cursor-pointer">About</span>
                </div>
                <button
                    onClick={handleConnect}
                    disabled={connecting || walletConnected}
                    className="glow-btn flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-70"
                >
                    <Wallet size={15} />
                    {walletConnected ? "Connected ✓" : connecting ? "Connecting..." : "Connect Wallet"}
                </button>
            </nav>

            {/* ── Hero ── */}
            <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">

                {/* Pill badge */}
                <div
                    className="mb-8 flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
                    style={{ animation: "fadeUp 0.6s ease forwards", opacity: 0 }}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                    Built on Algorand · Decentralized Savings
                    <ChevronRight size={14} />
                </div>

                {/* Headline */}
                <h1
                    className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl"
                    style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: "0.1s" }}
                >
                    Save ALGO.
                    <br />
                    <span className="shimmer-text">Earn Rewards.</span>
                    <br />
                    Hit Your Goals.
                </h1>

                {/* Subtext */}
                <p
                    className="font-body mt-6 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed"
                    style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: "0.2s" }}
                >
                    AlgoVault locks your Algorand tokens in a smart savings vault,
                    tracks your progress, and rewards you with badges and points
                    every step of the way — no bank needed.
                </p>

                {/* CTA buttons */}
                <div
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4"
                    style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: "0.3s" }}
                >
                    <button
                        onClick={handleConnect}
                        disabled={connecting || walletConnected}
                        className="glow-btn flex items-center gap-2 rounded-full bg-purple-600 px-8 py-3.5 text-base font-bold text-white"
                    >
                        <Wallet size={18} />
                        {walletConnected ? "Opening Dashboard..." : connecting ? "Connecting..." : "Connect Wallet to Start"}
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition"
                    >
                        View Dashboard →
                    </button>
                </div>

                {/* Floating vault graphic */}
                <div
                    className="float-anim mt-16 flex items-center justify-center"
                    style={{ animation: "fadeUp 0.8s ease forwards, float 4s ease-in-out 1s infinite", opacity: 0, animationDelay: "0.4s" }}
                >
                    <div className="vault-ring relative flex h-36 w-36 items-center justify-center rounded-full bg-purple-600/20 border border-purple-500/30">
                        <div className="absolute inset-3 rounded-full border border-purple-500/20 bg-purple-600/10" />
                        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl">
                            <Lock size={32} className="text-white" />
                        </div>
                        {/* Orbiting dots */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                            <div
                                key={i}
                                className="absolute h-2 w-2 rounded-full bg-purple-400 opacity-60"
                                style={{
                                    top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
                                    left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats strip ── */}
            <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-10">
                <div className="mx-auto flex max-w-3xl flex-col sm:flex-row items-center justify-around gap-8 px-6">
                    <StatCard value={12400} suffix="+"  label="ALGO Saved"     delay="0.1s" />
                    <div className="hidden sm:block h-10 w-px bg-white/10" />
                    <StatCard value={340}   suffix="+"  label="Active Savers"  delay="0.2s" />
                    <div className="hidden sm:block h-10 w-px bg-white/10" />
                    <StatCard value={98}    suffix="%"  label="Goals Achieved" delay="0.3s" />
                    <div className="hidden sm:block h-10 w-px bg-white/10" />
                    <StatCard value={2800}  suffix="+"  label="Badges Earned"  delay="0.4s" />
                </div>
            </section>

            {/* ── Features ── */}
            <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
                <div
                    className="mb-12 text-center"
                    style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0 }}
                >
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-3 font-body">Why AlgoVault</p>
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white">
                        Your money. Your goals.<br />Your rewards.
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                        icon={<Lock size={22} />}
                        title="Smart Goal Lock"
                        desc="Funds stay locked until you hit your savings target. No cheating on yourself."
                        color="purple"
                        delay="0.1s"
                    />
                    <FeatureCard
                        icon={<TrendingUp size={22} />}
                        title="Live Progress"
                        desc="Watch your vault grow in real-time with a clear progress bar and percentage tracker."
                        color="blue"
                        delay="0.2s"
                    />
                    <FeatureCard
                        icon={<Star size={22} />}
                        title="Earn Rewards"
                        desc="Every deposit and milestone earns you points and unlocks achievement badges."
                        color="amber"
                        delay="0.3s"
                    />
                    <FeatureCard
                        icon={<Shield size={22} />}
                        title="Algorand Secure"
                        desc="Built on Algorand's fast, low-cost, carbon-negative blockchain. Safe by design."
                        color="green"
                        delay="0.4s"
                    />
                </div>
            </section>

            {/* ── How it works ── */}
            <section className="relative z-10 border-t border-white/5 bg-white/[0.015] py-24 px-6">
                <div className="mx-auto max-w-4xl">
                    <div
                        className="mb-14 text-center"
                        style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0 }}
                    >
                        <p className="text-xs uppercase tracking-widest text-green-400 mb-3 font-body">Simple Steps</p>
                        <h2 className="font-display text-3xl md:text-4xl font-black text-white">How it works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", icon: <Wallet size={24} />, title: "Connect Wallet",  desc: "Link your Algorand wallet in one click. No sign-up, no email needed.",       color: "text-purple-400" },
                            { step: "02", icon: <Target size={24} />, title: "Set Your Goal",   desc: "Choose how much ALGO you want to save. We'll lock your funds until you do.", color: "text-blue-400"   },
                            { step: "03", icon: <Star size={24} />,   title: "Save & Earn",     desc: "Deposit regularly, hit milestones, and collect badges along the way.",        color: "text-amber-400"  },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-7"
                                style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: `${0.1 * (i + 1)}s` }}
                            >
                                <span className={`font-display text-5xl font-black opacity-20 ${item.color}`}>{item.step}</span>
                                <div className={`w-fit rounded-xl bg-white/5 p-3 ${item.color}`}>{item.icon}</div>
                                <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                                <p className="font-body text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="relative z-10 px-6 py-24">
                <div
                    className="mx-auto max-w-2xl rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-transparent p-12 text-center shadow-2xl shadow-purple-900/20"
                    style={{ animation: "fadeUp 0.8s ease forwards", opacity: 0 }}
                >
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-4 font-body">Get Started Today</p>
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
                        Ready to build your<br />ALGO savings vault?
                    </h2>
                    <p className="font-body text-slate-400 text-sm mb-8 max-w-md mx-auto">
                        Join hundreds of savers already using AlgoVault to reach their financial goals on Algorand.
                    </p>
                    <button
                        onClick={handleConnect}
                        className="glow-btn inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-3.5 text-base font-bold text-white"
                    >
                        <Wallet size={18} />
                        Connect Wallet & Start Saving
                    </button>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="relative z-10 border-t border-white/5 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500">
                        <Zap size={12} className="text-white" />
                    </div>
                    <span className="font-display text-sm font-bold text-white">AlgoVault</span>
                </div>
                <p className="font-body text-xs text-slate-500">Built on Algorand · Decentralized · Open Source</p>
                <p className="font-body text-xs text-slate-600">© 2026 AlgoVault</p>
            </footer>
        </div>
    );
};

export default HomePage;