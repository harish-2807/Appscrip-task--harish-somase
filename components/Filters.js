import React, { useState } from 'react';

const Filters = ({ onFilterChange, isVisible, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    customizable: false,
    idealFor: false,
    occasion: false,
    work: false,
    fabric: false,
    segment: false,
    suitableFor: false,
    rawMaterials: false,
    pattern: false
  });

  const [selectedFilters, setSelectedFilters] = useState({});

  const filterSections = [
    {
      id: 'customizable',
      title: 'CUSTOMIZABLE',
      options: ['Yes', 'No']
    },
    {
      id: 'idealFor',
      title: 'IDEAL FOR',
      options: ['Men', 'Women', 'Kids', 'Unisex']
    },
    {
      id: 'occasion',
      title: 'OCCASION',
      options: ['Casual', 'Formal', 'Party', 'Work', 'Sports']
    },
    {
      id: 'work',
      title: 'WORK',
      options: ['Office', 'Remote', 'Field', 'Workshop']
    },
    {
      id: 'fabric',
      title: 'FABRIC',
      options: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim']
    },
    {
      id: 'segment',
      title: 'SEGMENT',
      options: ['Premium', 'Standard', 'Budget', 'Luxury']
    },
    {
      id: 'suitableFor',
      title: 'SUITABLE FOR',
      options: ['Summer', 'Winter', 'All Season', 'Rainy']
    },
    {
      id: 'rawMaterials',
      title: 'RAW MATERIALS',
      options: ['Organic', 'Synthetic', 'Natural', 'Recycled']
    },
    {
      id: 'pattern',
      title: 'PATTERN',
      options: ['Solid', 'Striped', 'Checked', 'Printed', 'Embroidered']
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleCheckboxChange = (sectionId, option) => {
    const newFilters = { ...selectedFilters };
    
    if (!newFilters[sectionId]) {
      newFilters[sectionId] = [];
    }
    
    const index = newFilters[sectionId].indexOf(option);
    if (index > -1) {
      newFilters[sectionId].splice(index, 1);
    } else {
      newFilters[sectionId].push(option);
    }
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className={`filters ${isVisible ? 'visible' : ''}`}>
      <div className="filters-header">
        <div className="filters-header-content">
          <h2 className="filters-title">Filters</h2>
          <button className="filters-close-btn d-md-none" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="filters-content">
        {filterSections.map((section) => (
          <div key={section.id} className="filter-section">
            <button
              className="filter-section-header"
              onClick={() => toggleSection(section.id)}
              aria-expanded={expandedSections[section.id]}
            >
              <span className="filter-section-title">{section.title}</span>
              <svg
                className={`filter-chevron ${expandedSections[section.id] ? 'expanded' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {expandedSections[section.id] && (
              <div className="filter-section-content">
                <ul className="filter-options">
                  {section.options.map((option) => (
                    <li key={option} className="filter-option">
                      <label className="filter-label">
                        <input
                          type="checkbox"
                          className="filter-checkbox"
                          checked={selectedFilters[section.id]?.includes(option) || false}
                          onChange={() => handleCheckboxChange(section.id, option)}
                        />
                        <span className="filter-text">{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Filters;
