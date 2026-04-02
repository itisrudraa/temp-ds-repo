import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Shield, Target, TrendingUp, Lock, Star, Zap, Vault } from "lucide-react";

const HomePage = () => {
    const navigate = useNavigate();
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleConnect = () => {
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setConnected(true);
            setTimeout(() => navigate("/dashboard"), 800);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-white">

            {/* ── Navbar ── */}
            <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
                        <Vault size={16} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">OurVault</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
                    <span className="hover:text-white transition cursor-pointer">Features</span>
                    <span className="hover:text-white transition cursor-pointer">How it Works</span>
                    <span className="hover:text-white transition cursor-pointer">Rewards</span>
                    <span className="hover:text-white transition cursor-pointer">About</span>
                </div>

                <button
                    onClick={handleConnect}
                    disabled={connecting || connected}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition disabled:opacity-60"
                >
                    <Wallet size={15} />
                    {connected ? "Connected ✓" : connecting ? "Connecting..." : "Connect Wallet"}
                </button>
            </nav>

            {/* ── Hero ── */}
            <section className="flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">

                <div className="mb-6 flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    Built on Algorand · Decentralized Savings
                </div>

                <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight max-w-3xl text-white">
                    Save ALGO.{" "}
                    <span className="text-purple-400">Earn Rewards.</span>{" "}
                    Hit Your Goals.
                </h1>

                <p className="mt-6 max-w-lg text-base text-slate-400 leading-relaxed">
                    OurVault is a decentralized savings dApp built on Algorand. Lock your
                    ALGO tokens, set a savings goal, track your progress, and earn badges
                    and reward points along the way — no bank, no middleman.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <button
                        onClick={handleConnect}
                        disabled={connecting || connected}
                        className="flex items-center gap-2 rounded-lg bg-purple-600 px-7 py-3 text-base font-bold text-white hover:bg-purple-700 transition disabled:opacity-60"
                    >
                        <Wallet size={18} />
                        {connected ? "Opening Dashboard..." : connecting ? "Connecting..." : "Connect Wallet to Start"}
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-7 py-3 text-base font-semibold text-white hover:bg-white/10 transition"
                    >
                        View Dashboard →
                    </button>
                </div>

                {/* Vault icon */}
                <div className="mt-16 flex items-center justify-center">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-purple-600/20 border border-purple-500/30">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl">
                            <Lock size={30} className="text-white" />
                        </div>
                    </div>
                </div>

            </section>



            {/* ── Features ── */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="mb-10 text-center">
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-2">Why OurVault</p>
                    <h2 className="text-3xl font-black text-white">Your money. Your goals. Your rewards.</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-6">
                        <div className="mb-4 w-fit rounded-lg bg-purple-500/20 p-3 text-purple-400">
                            <Lock size={20} />
                        </div>
                        <h3 className="mb-2 text-sm font-bold text-white">Smart Goal Lock</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Funds stay locked until you hit your savings target. No cheating on yourself.
                        </p>
                    </div>

                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-6">
                        <div className="mb-4 w-fit rounded-lg bg-blue-500/20 p-3 text-blue-400">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="mb-2 text-sm font-bold text-white">Live Progress</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Track your vault growth with a real-time progress bar and percentage display.
                        </p>
                    </div>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-6">
                        <div className="mb-4 w-fit rounded-lg bg-amber-500/20 p-3 text-amber-400">
                            <Star size={20} />
                        </div>
                        <h3 className="mb-2 text-sm font-bold text-white">Earn Rewards</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Every deposit and milestone earns you points and unlocks achievement badges.
                        </p>
                    </div>

                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6">
                        <div className="mb-4 w-fit rounded-lg bg-green-500/20 p-3 text-green-400">
                            <Shield size={20} />
                        </div>
                        <h3 className="mb-2 text-sm font-bold text-white">Algorand Secure</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Built on Algorand — fast, low cost, and carbon-negative. Safe by design.
                        </p>
                    </div>

                </div>
            </section>

            {/* ── How it Works ── */}
            <section className="border-t border-white/5 bg-white/[0.015] py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <p className="text-xs uppercase tracking-widest text-green-400 mb-2">Simple Steps</p>
                        <h2 className="text-3xl font-black text-white">How it works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-7">
                            <span className="text-5xl font-black text-purple-400 opacity-20">01</span>
                            <div className="mt-4 mb-3 w-fit rounded-lg bg-white/5 p-3 text-purple-400">
                                <Wallet size={22} />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Connect Wallet</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Link your Algorand wallet in one click. No sign-up or email required.
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-7">
                            <span className="text-5xl font-black text-blue-400 opacity-20">02</span>
                            <div className="mt-4 mb-3 w-fit rounded-lg bg-white/5 p-3 text-blue-400">
                                <Target size={22} />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Set Your Goal</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Decide how much ALGO you want to save. Your vault locks until you get there.
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-7">
                            <span className="text-5xl font-black text-amber-400 opacity-20">03</span>
                            <div className="mt-4 mb-3 w-fit rounded-lg bg-white/5 p-3 text-amber-400">
                                <Star size={22} />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">Save &amp; Earn</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Keep depositing, hit milestones, and collect badges and reward points as you go.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-2xl rounded-2xl border border-purple-500/20 bg-purple-600/10 p-12 text-center">
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-3">Get Started</p>
                    <h2 className="text-3xl font-black text-white mb-3">
                        Ready to build your ALGO savings vault?
                    </h2>
                    <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
                        OurVault is open, decentralized, and built for anyone who wants
                        to save smarter on Algorand.
                    </p>
                    <button
                        onClick={handleConnect}
                        disabled={connecting || connected}
                        className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-3 text-base font-bold text-white hover:bg-purple-700 transition disabled:opacity-60"
                    >
                        <Wallet size={18} />
                        Connect Wallet &amp; Start Saving
                    </button>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-white/5 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500">
                        <Vault size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">OurVault</span>
                </div>
                <p className="text-xs text-slate-500">Built on Algorand · Decentralized · Open Source</p>
                <p className="text-xs text-slate-600">© 2026 OurVault</p>
            </footer>

        </div>
    );
};

export default HomePage;