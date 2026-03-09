"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/clients/firebase";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"newsletter" | "pre-enrollment">("newsletter");
  const [newsletterData, setNewsletterData] = useState<any[]>([]);
  const [preEnrollmentsData, setPreEnrollmentsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin123";

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const fetchData = async () => {
    if (!db) return;
    setIsLoading(true);
    try {
      // Fetch Newsletter Subscribers
      const nQuery = query(collection(db, "newsletter_subscribers"));
      const nSnapshot = await getDocs(nQuery);
      const nData = nSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsletterData(nData);

      // Fetch Pre-enrollments
      const pQuery = query(collection(db, "course_preenrollment"));
      const pSnapshot = await getDocs(pQuery);
      const pData = pSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPreEnrollmentsData(pData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="glass-card max-w-md w-full p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-white text-black font-semibold py-2 rounded-lg hover:bg-white/90 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              setUsername("");
              setPassword("");
            }}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab("newsletter")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
              activeTab === "newsletter" 
                ? "bg-white text-black" 
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Newsletter Signups ({newsletterData.length})
          </button>
          <button
            onClick={() => setActiveTab("pre-enrollment")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
              activeTab === "pre-enrollment" 
                ? "bg-white text-black" 
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Course Pre-enrollments ({preEnrollmentsData.length})
          </button>
          
          <button 
            onClick={fetchData}
            disabled={isLoading}
            className="ml-auto px-4 py-3 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition flex items-center gap-2"
          >
            {isLoading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {activeTab === "newsletter" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-300">Email</th>
                    <th className="px-6 py-4 font-medium text-gray-300">Time on Page (s)</th>
                    <th className="px-6 py-4 font-medium text-gray-300">City</th>
                    <th className="px-6 py-4 font-medium text-gray-300">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {newsletterData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  ) : (
                    newsletterData.map((user, i) => (
                      <tr key={user.id || i} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 font-medium">{user.email || user.id}</td>
                        <td className="px-6 py-4 text-gray-400">{user.session?.timeOnPage || "N/A"}</td>
                        <td className="px-6 py-4 text-gray-400">{user.location?.city || "N/A"}</td>
                        <td className="px-6 py-4 text-gray-400">{user.location?.country || "N/A"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "pre-enrollment" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-300">Email</th>
                    <th className="px-6 py-4 font-medium text-gray-300">Date Enrolled</th>
                    <th className="px-6 py-4 font-medium text-gray-300">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {preEnrollmentsData.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No pre-enrollments found.
                      </td>
                    </tr>
                  ) : (
                    preEnrollmentsData.map((user, i) => (
                      <tr key={user.id || i} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 font-medium">{user.email || user.id}</td>
                        <td className="px-6 py-4 text-gray-400">
                          {user.timestamp ? new Date(user.timestamp).toLocaleString() : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-400">{user.source || "N/A"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
