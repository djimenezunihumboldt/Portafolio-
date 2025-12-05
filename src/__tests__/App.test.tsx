import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import App from '../App';

// Wrapper para providers
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </LanguageProvider>
);

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (window.sessionStorage.getItem as jest.Mock).mockReturnValue('true'); // Skip preloader
  });

  it('renders without crashing', () => {
    render(<App />, { wrapper: AllProviders });
    expect(document.body).toBeInTheDocument();
  });

  it('renders main sections', () => {
    render(<App />, { wrapper: AllProviders });
    
    // Check for main content areas
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows scroll to top button after scrolling', () => {
    render(<App />, { wrapper: AllProviders });
    
    const scrollButton = screen.getByLabelText('Volver arriba');
    expect(scrollButton).toBeInTheDocument();
  });
});
