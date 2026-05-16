import { Icon } from './Icon';

/** Thin announcement strip above the header. */
export function AnnouncementBar() {
  return (
    <div className="bg-navy-deep py-2 text-center">
      <p className="flex items-center justify-center gap-2 text-xs font-semibold text-white/80">
        <Icon name="whatsapp" size={13} className="text-cyan-glow" />
        Easy WhatsApp Ordering — Fast Support Across the UAE
      </p>
    </div>
  );
}
