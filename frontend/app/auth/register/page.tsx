'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, Phone, Building2 } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import AuthProvider from '@/components/ui/AuthProvider';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { setAuth, user } = useAuthStore();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    role: params.get('role') === 'owner' ? 'owner' : 'user',
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      const res = await authAPI.register(data);
      setAuth(res.data.user, res.data.token);
      toast.success('Account created! Welcome to GBRentals.');
      router.push(res.data.user.role === 'owner' ? '/dashboard/owner' : '/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex">
        <div className="hidden lg:flex flex-col justify-between w-5/12 bg-[#131849] p-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900" alt="" className="w-full h-full object-cover opacity-20" />
          </div>
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-[#131849] font-bold">GB</div>
              <span className="font-display font-bold text-2xl text-white">Rentals</span>
            </Link>
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="font-display text-4xl font-bold text-white leading-tight">Join thousands of<br /><span className="text-yellow-400">happy homeowners.</span></h2>
            <p className="text-white/60">List properties, manage tenants, track everything — all in one place.</p>
          </div>
          <div className="relative z-10 text-white/30 text-sm">© 2026 GBRentals</div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
          <div className="w-full max-w-lg">
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#131849] rounded-xl flex items-center justify-center text-yellow-400 font-bold">GB</div>
                <span className="font-display font-bold text-2xl text-[#131849]">Rentals</span>
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-[#131849] mb-2">Create account</h1>
                <p className="text-gray-500">Start your journey with GBRentals today</p>
              </div>

              {/* Role toggle */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                {[{ val: 'user', label: 'Tenant / Buyer' }, { val: 'owner', label: 'Property Owner' }].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, role: val })}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${form.role === val ? 'bg-white text-[#131849] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#131849]/20 focus:border-[#131849] text-sm transition-all" />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#131849]/20 focus:border-[#131849] text-sm transition-all" />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#131849]/20 focus:border-[#131849] text-sm transition-all" />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={show ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Min. 6 characters"
                        className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#131849]/20 focus:border-[#131849] text-sm transition-all" />
                      <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={show ? 'text' : 'password'} required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="Repeat password"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#131849]/20 focus:border-[#131849] text-sm transition-all" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-[#131849] text-white font-bold py-4 rounded-xl hover:bg-[#1a2680] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm mt-2">
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-[#131849] font-semibold hover:text-yellow-500 transition-colors">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
