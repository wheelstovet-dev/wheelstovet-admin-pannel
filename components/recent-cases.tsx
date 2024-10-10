import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { caseData } from '@/constants/casesData';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface Case {
  avatar?: StaticImageData;
  name?: string;
  paymentStatus?: string; // Added payment status
  time?: string;
}

interface RecentCasesProps {
  cases: Case[];
}

export function RecentCases({ cases }: RecentCasesProps) {
  return (
    <div className="space-y-3">
      {cases.map((caseData, index) => (
        <div
          className="flex items-center p-3 transition-all duration-200 transform hover:scale-105 hover:bg-yellow-500"
          key={index}
        >
          {/* Avatar */}
          <Avatar className="h-9 w-9">
            {caseData.avatar ? (
              <Image src={caseData.avatar} alt="Avatar" />
            ) : (
              <AvatarFallback>
                {caseData.name ? caseData.name.split(' ').map((n) => n[0]).join('') : 'NA'}
              </AvatarFallback>
            )}
          </Avatar>

          {/* Name and Payment Status */}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-small leading-none">{caseData.name || 'Unnamed'}</p>
            {/* Payment Status */}
            {caseData.paymentStatus && (
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Payment Status:</span> {caseData.paymentStatus}
              </p>
            )}
          </div>

          {/* Time */}
          <div className="ml-auto text-xs font-small">
            {caseData.time && <p>{caseData.time}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
