// third-party
import { FormattedMessage } from 'react-intl';

// assets
import QuestionOutlined from '@ant-design/icons/QuestionOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  QuestionOutlined,
  StopOutlined,
  PhoneOutlined,
  FullscreenOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'disabled-menu',
      title: <FormattedMessage id="disabled-menu" />,
      type: 'item',
      url: '#',
      icon: icons.StopOutlined,
      disabled: true
    },
    {
      id: 'full-page',
      title: <FormattedMessage id="full-page" />,
      type: 'item',
      url: '/full-page',
      icon: icons.FullscreenOutlined
    },
    {
      id: 'documentation',
      title: <FormattedMessage id="documentation" />,
      type: 'item',
      url: 'https://uwt-set-tcss460-lecture-materials.github.io/TCSS460-phase-2/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default other;
