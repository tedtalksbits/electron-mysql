class Toast {
  constructor(container = document.body) {
    this.toastContainer = container;
  }

  async show(message, title = 'Success!', duration = 3000, type = 'success') {
    const toast = document.createElement('div');
    const typeColor = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    const typeIcon = {
      success: svgs.success,
      error: svgs.error,
      warning: svgs.warning,
      info: svgs.info,
    };
    const toastHTML = `
      <div class="alert alert-${typeColor[type]} fixed top-2 right-2 w-64 z-10">
        <div class="icon">
          ${typeIcon[type]}
        </div>
        <div>
          <div class="font-bold">${title}</div>
          <div class="message text-sm">${message}</div>
        </div>
        <div class="close-btn cursor-pointer">
          ${svgs.close}
        </div>
      </div>
    `;
    toast.innerHTML = toastHTML;
    this.toastContainer.appendChild(toast);
    const closeBtn = toast.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });
    await new Promise((resolve) => setTimeout(resolve, duration));
    toast.remove();
  }
}

const svgs = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>`,
};

module.exports = Toast;
