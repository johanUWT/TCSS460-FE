// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BookRounded, Add } from '@mui/icons-material';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { BookRounded, PlusOne: Add };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-books',
  title: <FormattedMessage id="books" />,
  type: 'group',
  children: [
    {
      id: 'list-books',
      title: <FormattedMessage id="list-books" />,
      type: 'item',
      url: '/books',
      icon: icons.BookRounded
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