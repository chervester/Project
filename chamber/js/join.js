document.addEventListener('DOMContentLoaded', () => {
  // Timestamp
  document.getElementById('timestamp').value = new Date().toISOString();
  
  // Modal handlers
  window.openModal = id => document.getElementById(id)?.showModal();
  window.closeModal = id => document.getElementById(id)?.close();
});
