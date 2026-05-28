import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Congrats } from './congrats';
import { Ticket } from './ticket';
import { IconDownload } from '../icons';
import { useUserStore } from '../../store/user';

export const ConfirmationPage = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const { fullName } = useUserStore();

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const safeName =
        (fullName || 'usuario').replace(/\s+/g, '_').toLowerCase() ||
        'usuario';
      link.download = `ticket_${safeName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('No se pudo descargar el ticket');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section>
      <Congrats />
      <Ticket ref={ticketRef} />
      <div className='flex justify-center mt-8'>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className='flex items-center gap-2 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold px-6 py-3 rounded-xl cursor-pointer disabled:opacity-60'
        >
          <IconDownload className='w-5 h-5' />
          {downloading ? 'Descargando...' : 'Descargar ticket'}
        </button>
      </div>
    </section>
  );
};
