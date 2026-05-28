import { useUserStore } from '../../store/user';
import { CONFERENCE } from '../../data/conference';
import { forwardRef } from 'react';

interface TicketProps {
  ticketNumber?: string | number;
  name?: string;
  github?: string;
  avatarUrl?: string;
}

export const Ticket = forwardRef<HTMLDivElement, TicketProps>(
  ({ ticketNumber, name, github, avatarUrl }, ref) => {
    const store = useUserStore();

    const fullName = name ?? store.fullName;
    const githubUser = github ?? store.githubUser;
    const url = avatarUrl ?? store.url;
    const num = ticketNumber ?? '01609';

    return (
      <div
        ref={ref}
        className='h-40 w-[342px] flex flex-col justify-between p-4 bg-[url(/assets/images/pattern-ticket.svg)] bg-contain bg-no-repeat relative sm:h-50 sm:w-[420px] md:h-[260px] md:w-[560px] mx-auto'
      >
        <div>
          <img src='/assets/images/logo-full.svg' alt='logo' />
          <p className='md:text-2xl'>
            {CONFERENCE.shortDate} / {CONFERENCE.city}
          </p>
        </div>

        <div className='flex gap-3 items-center'>
          {url ? (
            <img
              alt='avatar'
              src={url}
              className='size-[45px] rounded-lg object-cover'
            />
          ) : (
            <div className='size-[45px] rounded-lg bg-Orange-700 flex items-center justify-center text-Neutral-900 font-bold'>
              {fullName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
          <div>
            <p className='text-xl font-medium md:text-2xl'>
              {fullName || 'Sin nombre'}
            </p>
            <div className='flex gap-1 items-center'>
              <img src='/assets/images/icon-github.svg' alt='' />
              <p className='md:text-2xl'>{githubUser || '—'}</p>
            </div>
          </div>
        </div>
        <p className='text-2xl absolute top-1/2 right-0 transform -translate-y-1/2 rotate-90 text-Neutral-500'>
          #{num}
        </p>
      </div>
    );
  }
);
Ticket.displayName = 'Ticket';
