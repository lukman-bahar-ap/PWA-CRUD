const DrawerInitiator = {
  init({
    open, close, drawer, otherMenu, content,
  }) {
    open.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    close.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    otherMenu.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
