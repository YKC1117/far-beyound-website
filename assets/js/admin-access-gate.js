(()=>{
  // Transitional mode: keep the legacy shared publish-password workflow active.
  // Owner / personal-account enforcement is intentionally disabled until the company
  // explicitly decides to migrate the admin login model.
  if(document.body?.dataset?.page!=='admin'||window.__fbAdminAccessGate)return;
  window.__fbAdminAccessGate=true;
  document.body.classList.remove('admin-login-locked');
})();
