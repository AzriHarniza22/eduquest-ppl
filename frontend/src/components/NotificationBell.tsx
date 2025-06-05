import Link from 'next/link';

interface NotificationBellProps {
  unreadCount?: number;
}

export default function NotificationBell({ unreadCount = 3 }: NotificationBellProps) {
  return (
    <Link href="/notifications" className="relative inline-block">
      <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
        <span className="text-xl text-white">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
    </Link>
  );
} 