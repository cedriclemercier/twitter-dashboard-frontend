// component
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import UserTweets from '../../../pages/UserTweets';
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 35,
  height: 35,
}));

const removeEmojis = (text) => {
  if (!text) {
    return '';
  }
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ''
  );
};


const getNavConfig = (followedAccounts) => {
  let config
  if (!followedAccounts || followedAccounts.length !== 0) {
    config = {
      title: '',
      path: '/',
      icon: <StyledAvatar />
    }
  }
  config = followedAccounts.map((el) => ({
    title: removeEmojis(el.name),
    path: `/dashboard/app/${el.username}`,
    icon: <StyledAvatar alt={el.username} src={el.profile_image_url}/>,
  }));

  return config;
};

export default getNavConfig;
