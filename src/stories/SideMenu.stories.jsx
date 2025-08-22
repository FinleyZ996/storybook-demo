import React from 'react';
import SideMenu from './SideMenu';

export default {
  title: 'Example/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  argTypes: {
    model: {
      control: 'select',
      options: ['PM1', 'OPM', 'RLM', 'RL1', 'PTM', 'PT1', 'OSX', 'SX1', 'BRM', 'BR1', 'OVA', 'OA1', 'OVB', 'OB1', 'PLM', 'PDL1', 'PEM', 'PEM400', 'MBR1', 'XCS'],
      description: 'Device model type that determines the logo displayed',
    },
    partNumber: {
      control: 'text',
      description: 'Device part number displayed in the title',
    },
    advancedMode: {
      control: 'boolean',
      description: 'Toggle to show/hide advanced menu items',
    },
    currentPath: {
      control: 'text',
      description: 'Currently active page path for highlighting',
    },
    onNavigate: {
      action: 'navigate',
      description: 'Callback function called when a menu item is clicked',
    },
    extendedMenuItems: {
      control: 'object',
      description: 'Additional menu items to merge with base menu',
      defaultValue: [
        {
          order: 1,
          advanced: false,
          path: '/',
          label: 'Dashboard',
        },
        {
          order: 1.5,
          advanced: false,
          path: '/custom-feature',
          label: 'Custom Feature',
        },
        {
          order: 2.5,
          advanced: true,
          key: 'customCalibration',
          title: 'CUSTOM CALIBRATION',
          children: [
            {
              order: 1,
              advanced: true,
              path: '/custom/calibration-wizard',
              label: 'Calibration Wizard',
            }
          ]
        }
      ],
      table: {
        type: { 
          summary: 'MenuItem[]',
          detail: `Array of menu item objects with structure:
{
  order: number,        // Position in menu (decimal allowed: 1, 1.5, 2, etc.)
  advanced: boolean,    // Show only in advanced mode
  path?: string,        // Navigation path (for menu items)
  label?: string,       // Display text (for menu items)
  key?: string,         // Unique identifier (for submenus)
  title?: string,       // Display title (for submenus)
  children?: MenuItem[] // Nested menu items (for submenus)
}`
        }
      }
    },
  },
};



// Custom extended menu items
export const CustomMenuItems = {
  args: {
    model: 'PM1',
    partNumber: 'OPM-1001-Custom',
    advancedMode: true,
    currentPath: '/custom-feature',
    extendedMenuItems: [
      {
        order: 1,
        advanced: false,
        path: '/',
        label: 'Dashboard',
      },
      {
        order: 1.5,
        advanced: false,
        path: '/custom-feature',
        label: 'Custom Feature',
      },
      {
        order: 2.2,
        advanced: true,
        path: '/advanced-diagnostics',
        label: 'Advanced Diagnostics',
      },
      {
        order: 2.5,
        advanced: true,
        key: 'customCalibration',
        title: 'CUSTOM CALIBRATION',
        children: [
          {
            order: 1,
            advanced: true,
            path: '/custom/calibration-wizard',
            label: 'Calibration Wizard',
          },
          {
            order: 2,
            advanced: true,
            path: '/custom/validation',
            label: 'Validation Suite',
          },
        ]
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'SideMenu with custom extended menu items, demonstrating how to add additional navigation options.',
      },
    },
  },
};

// Advanced mode enabled
export const AdvancedMode = {
  args: {
    model: 'PM1',
    partNumber: 'OPM-1001',
    advancedMode: true,
    currentPath: '/detectors',
  },
  parameters: {
    docs: {
      description: {
        story: 'SideMenu with advanced mode enabled, showing additional menu items like Detectors and calibration options.',
      },
    },
  },
};

// Different device models
export const RLMModel = {
  args: {
    model: 'RLM',
    partNumber: 'RLM-2001',
    advancedMode: true,
    currentPath: '/settings/network',
  },
  parameters: {
    docs: {
      description: {
        story: 'SideMenu configured for RLM (Return Loss Meter) device model.',
      },
    },
  },
};

export const PTMModel = {
  args: {
    model: 'PTM',
    partNumber: 'PTM-3001',
    advancedMode: false,
    currentPath: '/about',
  },
  parameters: {
    docs: {
      description: {
        story: 'SideMenu configured for PTM (Power and Temperature Meter) device model.',
      },
    },
  },
};

export const OSXModel = {
  args: {
    model: 'OSX',
    partNumber: 'OSX-4001',
    advancedMode: true,
    currentPath: '/configuration/system-configuration',
  },
  parameters: {
    docs: {
      description: {
        story: 'SideMenu configured for OSX (Optical Spectrum Analyzer) device model.',
      },
    },
  },
};


// All menu items visible (for design review)
export const FullMenu = {
  args: {
    model: 'PM1',
    partNumber: 'OPM-1001-Full',
    advancedMode: true,
    currentPath: '/settings/rd-calibration',
  },
  parameters: {
    docs: {
      description: {
        story: 'SideMenu with all menu items visible for complete design review.',
      },
    },
  },
};

// Navigation interaction example
export const InteractiveNavigation = {
  args: {
    model: 'PM1',
    partNumber: 'OPM-1001',
    advancedMode: true,
    currentPath: '/',
    onNavigate: (path) => {
      // This will show in the Actions panel
      console.log('Navigating to:', path);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive SideMenu that demonstrates navigation callbacks. Click any menu item to see the navigation action in the Actions panel.',
      },
    },
  },
};