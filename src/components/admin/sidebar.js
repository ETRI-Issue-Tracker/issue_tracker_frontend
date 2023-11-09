import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { color } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar width={'180px'} style={Style.Sidebar}>
      <Menu>
        <MenuItem
          style={
            location.search?.split('=')[1] === 'all'
              ? { backgroundColor: color.navyLight }
              : { backgroundColor: color.white }
          }
          onClick={() => navigate('/manage?filter=all')}
        >
          {'전체 컨텐츠'}
        </MenuItem>
        <MenuItem
          style={
            location.search?.split('=')[1] === 'block'
              ? { backgroundColor: color.navyLight }
              : { backgroundColor: color.white }
          }
          onClick={() => navigate('/manage?filter=block')}
        >
          {'유해 컨텐츠'}
        </MenuItem>
        <MenuItem
          style={
            location.search?.split('=')[1] === 'echo'
              ? { backgroundColor: color.navyLight }
              : { backgroundColor: color.white }
          }
          onClick={() => navigate('/manage?filter=echo')}
        >
          {'동조적 컨텐츠'}
        </MenuItem>
        <MenuItem
          style={
            location.search?.split('=')[1] === 'ban'
              ? { backgroundColor: color.navyLight }
              : { backgroundColor: color.white }
          }
          onClick={() => navigate('/manage?filter=ban')}
        >
          {'차단 컨텐츠'}
        </MenuItem>
        <MenuItem
          style={
            location.search?.split('=')[1] === 'analysis'
              ? { backgroundColor: color.navyLight }
              : { backgroundColor: color.white }
          }
          onClick={() => navigate('/manage?filter=analysis')}
        >
          {'컨텐츠 분석'}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

const Style = {
  Sidebar: {
    backgroundColor: color.white,
    marginLeft: '-24px',
    height: '100%',
    borderWidth: '2px',
  },
};
