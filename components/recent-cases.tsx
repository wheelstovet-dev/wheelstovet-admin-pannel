import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { caseData } from '@/constants/casesData';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface Case {
  avatar?: StaticImageData;
  name?: string;
  data?: string;
  time?: string;
  itemsIncluded?: { itemName: string; quantity: string }[];
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
          <Avatar className="h-9 w-9">
            {caseData.avatar ? (
              <Image src={caseData.avatar} alt="Avatar" />
            ) : (
              <AvatarFallback>
                {caseData.name ? caseData.name.split(' ').map((n) => n[0]).join('') : 'NA'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-small leading-none">{caseData.name || 'Unnamed'}</p>
            {caseData?.data && (
              <p className="text-sm text-muted-foreground">
                {caseData.data || 'No data found'}
              </p>
            )}
            {caseData.itemsIncluded &&
              caseData.itemsIncluded.map((item) => (
                <p key={item.itemName} className="text-sm text-muted-foreground">
                  {item.itemName}: {item.quantity}
                </p>
              ))}
          </div>
          <div className="ml-auto text-xs font-small">{caseData.time }</div>
        </div>
      ))}
    </div>
  );
}
