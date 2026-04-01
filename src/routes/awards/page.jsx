import { useState } from "react";
import { Star, Trophy, Target, Zap, Shield, Award, Lock, CheckCircle, TrendingUp, Gift } from "lucide-react";
import { Footer } from "@/layouts/footer";

// ─── Static data ────────────────────────────────────────────────────────────

const MILESTONES = [
    { id: 1, label: "First Deposit",   threshold: 1,   reward: "5 pts",   icon: "💰", color: "green"  },
    { id: 2, label: "Save 10 ALGO",    threshold: 10,  reward: "15 pts",  icon: "🏦", color: "blue"   },
    { id: 3, label: "Save 25 ALGO",    threshold: 25,  reward: "30 pts",  icon: "⚡", color: "yellow" },
    { id: 4, label: "Save 50 ALGO",    threshold: 50,  reward: "60 pts",  icon: "🔥", color: "orange" },
    { id: 5, label: "Save 100 ALGO",   threshold: 100, reward: "150 pts", icon: "💎", color: "purple" },
    { id: 6, label: "Save 250 ALGO",   threshold: 250, reward: "400 pts", icon: "👑", color: "amber"  },
];

const BADGES = [
    { id: 1, name: "First Steps",    desc: "Made your first deposit",       icon: <Star size={28} />,      color: "green",  pts: 5,   earned: true  },
    { id: 2, name: "Vault Keeper",   desc: "Kept funds locked for 7 days",  icon: <Shield size={28} />,    color: "blue",   pts: 20,  earned: true  },
    { id: 3, name: "Goal Setter",    desc: "Set your first savings goal",    icon: <Target size={28} />,    color: "purple", pts: 10,  earned: true  },
    { id: 4, name: "Half Way",       desc: "Reached 50% of your goal",      icon: <TrendingUp size={28}/>, color: "yellow", pts: 25,  earned: false },
    { id: 5, name: "Goal Crusher",   desc: "Hit your savings target",        icon: <Trophy size={28} />,    color: "orange", pts: 50,  earned: false },
    { id: 6, name: "Diamond Saver",  desc: "Saved 100+ ALGO",               icon: <Award size={28} />,     color: "cyan",   pts: 100, earned: false },
    { id: 7, name: "Streak Master",  desc: "10 consecutive deposits",        icon: <Zap size={28} />,       color: "red",    pts: 75,  earned: false },
    { id: 8, name: "Grand Vault",    desc: "Saved 250+ ALGO",               icon: <Gift size={28} />,      color: "amber",  pts: 200, earned: false },
];

