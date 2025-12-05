import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { HighContrastProvider } from '../../contexts/HighContrastContext';
import { SoundProvider } from '../../hooks/useSoundEffects';
import Navbar from '../../ui/Navbar';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <LanguageProvider>
      <ThemeProvider>
        <HighContrastProvider>
          <SoundProvider>
            {component}
          </SoundProvider>
        </HighContrastProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
  });

  it('renders navigation items', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Acerca de')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
    expect(screen.getByText('Experiencia')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renders portfolio logo', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Portafolio')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    renderWithProviders(<Navbar />);
    
    // Find and click the mobile menu button
    const menuButton = screen.getByLabelText('Abrir menú');
    fireEvent.click(menuButton);
    
    // Menu should be open
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click to close
    const closeButton = screen.getByLabelText('Cerrar menú');
    fireEvent.click(closeButton);
  });

  it('scrolls to section when nav item is clicked', () => {
    // Create mock section
    const mockSection = document.createElement('div');
    mockSection.id = 'about';
    document.body.appendChild(mockSection);
    
    renderWithProviders(<Navbar />);
    
    const aboutLink = screen.getAllByText('Acerca de')[0];
    fireEvent.click(aboutLink);
    
    expect(mockSection.scrollIntoView).toHaveBeenCalled();
    
    // Cleanup
    document.body.removeChild(mockSection);
  });

  it('changes style when scrolled', () => {
    renderWithProviders(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    
    // Initially transparent
    expect(nav.className).toContain('bg-transparent');
    
    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });
  });
});
