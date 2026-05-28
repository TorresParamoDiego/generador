import { useState } from 'react';
import { VENUE } from '../../data/conference';
import {
  IconMapPin,
  IconMail,
  IconPhone,
  IconGlobe,
} from '../icons';

export const VenuePage = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className='pb-12'>
      {/* Hero image */}
      <div className='relative rounded-3xl overflow-hidden mb-8 border border-Neutral-700'>
        {!imgFailed ? (
          <img
            src={VENUE.imageUrl}
            onError={() => setImgFailed(true)}
            alt={VENUE.name}
            className='w-full h-64 md:h-80 object-cover'
          />
        ) : (
          <img
            src={VENUE.fallbackImage}
            alt={VENUE.name}
            className='w-full h-64 md:h-80 object-cover'
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-Neutral-900 via-Neutral-900/50 to-transparent' />
        <div className='absolute bottom-0 left-0 right-0 p-6'>
          <div className='inline-block bg-Orange-500 text-Neutral-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2'>
            Sede oficial
          </div>
          <h1 className='text-2xl md:text-4xl font-extrabold text-Neutral-0 mb-1'>
            {VENUE.name}
          </h1>
          <p className='text-Neutral-300 text-sm md:text-base'>
            {VENUE.fullName}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-6 mb-6'>
        <h2 className='text-xl font-bold text-Neutral-0 mb-3'>
          Acerca de la sede
        </h2>
        <p className='text-Neutral-300 leading-relaxed'>{VENUE.description}</p>
      </div>

      {/* Address + Contact */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-6'>
          <h3 className='text-Neutral-500 text-xs uppercase tracking-wider mb-4'>
            Dirección
          </h3>
          <div className='flex items-start gap-3'>
            <div className='w-10 h-10 rounded-xl bg-Orange-500/15 text-Orange-500 flex items-center justify-center flex-shrink-0'>
              <IconMapPin className='w-5 h-5' />
            </div>
            <div className='text-Neutral-0'>
              <p className='font-bold'>{VENUE.address}</p>
              <p className='text-Neutral-300 text-sm'>{VENUE.area}</p>
              <p className='text-Neutral-300 text-sm'>
                {VENUE.city} · CP {VENUE.zip}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-6'>
          <h3 className='text-Neutral-500 text-xs uppercase tracking-wider mb-4'>
            Contacto
          </h3>
          <ul className='space-y-3'>
            <li className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-Orange-500/15 text-Orange-500 flex items-center justify-center flex-shrink-0'>
                <IconPhone className='w-4 h-4' />
              </div>
              <a
                href={`tel:${VENUE.phone.replace(/\s/g, '')}`}
                className='text-Neutral-0 hover:text-Orange-500 text-sm'
              >
                {VENUE.phone}
              </a>
            </li>
            <li className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-Orange-500/15 text-Orange-500 flex items-center justify-center flex-shrink-0'>
                <IconMail className='w-4 h-4' />
              </div>
              <a
                href={`mailto:${VENUE.email}`}
                className='text-Neutral-0 hover:text-Orange-500 text-sm break-all'
              >
                {VENUE.email}
              </a>
            </li>
            <li className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-Orange-500/15 text-Orange-500 flex items-center justify-center flex-shrink-0'>
                <IconGlobe className='w-4 h-4' />
              </div>
              <a
                href={VENUE.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-Neutral-0 hover:text-Orange-500 text-sm break-all'
              >
                celaya.tecnm.mx
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Map */}
      <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-6'>
        <h3 className='text-Neutral-500 text-xs uppercase tracking-wider mb-4'>
          Ubicación en el mapa
        </h3>
        <div className='rounded-xl overflow-hidden border border-Neutral-700'>
          <iframe
            title='Ubicación TecNM Celaya'
            src='https://maps.google.com/maps?q=Instituto%20Tecnologico%20de%20Celaya&t=&z=15&ie=UTF8&iwloc=&output=embed'
            width='100%'
            height='350'
            style={{ border: 0 }}
            loading='lazy'
          />
        </div>
        <a
          href='https://maps.google.com/maps?q=Instituto+Tecnologico+de+Celaya'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 mt-4 text-Orange-500 hover:text-Orange-700 text-sm font-bold'
        >
          Abrir en Google Maps →
        </a>
      </div>
    </section>
  );
};
