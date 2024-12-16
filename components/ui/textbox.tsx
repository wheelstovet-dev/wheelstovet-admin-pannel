import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextBox = React.forwardRef<HTMLTextAreaElement, TextBoxProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextBox.displayName = 'TextBox';

export { TextBox };
