import { useEffect } from 'react';
import { TicketFormPage } from './components/ticket-form-page/ticket-form-page'
import { MainLayout } from './components/layouts/main-layout'
import { useShowTicket } from './hooks/use-show-ticket';
import { ConfirmationPage } from './components/confirmation-page/confirmation-page'
import { LoginPage } from './components/login-page/login-page';
import { AdminPage } from './components/admin-page/admin-page';
import { ConferencePage } from './components/conference-page/conference-page';
import { VenuePage } from './components/venue-page/venue-page';
import { AccountPage } from './components/account-page/account-page';
import { UserNav } from './components/user-nav/user-nav';
import { useAuthStore } from './store/auth';
import { useUserViewStore } from './store/user-view';


function App() {

  const ticketContext = useShowTicket();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);
  const view = useUserViewStore((s) => s.view);

  // Al cerrar sesión, también resetea el contexto del ticket
  useEffect(() => {
    if (!isAuthenticated && ticketContext.showTicket) {
      ticketContext.setShowTicket(false);
    }
  }, [isAuthenticated, ticketContext]);

  // Not authenticated → show login
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <main className='max-w-3xl mx-auto'>
          <LoginPage />
        </main>
      </MainLayout>
    );
  }

  // Admin → full width admin panel
  if (role === 'admin') {
    return (
      <MainLayout>
        <AdminPage />
      </MainLayout>
    );
  }

  // Regular user → navegación por vistas
  const renderUserView = () => {
    switch (view) {
      case 'conference':
        return <ConferencePage />;
      case 'venue':
        return <VenuePage />;
      case 'account':
        return <AccountPage />;
      case 'home':
      default:
        return ticketContext.showTicket ? <ConfirmationPage /> : <TicketFormPage />;
    }
  };

  return (
    <MainLayout>
      <main className='max-w-4xl mx-auto'>
        <UserNav />
        {renderUserView()}
      </main>
    </MainLayout>
  );
}

export default App
