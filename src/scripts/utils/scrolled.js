const transparentAppbar = () => {
  // lakukan transparasi header jika scroll kebawah dimuali posisi scroll = 10
  const hashUrl = window.location.hash.substr(1);
  if (hashUrl === '/krs' || hashUrl === '/home' || hashUrl === '' || hashUrl === '/') {
    const appbar = document.querySelector('.appbar');
    if (document.querySelector('.scrolled') !== null) {
      appbar.classList.remove('scrolled');
    }
    if (window.scrollY > 10) {
      if (document.querySelector('.scrolled') === null) {
        appbar.classList.add('scrolled');
      }
    }
  }
};

export default transparentAppbar;
