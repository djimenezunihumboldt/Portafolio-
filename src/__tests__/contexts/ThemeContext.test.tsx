import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

// Test component that uses the theme context
const TestComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('dark');
  });

  it('provides default light theme', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  it('toggles theme correctly', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    
    // Initial state is light
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    // Click to toggle to dark
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Click to toggle back to light
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme preference to localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);
    
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('loads saved theme from localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
    
    consoleSpy.mockRestore();
  });
});
