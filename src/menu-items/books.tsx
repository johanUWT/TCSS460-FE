// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BookRounded, BookOutlined, Add } from '@mui/icons-material';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { BookRounded, BookOutlined, PlusOne: Add };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-books',
  title: <FormattedMessage id="books" />,
  type: 'group',
  children: [
    {
      id: 'search-books',
      title: <FormattedMessage id="search-books" />,
      type: 'item',
      url: '/books',
      icon: icons.BookRounded
    },
    {
      id: 'list-books',
      title: <FormattedMessage id="list-books" />,
      type: 'item',
      url: '/books/all',
      icon: icons.BookOutlined
    },
    {
      id: 'create-book',
      title: <FormattedMessage id="create-book" />,
      type: 'item',
      url: '/create',
      icon: icons.PlusOne
    }
  ]
};

export default pages;
