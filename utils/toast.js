class Toast {
  constructor() {
    this.toastContainer = document.body;
  }

  async show(message, title = 'Success!', duration = 3000, type = 'success') {
    const toast = document.createElement('div');
    const typeColor = {
      success: 'green',
      error: 'red',
      warning: 'orange',
      info: 'blue',
    };
    const toastHTML = `
      <div class="toast bg-${
        typeColor[type] || 'gray'
      }-500 bg-opacity-25 ring-1 ring-opacity-40 ring-${
      typeColor[type] || 'gray'
    }-500 text-white p-4 rounded shadow-lg mb-2 w-60 fixed top-2 right-2 backdrop-blur-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="icon">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="title txt-sm font-medium">${title}</div>
          </div>
          <div class="close-btn">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="message text-sm">${message}</div>
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

module.exports = Toast;
