import React from 'react';
import CalibrationTable from './CalibrationTable';

export default {
  title: 'Example/CalibrationTable',
  component: CalibrationTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Array of column configuration objects',
      table: {
        type: { 
          summary: 'Column[]',
          detail: `Array of column objects with structure:
{
  title: string,       // Column header text
  key?: string,        // Data property key
  render?: function,   // Custom cell renderer
  className?: string,  // CSS class for column
  width?: string       // CSS width value
}`
        }
      }
    },
    data: {
      control: 'object',
      description: 'Array of data objects for table rows',
      table: {
        type: { summary: 'object[]' }
      }
    },
    onAction: {
      action: 'table-action',
      description: 'Callback for handling actions from interactive cells',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class for the table',
    },
    gridTemplate: {
      control: 'text',
      description: 'Custom CSS Grid template columns override',
    },
  },
};

// Sample laser data matching the original BR calibration
const sampleLaserData = [
  { 
    laserIndex: 0, 
    wavelength: 1310, 
    br0: 12.34, 
    pExtFactory: 10.12, 
    selected: false,
    step2Complete: true 
  },
  { 
    laserIndex: 1, 
    wavelength: 1550, 
    br0: 15.67, 
    pExtFactory: 13.45, 
    selected: true,
    step2Complete: true 
  },
  { 
    laserIndex: 2, 
    wavelength: 1625, 
    br0: 18.90, 
    pExtFactory: 16.78, 
    selected: false,
    step2Complete: false 
  },
];

// Original BR Calibration Table Recreation
export const BRCalibrationTable = {
  args: {
    columns: [
      { title: '', width: '120px' }, // Action column
      { title: 'Laser Index', width: '100px', className: 'laser-index' },
      { title: 'Wavelength (nm)', width: '120px', className: 'wavelength' },
      { title: 'Raw BR0 Factory - EXT Power', width: '200px', className: 'calculated' },
      { title: '', width: '120px' }, // Switch column
    ],
    data: sampleLaserData,
    gridTemplate: '120px 100px 120px 200px 120px',
  },
};

// Complete BR Calibration with all functionality
export const CompleteBRCalibration = {
  args: {
    columns: [
      { 
        title: '', 
        width: '120px',
        render: CalibrationTable.CellRenderers.ActionButton(
          'Read',
          'readBr0',
          false
        )
      },
      { 
        title: 'Laser Index', 
        width: '100px', 
        className: 'laser-index',
        render: (rowData) => `L${rowData.laserIndex}`
      },
      { 
        title: 'Wavelength (nm)', 
        width: '120px', 
        className: 'wavelength',
        key: 'wavelength'
      },
      { 
        title: 'Raw BR0 Factory - EXT Power', 
        width: '200px', 
        className: 'calculated',
        render: CalibrationTable.CellRenderers.CalculatedValue(
          (rowData) => rowData.br0 - rowData.pExtFactory,
          2
        )
      },
      { 
        title: '', 
        width: '120px',
        render: CalibrationTable.CellRenderers.ToggleSwitch(
          'ON',
          'OFF',
          'selected',
          'toggleLaser'
        )
      },
    ],
    data: sampleLaserData,
    gridTemplate: '120px 100px 120px 200px 120px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete recreation of the original BR calibration table with all interactive functionality including read buttons and laser on/off switches.',
      },
    },
  },
};

// Flexible Configuration Example
export const FlexibleConfiguration = {
  args: {
    columns: [
      { title: 'Device', key: 'device', width: '120px' },
      { title: 'Model', key: 'model', width: '80px' },
      { title: 'Status', width: '100px', render: (row) => 
        <span style={{ 
          color: row.status === 'active' ? '#52c41a' : '#ff4d4f',
          fontWeight: 'bold'
        }}>
          {row.status.toUpperCase()}
        </span>
      },
      { 
        title: 'Action', 
        width: '100px',
        render: CalibrationTable.CellRenderers.ActionButton(
          'Test',
          'testDevice',
          false
        )
      },
    ],
    data: [
      { device: 'PM-001', model: 'PM1', status: 'active' },
      { device: 'RL-002', model: 'RLM', status: 'inactive' },
      { device: 'PT-003', model: 'PTM', status: 'active' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how the table can be configured for different use cases beyond calibration.',
      },
    },
  },
};

// Measurement Data Table
export const MeasurementDataTable = {
  args: {
    columns: [
      { title: 'Measurement', key: 'measurement', width: '150px' },
      { title: 'Value', width: '100px', className: 'calculated', key: 'value' },
      { title: 'Unit', key: 'unit', width: '80px' },
      { title: 'Status', width: '100px', render: (row) => 
        <span className={`cell ${row.status === 'pass' ? 'success' : 'error'}`}>
          {row.status.toUpperCase()}
        </span>
      },
      { 
        title: 'Retest', 
        width: '100px',
        render: CalibrationTable.CellRenderers.ActionButton(
          'Retest',
          'retestMeasurement',
          false
        )
      },
    ],
    data: [
      { measurement: 'Power Level', value: '-23.45', unit: 'dBm', status: 'pass' },
      { measurement: 'Return Loss', value: '45.67', unit: 'dB', status: 'pass' },
      { measurement: 'Insertion Loss', value: '12.34', unit: 'dB', status: 'fail' },
      { measurement: 'Wavelength', value: '1550.12', unit: 'nm', status: 'pass' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Table configured for displaying measurement data with pass/fail status indicators.',
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo = {
  args: {
    columns: [
      { 
        title: 'Control', 
        width: '120px',
        render: CalibrationTable.CellRenderers.ActionButton(
          'Start',
          'startProcess',
          false
        )
      },
      { title: 'Process', key: 'process', width: '150px' },
      { title: 'Progress', key: 'progress', width: '100px' },
      { 
        title: 'Enable', 
        width: '100px',
        render: CalibrationTable.CellRenderers.ToggleSwitch(
          'ON',
          'OFF',
          'enabled',
          'toggleProcess'
        )
      },
    ],
    data: [
      { process: 'Calibration', progress: '75%', enabled: true },
      { process: 'Validation', progress: '0%', enabled: false },
      { process: 'Testing', progress: '100%', enabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive table demonstration. Use the Actions panel to see callbacks when buttons are clicked or switches are toggled.',
      },
    },
  },
};