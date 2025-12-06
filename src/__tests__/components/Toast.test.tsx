import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from '../../components/Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders when visible', () => {
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={false}
        onClose={() => {}}
      />
    );

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByLabelText('Cerrar notificación');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-closes after duration', () => {
    const onClose = jest.fn();
    
    render(
      <Toast
        message="Test message"
        type="success"
        isVisible={true}
        onClose={onClose}
        duration={3000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders different types with correct styling', () => {
    const types = ['success', 'error', 'warning', 'info'] as const;
    
    types.forEach((type) => {
      const { unmount } = render(
        <Toast
          message={`${type} message`}
          type={type}
          isVisible={true}
          onClose={() => {}}
        />
      );

      expect(screen.getByText(`${type} message`)).toBeInTheDocument();
      unmount();
    });
  });
});
