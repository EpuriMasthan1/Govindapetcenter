import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-md">
        <PawPrint className="h-6 w-6" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-stone-800">Govinda Pet Center</span>
        <span className="text-xs text-green-600">24/7 Pet Care in Tirupati</span>
      </div>
    </Link>
  );
}
