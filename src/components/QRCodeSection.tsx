import { QRCodeSVG } from 'qrcode.react';
import { BUSINESS } from '@/lib/constants';
import { MapPin } from 'lucide-react';

export default function QRCodeSection() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
      <div className="flex flex-col items-center gap-2 text-center">
        <MapPin className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-bold text-stone-800">
          Scan to Find Govinda Pet Center
        </h3>
        <p className="text-sm text-stone-500">{BUSINESS.address}</p>
      </div>
      <div className="rounded-2xl bg-white p-4 ring-2 ring-stone-100">
        <QRCodeSVG
          value={BUSINESS.mapsUrl}
          size={220}
          level="H"
          includeMargin
        />
      </div>
      <a
        href={BUSINESS.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full sm:w-auto"
      >
        <MapPin className="h-5 w-5" />
        Open in Google Maps
      </a>
    </div>
  );
}
