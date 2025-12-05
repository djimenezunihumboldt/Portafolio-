// PWA Registration and Update Handler
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          `${import.meta.env.BASE_URL}sw.js`,
          { scope: import.meta.env.BASE_URL }
        );

        console.log('SW registered:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, show update notification
                showUpdateNotification(registration);
              }
            });
          }
        });

        // Handle controller change
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });

      } catch (error) {
        console.error('SW registration failed:', error);
      }
    });
  }
}

function showUpdateNotification(registration: ServiceWorkerRegistration) {
  // Create update notification
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-update-content">
      <span>🚀 Nueva versión disponible</span>
      <button id="pwa-update-btn">Actualizar</button>
      <button id="pwa-dismiss-btn">×</button>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .pwa-update-notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
    
    .pwa-update-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .pwa-update-content span {
      font-weight: 500;
    }
    
    #pwa-update-btn {
      background: white;
      color: #2563eb;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    #pwa-update-btn:hover {
      transform: scale(1.05);
    }
    
    #pwa-dismiss-btn {
      background: transparent;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    #pwa-dismiss-btn:hover {
      opacity: 1;
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Handle update button
  document.getElementById('pwa-update-btn')?.addEventListener('click', () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    notification.remove();
  });
  
  // Handle dismiss button
  document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
    notification.remove();
  });
}

// Check if app can be installed
export function setupInstallPrompt() {
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    
    // Show install button or notification
    showInstallButton(deferredPrompt);
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    console.log('PWA was installed');
  });
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function showInstallButton(deferredPrompt: BeforeInstallPromptEvent) {
  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return;
  }

  // Only show after user has been on page for 30 seconds
  setTimeout(() => {
    const installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.innerHTML = '📱 Instalar App';
    installBtn.className = 'pwa-install-button';
    
    const style = document.createElement('style');
    style.textContent = `
      .pwa-install-button {
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
        z-index: 1000;
        transition: all 0.3s;
        animation: pulse 2s infinite;
      }
      
      .pwa-install-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 30px rgba(245, 158, 11, 0.4);
      }
      
      @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3); }
        50% { box-shadow: 0 4px 30px rgba(245, 158, 11, 0.5); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(installBtn);
    
    installBtn.addEventListener('click', async () => {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        installBtn.remove();
      }
    });
    
    // Auto-hide after 30 seconds
    setTimeout(() => {
      installBtn.remove();
    }, 30000);
    
  }, 30000);
}

export default registerServiceWorker;
