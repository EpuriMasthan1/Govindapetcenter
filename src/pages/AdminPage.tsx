import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Booking, BookingStatus } from '@/lib/types';
import { BOOKING_STATUSES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { Search, X, Loader2, LogOut, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [updating, setUpdating] = useState(false);

  const checkSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) setAuthed(true);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setAuthError(error.message || 'Login failed');
    } else {
      setAuthed(true);
    }
    setLoggingIn(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setAuthed(false);
    navigate('/');
  }

  const loadBookings = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'All') {
      query = query.eq('status', statusFilter);
    }
    if (search.trim()) {
      query = query.or(
        `booking_id.ilike.%${search}%,customer_name.ilike.%${search}%,phone.ilike.%${search}%,pet_name.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (!error && data) {
      setBookings(data as Booking[]);
    }
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    if (authed) loadBookings();
  }, [authed, loadBookings]);

  async function updateStatus(bookingId: string, status: BookingStatus) {
    setUpdating(true);
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();
    if (!error && data) {
      setSelected(data as Booking);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? (data as Booking) : b))
      );
    }
    setUpdating(false);
  }

  if (!authed) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4 py-16">
        <div className="card w-full max-w-md">
          <h1 className="text-2xl font-bold text-stone-800">Admin Login</h1>
          <p className="mt-2 text-sm text-stone-600">
            Sign in to manage bookings for Govinda Pet Center.
          </p>
          {authError && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {authError}
            </div>
          )}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700">Email</label>
              <input
                type="email"
                className="input-field mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700">Password</label>
              <input
                type="password"
                className="input-field mt-1.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loggingIn} className="btn-primary w-full">
              {loggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-stone-50 min-h-screen py-8">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-800">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-outline text-sm">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              className="input-field pl-10"
              placeholder="Search by booking ID, name, phone, pet name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input-field sm:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'All')}
          >
            <option value="All">All Statuses</option>
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Bookings list */}
        {loading ? (
          <div className="mt-8 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="mt-8 text-center text-stone-500">No bookings found.</p>
        ) : (
          <div className="mt-6 space-y-3">
            {bookings.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(b)}
                className="card flex w-full items-center justify-between text-left hover:ring-2 hover:ring-green-500/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-700">{b.booking_id}</span>
                    <StatusBadge status={b.status || 'New'} />
                  </div>
                  <p className="mt-1 text-sm text-stone-600">
                    {b.customer_name} &middot; {b.pet_type} ({b.breed}) &middot; {b.num_pets} pet(s)
                  </p>
                  <p className="text-xs text-stone-400">
                    {formatDate(b.start_date)} &middot; {b.num_days} day(s) &middot; {formatDate(b.created_at || '')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={() => setSelected(null)}>
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-800">Booking Details</h2>
                <p className="mt-1 text-lg font-bold text-green-700">{selected.booking_id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-stone-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <DetailGroup title="Customer">
                <DetailRow label="Name" value={selected.customer_name} />
                <DetailRow label="Phone" value={selected.phone} />
                <DetailRow label="WhatsApp" value={selected.whatsapp_number} />
                {selected.email && <DetailRow label="Email" value={selected.email} />}
              </DetailGroup>

              <DetailGroup title="Pet">
                <DetailRow label="Pet Name" value={selected.pet_name || 'Not specified'} />
                <DetailRow label="Type" value={selected.pet_type} />
                <DetailRow label="Breed" value={selected.breed} />
                <DetailRow label="Number of Pets" value={String(selected.num_pets)} />
              </DetailGroup>

              <DetailGroup title="Care">
                <DetailRow label="Days" value={String(selected.num_days)} />
                <DetailRow label="Start Date" value={formatDate(selected.start_date)} />
                {selected.end_date && <DetailRow label="End Date" value={formatDate(selected.end_date)} />}
                <DetailRow label="Services" value={(selected.services || []).join(', ')} />
              </DetailGroup>

              <DetailGroup title="Pickup & Drop">
                <DetailRow label="Pickup" value={selected.pickup_required ? 'Yes' : 'No'} />
                {selected.pickup_required && <DetailRow label="Pickup Address" value={selected.pickup_address || 'N/A'} />}
                <DetailRow label="Drop" value={selected.drop_required ? 'Yes' : 'No'} />
                {selected.drop_required && <DetailRow label="Drop Address" value={selected.drop_address || 'N/A'} />}
                {selected.customer_address && <DetailRow label="Service Address" value={selected.customer_address} />}
                {selected.latitude != null && (
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <MapPin className="h-4 w-4 text-green-600" />
                    Location: {selected.latitude.toFixed(4)}, {selected.longitude?.toFixed(4)}
                  </div>
                )}
              </DetailGroup>

              {selected.additional_requirements && (
                <DetailGroup title="Additional Requirements">
                  <p className="text-sm text-stone-600">{selected.additional_requirements}</p>
                </DetailGroup>
              )}

              {/* Status update */}
              <div className="rounded-xl bg-stone-50 p-4">
                <label className="text-sm font-semibold text-stone-700">Update Status</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BOOKING_STATUSES.map((s) => (
                    <button
                      key={s}
                      disabled={updating}
                      onClick={() => updateStatus(selected.id!, s)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                        (selected.status || 'New') === s
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick contact */}
              <div className="flex gap-3">
                <a href={`tel:${selected.phone}`} className="btn-call flex-1 text-sm">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a
                  href={`https://wa.me/${selected.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1 text-sm"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const colors: Record<BookingStatus, string> = {
    New: 'bg-blue-100 text-blue-700',
    Contacted: 'bg-amber-100 text-amber-700',
    Confirmed: 'bg-green-100 text-green-700',
    'In Progress': 'bg-purple-100 text-purple-700',
    Completed: 'bg-stone-200 text-stone-700',
    Cancelled: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
}

function DetailGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-100 p-4">
      <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide">{title}</h3>
      <div className="mt-2 space-y-1.5">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="text-right font-medium text-stone-800">{value}</span>
    </div>
  );
}
