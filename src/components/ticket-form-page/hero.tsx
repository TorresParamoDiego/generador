import { CONFERENCE } from '../../data/conference';

export const Hero = () => {
  return (
    <div className='mb-8'>
      <h2 className='text-3xl text-center font-extrabold mb-5'>
        Tu camino a {CONFERENCE.name} comienza aquí
      </h2>
      <p className='text-xl text-center text-Neutral-500 font-medium'>
        Asegura tu lugar el {CONFERENCE.shortDate} en {CONFERENCE.city}.
      </p>
    </div>
  );
};
