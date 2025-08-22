import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './sidemenu.css';


const SideMenu = ({
  model = 'PM1',
  partNumber = 'OPM-1001', 
  advancedMode = false,
  currentPath = '/',
  onNavigate = () => {},
  extendedMenuItems = [],
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Base menu items structure
  const baseMenuItems = [
    {
      order: 2,
      advanced: true,
      key: 'system',
      title: 'SYSTEM',
      children: [
        {
          order: 2,
          advanced: true,
          path: '/system/debug-log',
          label: 'Debug Log',
        }
      ]
    },
    {
      order: 2.1,
      advanced: true,
      key: 'systemConfig',
      path: '/configuration/system-configuration',
      label: 'Configuration',
    },
    {
      order: 2.4,
      advanced: true,
      key: 'calibration',
      title: 'CALIBRATION',
      children: [
        {
          order: 5,
          advanced: false,
          path: '/settings/upload-calibration-report',
          label: 'Upload Report',
        }
      ]
    },
    {
      order: 4.4,
      advanced: false,
      key: 'upgrade',
      path: '/settings/upgrade',
      label: 'Upgrade',
    },
    {
      order: 5,
      advanced: false,
      key: 'network',
      path: '/settings/network',
      label: 'Network Settings',
    },
    {
      order: 6,
      advanced: false,
      path: '/about',
      label: 'About',
    }
  ];

  // Default extended menu items for PM1
  const defaultExtendedItems = [
    {
      order: 1,
      advanced: false,
      path: '/',
      label: 'Dashboard',
    },
    {
      order: 2.3,
      advanced: true,
      path: '/detectors',
      label: 'Detectors',
    },
    {
      order: 2.4,
      advanced: true,
      key: 'calibration',
      title: 'CALIBRATION',
      children: [
        {
          order: 1,
          advanced: true,
          path: '/settings/rd-calibration',
          label: 'RD Calibration',
        },
        {
          order: 2,
          advanced: true,
          path: '/settings/gain-settings',
          label: 'Gain Settings',
        },
      ]
    }
  ];

  // Merge menus function
  const mergeMenus = (menuA, menuB) => {
    const menu = [];
    const index = {};

    menuA.forEach((v) => {
      if (v.path) {
        menu.push(v);
        return;
      }
      if (v.children && v.key) {
        index[v.key] = { ...v };
      }
    });

    menuB.forEach((v) => {
      if (v.path) {
        menu.push(v);
        return;
      }
      if (v.children && v.key) {
        if (v.key in index) {
          index[v.key].children = mergeMenus(index[v.key].children, v.children);
          if (v.order !== undefined) index[v.key].order = v.order;
          if (v.advanced !== undefined) index[v.key].advanced = v.advanced;
          if (v.title !== undefined) index[v.key].title = v.title;
          return;
        }
        menu.push(v);
      }
    });

    return menu.concat(Object.values(index));
  };

  // Build menu function
  const buildMenu = (menuData, advancedMode) => {
    const menu = [];
    const orderedData = menuData.sort((a, b) => {
      if (a.order === b.order) return 0;
      return a.order > b.order ? 1 : -1;
    });

    orderedData.forEach((item) => {
      if (item.advanced && !advancedMode) return;
      
      if (item.path) {
        menu.push(item);
      } else if (item.children) {
        const submenuItems = buildMenu(item.children, advancedMode);
        if (submenuItems.length > 0) {
          menu.push({
            ...item,
            children: submenuItems
          });
        }
      }
    });

    return menu;
  };

  // Generate final menu
  const finalMenu = useMemo(() => {
    const combinedMenu = mergeMenus(baseMenuItems, extendedMenuItems.length > 0 ? extendedMenuItems : defaultExtendedItems);
    return buildMenu(combinedMenu, advancedMode);
  }, [baseMenuItems, extendedMenuItems, defaultExtendedItems, advancedMode]);

  // Get device image based on model
  const getDeviceImage = (modelType) => {
    const modelMap = {
      'RL1': '/images/RLM.webp',
      'RLM': '/images/RLM.webp',
      'PT1': '/images/PTM.webp',
      'PTM': '/images/PTM.webp',
      'SX1': '/images/OSX.webp',
      'OSX': '/images/OSX.webp',
      'BR1': '/images/BRM.webp',
      'BRM': '/images/BRM.webp',
      'OA1': '/images/OVA.webp',
      'OVA': '/images/OVA.webp',
      'OB1': '/images/OVB.webp',
      'OVB': '/images/OVB.webp',
      'PDL1': '/images/PLM.webp',
      'PLM': '/images/PLM.webp',
      'PEM400': '/images/PEM.webp',
      'PEM': '/images/PEM.webp',
      'MBR1': '/images/BRM.webp',
      'PM1': '/images/OPM.webp',
      'OPM': '/images/OPM.webp',
      'XCS': '/images/XCS.webp',
    };
    
    return modelMap[modelType] || null;
  };

  const handleItemClick = (path) => {
    onNavigate(path);
  };

  const renderMenuItem = (item, level = 0) => {
    const isActive = currentPath === item.path;
    const hasChildren = item.children && item.children.length > 0;
    
    if (hasChildren) {
      return (
        <div key={item.key} className="menu-submenu">
          <div className="menu-submenu-title">
            <span>{item.title}</span>
          </div>
          <div className="menu-submenu-children">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </div>
        </div>
      );
    }

    return (
      <div
        key={item.path}
        className={`menu-item ${isActive ? 'menu-item-selected' : ''}`}
        onClick={() => handleItemClick(item.path)}
        style={{ paddingLeft: `${20 + (level * 16)}px` }}
      >
        <span>{item.label}</span>
      </div>
    );
  };

  return (
    <div className="sidemenu">
      <div className="logo">
        <div className="device-title">
          {getDeviceImage(model) ? (
            <img src={getDeviceImage(model)} alt={model} />
          ) : (
            <div className="model-text">{model}</div>
          )}
        </div>
      </div>
      
      <div className="menu-container">
        {finalMenu.map(item => renderMenuItem(item))}
      </div>
      
      <div className="jgr-logo">
        <a href="https://inst.santec.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/santec_logo_stacked_white.webp" alt="Santec logo" />
        </a>
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  /** Device model type (determines the logo displayed) */
  model: PropTypes.oneOf(['PM1', 'OPM', 'RLM', 'RL1', 'PTM', 'PT1', 'OSX', 'SX1', 'BRM', 'BR1', 'OVA', 'OA1', 'OVB', 'OB1', 'PLM', 'PDL1', 'PEM', 'PEM400', 'MBR1', 'XCS']),
  /** Device part number displayed in the title */
  partNumber: PropTypes.string,
  /** Toggle to show/hide advanced menu items */
  advancedMode: PropTypes.bool,
  /** Currently active page path for highlighting */
  currentPath: PropTypes.string,
  /** Callback function called when a menu item is clicked */
  onNavigate: PropTypes.func,
  /** Extended menu items to merge with base menu */
  extendedMenuItems: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.number,
    advanced: PropTypes.bool,
    key: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
  })),
};

export default SideMenu;