import { CONFERENCE, SCHEDULE, ACTIVITIES } from '../../data/conference';
import {
  IconCalendar,
  IconMapPin,
  IconClock,
  IconCoffee,
  IconMic,
  IconLightbulb,
  IconPeople,
  IconCode,
  IconTrophy,
} from '../icons';
import type { ComponentType } from 'react';

const TYPE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  keynote: IconMic,
  workshop: IconCode,
  panel: IconPeople,
  break: IconCoffee,
};

const TYPE_LABELS: Record<string, string> = {
  keynote: 'Keynote',
  workshop: 'Workshop',
  panel: 'Panel',
  break: 'Descanso',
};

const ACTIVITY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  code: IconCode,
  lightbulb: IconLightbulb,
  people: IconPeople,
  trophy: IconTrophy,
};

export const ConferencePage = () => {
  return (
    <section className='pb-12'>
      {/* Hero */}
      <div className='bg-gradient-to-br from-Orange-500 to-Orange-700 rounded-3xl p-8 mb-8 text-Neutral-900'>
        <div className='inline-block bg-Neutral-900/15 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3'>
          Evento
        </div>
        <h1 className='text-3xl md:text-5xl font-extrabold mb-3'>
          {CONFERENCE.name}
        </h1>
        <p className='text-lg mb-5 opacity-80'>
          La conferencia de desarrollo de software más importante del semestre
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex items-center gap-2 bg-Neutral-900/15 rounded-xl px-4 py-2'>
            <IconCalendar className='w-5 h-5' />
            <span className='font-bold capitalize'>{CONFERENCE.date}</span>
          </div>
          <div className='flex items-center gap-2 bg-Neutral-900/15 rounded-xl px-4 py-2'>
            <IconMapPin className='w-5 h-5' />
            <span className='font-bold'>{CONFERENCE.city}</span>
          </div>
        </div>
      </div>

      {/* Activities */}
      <h2 className='text-2xl font-bold text-Neutral-0 mb-4'>
        ¿Qué te espera?
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-10'>
        {ACTIVITIES.map((a) => {
          const Icon = ACTIVITY_ICONS[a.icon];
          return (
            <div
              key={a.title}
              className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-5'
            >
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-11 h-11 rounded-xl bg-Orange-500/15 text-Orange-500 flex items-center justify-center'>
                  <Icon className='w-6 h-6' />
                </div>
                <h3 className='text-lg font-bold text-Neutral-0'>{a.title}</h3>
              </div>
              <p className='text-Neutral-500 text-sm'>{a.description}</p>
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <h2 className='text-2xl font-bold text-Neutral-0 mb-4 flex items-center gap-2'>
        <IconClock className='w-6 h-6 text-Orange-500' />
        Horario
      </h2>
      <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl divide-y divide-Neutral-700'>
        {SCHEDULE.map((item, i) => {
          const Icon = TYPE_ICONS[item.type];
          const isBreak = item.type === 'break';
          return (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 ${
                isBreak ? 'bg-Neutral-900/30' : ''
              }`}
            >
              <div className='hidden sm:flex w-24 flex-shrink-0 items-center text-Neutral-500 text-sm font-mono'>
                {item.time}
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  isBreak
                    ? 'bg-Neutral-700/40 text-Neutral-500'
                    : 'bg-Orange-500/15 text-Orange-500'
                }`}
              >
                <Icon className='w-5 h-5' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='sm:hidden text-Neutral-500 text-xs font-mono mb-1'>
                  {item.time}
                </p>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isBreak
                        ? 'bg-Neutral-700/40 text-Neutral-500'
                        : 'bg-Orange-500/20 text-Orange-500'
                    }`}
                  >
                    {TYPE_LABELS[item.type]}
                  </span>
                </div>
                <p className='font-bold text-Neutral-0 mt-1'>{item.title}</p>
                {item.speaker && (
                  <p className='text-Neutral-500 text-sm mt-1'>
                    Con {item.speaker}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
