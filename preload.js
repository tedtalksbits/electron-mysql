/*
  A preload script runs before the renderer process is loaded, and has access to both renderer globals (e.g. window and document)
  and a Node.js environment.

*/

window.addEventListener('DOMContentLoaded', () => {
  const node_version = document.getElementById('node_version');
  node_version && (node_version.innerText = process.versions['node']);
});
