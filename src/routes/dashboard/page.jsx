import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useState } from "react";

import { useTheme } from "@/hooks/use-theme";

import { overviewData, recentSalesData, topProducts } from "@/constants";

import { Footer } from "@/layouts/footer";

import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users, Wallet, Target } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [goal, setGoal] = useState(20);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [newGoal, setNewGoal] = useState("");
    const [transactions, setTransactions] = useState([]);
    const vaultData = {
        wallet: 25,
        saved: 10,
        goal: 20
    };

        const handleDeposit = () => {
            const amount = Number(depositAmount);

            // to handle Invalid input
            if (!amount || amount <= 0) {
                alert("Enter a valid amount ❌");
                return;
            }

            vaultData.saved += amount;

            // ✅ add transaction
            setTransactions(prev => [
                {
                    id: Date.now(),
                    type: "Deposit",
                    amount: amount
                },
                ...prev
            ]);

            setDepositAmount("");
        };

        const handleWithdraw = () => {
            const amount = Number(withdrawAmount);

            if (!amount || amount <= 0) {
                alert("Enter valid amount ❌");
                return;
            }

            // smart Goal lock
            if (vaultData.saved < goal) {
                alert("Funds are locked until goal is reached 🔒");

                setTransactions(prev => [
                    {
                        id: Date.now(),
                        type: "Withdraw (Locked)",
                        amount: amount
                    },
                    ...prev
                ]);

                return;
            }

            // 🚫 Prevent overdraft
            if (amount > vaultData.saved) {
                alert("Insufficient balance ❌");
                return;
            }

            vaultData.saved -= amount;

            setTransactions(prev => [
                {
                    id: Date.now(),
                    type: "Withdraw",
                    amount: amount
                },
                ...prev
            ]);

            setWithdrawAmount("");
        };

        const handleSetGoal = () => {
            const value = Number(newGoal);

            if (!value || value <= 0) {
                alert("Enter valid goal ❌");
                return;
            }

            setGoal(value);
            setIsEditingGoal(false);
            setNewGoal("");
        };


    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-green-500/20 p-2 text-green-500">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">Wallet Balance</p>
                    </div>

                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {vaultData.wallet} ALGO
                        </p>

                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500">
                            💰 Available
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Wallet size={26} />
                        </div>
                        <p className="card-title">Vault Balance</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {vaultData.saved} ALGO
                        </p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            🔒 Locked Funds
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-purple-500/20 p-2 text-purple-500">
                            <Target size={26} />
                        </div>
                        <p className="card-title">Goal</p>
                    </div>

                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                    <div className="flex items-center justify-between">

                        {!isEditingGoal ? (
                            <>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                                    {goal} ALGO
                                </p>

                                <button
                                    onClick={() => setIsEditingGoal(true)}
                                    className="text-purple-500"
                                >
                                    ✏️
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={newGoal}
                                    onChange={(e) => setNewGoal(e.target.value)}
                                    className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-black dark:text-white"
                                />

                                <button
                                    onClick={handleSetGoal}
                                    className="bg-purple-500 text-white px-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        )}

                    </div>

                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-purple-500 px-2 py-1 font-medium text-purple-500">
                            🎯 Target Set
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-green-500/20 p-2 text-green-500">
                            <TrendingUp size={26} />
                        </div>
                        <p className="card-title">Progress</p>
                    </div>

                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {vaultData.goal > 0 
                                ? ((vaultData.saved / goal) * 100).toFixed(0) 
                                : 0}%
                        </p>

                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500">
                            🚀 On Track
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Overview</p>
                    </div>
                    <div className="card-body p-0">
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart
                                data={overviewData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTotal"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2563eb"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2563eb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    cursor={false}
                                    formatter={(value) => `$${value}`}
                                />

                                <XAxis
                                    dataKey="name"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickMargin={6}
                                />
                                <YAxis
                                    dataKey="total"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => `$${value}`}
                                    tickMargin={6}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header">
                        <p className="card-title">Vault Actions</p>
                    </div>
                    <div className="card-body h-[300px] flex flex-col gap-6 p-4">

                        {/* 🟢 DEPOSIT */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Deposit ALGO</p>

                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none"
                            />

                            <button
                                onClick={handleDeposit}
                                className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Deposit 💰
                            </button>
                        </div>

                        {/* 🔴 WITHDRAW */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Withdraw ALGO</p>

                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none"
                            />

                            <button
                                onClick={handleWithdraw}
                                className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Withdraw 🔒
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Transaction History</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">Type</th>
                                    <th className="table-head">Transaction ID</th>
                                    <th className="table-head">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="table-row">

                                        <td className="table-cell">
                                            <span className={
                                                tx.type.includes("Deposit")
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }>
                                                {tx.type}
                                            </span>
                                        </td>

                                        <td className="table-cell">
                                            #{tx.id.toString().slice(-6)}
                                        </td>

                                        <td className="table-cell">
                                            {tx.amount} ALGO
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
