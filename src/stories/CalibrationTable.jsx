import React from 'react';
import PropTypes from 'prop-types';
import './calibrationtable.css';

const CalibrationTable = ({
  columns = [],
  data = [],
  onAction = () => {},
  className = '',
  gridTemplate = '',
}) => {
  // Generate CSS Grid template from columns if not provided
  const gridTemplateColumns = gridTemplate || 
    columns.map(col => col.width || '1fr').join(' ');

  // Render cell content based on column configuration
  const renderCellContent = (column, rowData, rowIndex) => {
    if (column.render) {
      return column.render(rowData, rowIndex, onAction);
    }
    
    if (column.key) {
      return rowData[column.key];
    }
    
    return '';
  };

  return (
    <div className={`calibration-table ${className}`}>
      <div 
        className="table-grid"
        style={{ gridTemplateColumns }}
      >
        {/* Header Row */}
        {columns.map((column, index) => (
          <div key={index} className="header">
            {column.title || ''}
          </div>
        ))}
        
        {/* Data Rows */}
        {data.map((rowData, rowIndex) => 
          columns.map((column, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`cell ${column.className || ''}`}
            >
              {renderCellContent(column, rowData, rowIndex)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Common cell renderers for reuse
CalibrationTable.CellRenderers = {
  // Action button renderer
  ActionButton: (label, onClick, disabled = false) => (rowData, rowIndex, onAction) => (
    <button 
      className="action-button"
      disabled={disabled}
      onClick={() => onAction(onClick, rowData, rowIndex)}
    >
      {label}
    </button>
  ),

  // Toggle switch renderer
  ToggleSwitch: (checkedLabel, uncheckedLabel, valueKey, onChangeKey) => (rowData, rowIndex, onAction) => (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={rowData[valueKey] || false}
        onChange={(e) => onAction(onChangeKey, rowData, rowIndex, e.target.checked)}
      />
      <span className="slider">
        <span className="switch-label">
          {rowData[valueKey] ? checkedLabel : uncheckedLabel}
        </span>
      </span>
    </label>
  ),

  // Calculated value renderer with precision
  CalculatedValue: (calculation, precision = 2) => (rowData) => {
    try {
      const result = calculation(rowData);
      return typeof result === 'number' ? result.toFixed(precision) : result || '';
    } catch (error) {
      return '';
    }
  },

  // Simple text with formatting
  FormattedText: (format) => (rowData, rowIndex) => {
    return format(rowData, rowIndex);
  }
};

CalibrationTable.propTypes = {
  /** Array of column configuration objects */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Column header title */
    title: PropTypes.string,
    /** Data key to extract from row data */
    key: PropTypes.string,
    /** Custom cell renderer function */
    render: PropTypes.func,
    /** CSS class for the column */
    className: PropTypes.string,
    /** CSS width value for the column */
    width: PropTypes.string,
  })).isRequired,
  /** Array of data objects for table rows */
  data: PropTypes.array.isRequired,
  /** Callback for handling actions from interactive cells */
  onAction: PropTypes.func,
  /** Additional CSS class for the table */
  className: PropTypes.string,
  /** Custom CSS Grid template columns override */
  gridTemplate: PropTypes.string,
};

export default CalibrationTable;