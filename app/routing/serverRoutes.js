import Base        from '../containers/Base.js';
import Home        from '../components/home';
import Page1       from '../components/page1';

const routes = [
  {
    component: Base,
    routes: [
      {
        path        : '/',
        exact       : true,
        component   : Home,
      },
      {
        path        : '/Page1',
        component   : Page1,
      },
    ],
  },
];

export default routes;
