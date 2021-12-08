import Home from '../views/pages/home/home';
import Favorite from '../views/pages/favorite/favorite';
import UkbmDetail from '../views/pages/ukbm-detail/ukbm-detail';
import Ukbm from '../views/pages/ukbm/ukbm';
import Histori from '../views/pages/histori/histori';
import ChangePass from '../views/pages/change-pass/change-pass';
import Profil from '../views/pages/user-profile/user-profile';
import AccessLogin from '../views/pages/access-login/access-login';
import RegistrasiKrs from '../views/pages/registrasi-krs/registrasi-krs';
import UserProfileEdit from '../views/pages/user-profile-edit/user-profile-edit';
import Notif from '../views/pages/notif/notif';
import BeritaDetail from '../views/pages/berita-detail/berita-detail';
import NotifDetail from '../views/pages/notif-detail/notif-detail';

const Routes = {
  '/': Home,
  '/auth': AccessLogin,
  '/home': Home,
  '/fav': Favorite,
  '/histori': Histori,
  '/changepass': ChangePass,
  '/ukbm': Ukbm,
  '/profil': Profil,
  '/krs': RegistrasiKrs,
  '/detail/:id': UkbmDetail,
  '/penyesuaian/:id': UserProfileEdit,
  '/notif': Notif,
  '/beritadetail/:id': BeritaDetail,
  '/notifdetail/:id': NotifDetail,
};

export default Routes;