const colorMap = {
    green:  { bg: "bg-green-500/20",  text: "text-green-500",  border: "border-green-500",  ring: "ring-green-500"  },
    blue:   { bg: "bg-blue-500/20",   text: "text-blue-500",   border: "border-blue-500",   ring: "ring-blue-500"   },
    purple: { bg: "bg-purple-500/20", text: "text-purple-500", border: "border-purple-500", ring: "ring-purple-500" },
    yellow: { bg: "bg-yellow-500/20", text: "text-yellow-500", border: "border-yellow-500", ring: "ring-yellow-500" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-500", border: "border-orange-500", ring: "ring-orange-500" },
    amber:  { bg: "bg-amber-500/20",  text: "text-amber-500",  border: "border-amber-500",  ring: "ring-amber-500"  },
    cyan:   { bg: "bg-cyan-500/20",   text: "text-cyan-500",   border: "border-cyan-500",   ring: "ring-cyan-500"   },
    red:    { bg: "bg-red-500/20",    text: "text-red-500",    border: "border-red-500",    ring: "ring-red-500"    },
};

// ─── Subcomponents ───────────────────────────────────────────────────────────

const BadgeCard = ({ badge }) => {
    const [flipped, setFlipped] = useState(false);
    const c = colorMap[badge.color];

    return (
        <div
            className="relative cursor-pointer select-none"
            style={{ perspective: "800px" }}
            onClick={() => setFlipped(f => !f)}
        >
            <div
                style={{
                    transition: "transform 0.55s cubic-bezier(.4,2,.6,1)",
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    position: "relative",
                    minHeight: "160px",
                }}
            >
                {/* FRONT */}
                <div
                    className={`card absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 ${
                        badge.earned ? "" : "opacity-50"
                    }`}
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    <div className={`rounded-full p-3 ${c.bg} ${c.text} ${badge.earned ? `ring-2 ${c.ring}` : ""}`}>
                        {badge.icon}
                    </div>
                    <p className="text-center text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {badge.name}
                    </p>
                    {badge.earned ? (
                        <span className={`flex items-center gap-1 rounded-full border ${c.border} px-2 py-0.5 text-xs font-medium ${c.text}`}>
                            <CheckCircle size={11} /> Earned · {badge.pts} pts
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 rounded-full border border-slate-400 px-2 py-0.5 text-xs font-medium text-slate-400">
                            <Lock size={11} /> Locked
                        </span>
                    )}
                </div>

                {/* BACK */}
                <div
                    className="card absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <p className={`text-2xl font-bold ${c.text}`}>{badge.pts} pts</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{badge.desc}</p>
                    {badge.earned && (
                        <CheckCircle size={20} className="text-green-500 mt-1" />
                    )}
                </div>
            </div>
        </div>
    );
};

const MilestoneTrack = ({ savedAmount = 10 }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="w-fit rounded-lg bg-amber-500/20 p-2 text-amber-500">
                    <Trophy size={22} />
                </div>
                <p className="card-title">Savings Milestones</p>
            </div>
            <div className="card-body">
                {/* Track line */}
                <div className="relative mt-2">
                    {/* Connector line */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex flex-col gap-5">
                        {MILESTONES.map((m) => {
                            const done = savedAmount >= m.threshold;
                            const c = colorMap[m.color];
                            return (
                                <div key={m.id} className="relative flex items-center gap-4">
                                    {/* Node */}
                                    <div
                                        className={`z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg
                                            ${done ? `${c.bg} ring-2 ${c.ring}` : "bg-slate-200 dark:bg-slate-700"}`}
                                    >
                                        {done ? m.icon : <Lock size={14} className="text-slate-400" />}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 items-center justify-between">
                                        <div>
                                            <p className={`text-sm font-semibold ${done ? "text-slate-900 dark:text-slate-50" : "text-slate-400"}`}>
                                                {m.label}
                                            </p>
                                            <p className="text-xs text-slate-500">{m.threshold} ALGO required</p>
                                        </div>
                                        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium
                                            ${done ? `${c.border} ${c.text}` : "border-slate-300 text-slate-400 dark:border-slate-600"}`}>
                                            {done ? `✅ ${m.reward}` : m.reward}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const RewardsPage = () => {
    // Mirror saved amount from dashboard (replace with real state/props/context)
    const savedAmount = 10;
    const totalPoints = BADGES.filter(b => b.earned).reduce((sum, b) => sum + b.pts, 0);
    const earnedCount = BADGES.filter(b => b.earned).length;
    const nextMilestone = MILESTONES.find(m => savedAmount < m.threshold);

    const progressToNext = nextMilestone
        ? Math.min((savedAmount / nextMilestone.threshold) * 100, 100)
        : 100;

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Rewards</h1>

            {/* ── Top stat cards ── */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Points */}
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-amber-500/20 p-2 text-amber-500">
                            <Star size={26} />
                        </div>
                        <p className="card-title">Total Points</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{totalPoints}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-amber-500 px-2 py-1 font-medium text-amber-500">
                            ⭐ Points Earned
                        </span>
                    </div>
                </div>

                {/* Badges Earned */}
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-purple-500/20 p-2 text-purple-500">
                            <Award size={26} />
                        </div>
                        <p className="card-title">Badges</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {earnedCount} <span className="text-base font-normal text-slate-400">/ {BADGES.length}</span>
                        </p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-purple-500 px-2 py-1 font-medium text-purple-500">
                            🏅 Collected
                        </span>
                    </div>
                </div>

                {/* Next Milestone */}
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                            <Target size={26} />
                        </div>
                        <p className="card-title">Next Milestone</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {nextMilestone ? `${nextMilestone.threshold} ALGO` : "All done!"}
                        </p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500">
                            🎯 {nextMilestone ? nextMilestone.label : "Completed"}
                        </span>
                    </div>
                </div>

                {/* Progress to next */}
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-green-500/20 p-2 text-green-500">
                            <TrendingUp size={26} />
                        </div>
                        <p className="card-title">Progress</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {progressToNext.toFixed(0)}%
                        </p>
                        <div className="mt-3 w-full">
                            <div className="h-3 w-full rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
                                <div
                                    className={`h-3 rounded-full transition-all duration-500 ${
                                        progressToNext >= 100 ? "bg-green-500" :
                                        progressToNext >= 50  ? "bg-yellow-500" : "bg-red-500"
                                    }`}
                                    style={{ width: `${progressToNext}%` }}
                                />
                            </div>
                        </div>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500 mt-1">
                            🚀 On Track
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Badges + Milestones ── */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                {/* Badges Grid */}
                <div className="card col-span-1 lg:col-span-4">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-purple-500/20 p-2 text-purple-500">
                            <Award size={22} />
                        </div>
                        <p className="card-title">Achievement Badges</p>
                        <span className="ml-auto text-xs text-slate-400">Click badge to flip</span>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {BADGES.map(badge => (
                                <BadgeCard key={badge.id} badge={badge} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Milestones Track */}
                <div className="col-span-1 lg:col-span-3">
                    <MilestoneTrack savedAmount={savedAmount} />
                </div>
            </div>

            {/* ── Rewards Leaderboard strip ── */}
            <div className="card">
                <div className="card-header">
                    <div className="w-fit rounded-lg bg-green-500/20 p-2 text-green-500">
                        <Trophy size={22} />
                    </div>
                    <p className="card-title">How to Earn More Rewards</p>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: "💰", title: "Deposit ALGO",       desc: "Every deposit earns you points towards badges.",          pts: "+5 pts / deposit"   },
                            { icon: "🎯", title: "Hit Your Goal",      desc: "Reach your savings target to unlock the Goal Crusher.",   pts: "+50 pts"            },
                            { icon: "🔒", title: "Stay Consistent",    desc: "Keep funds locked to earn the Vault Keeper badge.",       pts: "+20 pts"            },
                            { icon: "📈", title: "Save Milestones",    desc: "Hit ALGO thresholds to unlock milestone rewards.",        pts: "Up to +400 pts"     },
                        ].map((tip, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4"
                            >
                                <span className="text-2xl">{tip.icon}</span>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{tip.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">{tip.desc}</p>
                                <span className="w-fit rounded-full border border-green-500 px-2 py-0.5 text-xs font-medium text-green-500">
                                    {tip.pts}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RewardsPage;