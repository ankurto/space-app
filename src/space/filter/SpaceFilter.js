/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './SpaceFilter.css';

const initialState = {
  selectedYear: null,
  selectedLaunch: null,
  selectedLanding: null
};

const SpaceFilter = (props) => {
  const [years, setYears] = useState(null);
  const [filters, setFilters] = useState(initialState);

  const handleSelectedYear = (selectedYear) => {
    if (filters.selectedYear === selectedYear) {
      setFilters({ ...filters, selectedYear: null });
      props.handleFilter(null, filters.selectedLaunch, filters.selectedLanding);
      return;
    }
    setFilters({ ...filters, selectedYear });
    props.handleFilter(
      selectedYear,
      filters.selectedLaunch,
      filters.selectedLanding
    );
  };

  const handleLaunchType = (selectedLaunch) => {
    if (filters.selectedLaunch === selectedLaunch) {
      setFilters({ ...filters, selectedLaunch: null });
      props.handleFilter(filters.selectedYear, null, filters.selectedLanding);
      return;
    }
    setFilters({ ...filters, selectedLaunch });
    props.handleFilter(
      filters.selectedYear,
      selectedLaunch,
      filters.selectedLanding
    );
  };

  const handleLandingType = (selectedLanding) => {
    if (filters.selectedLanding === selectedLanding) {
      setFilters({ ...filters, selectedLanding: null });
      props.handleFilter(filters.selectedYear, filters.selectedLaunch, null);
      return;
    }
    setFilters({ ...filters, selectedLanding });
    props.handleFilter(
      filters.selectedYear,
      filters.selectedLaunch,
      selectedLanding
    );
  };

  useEffect(() => {
    const YEARS = [];
    for (let year = 2006; year <= 2020; year += 1) {
      YEARS.push(year);
    }
    setYears(YEARS);
  }, []);
  return (
    <div className='space-filter'>
      <div className='filter-heading'>Filters </div>
      <div className='sub-heading'>Launch Year </div>
      <div className='years-button'>
        {years
          && years.map((year) => {
            const active = year === filters.selectedYear ? 'active' : '';
            return (
              <button
                type='button'
                key={year}
                className={`btn-year ${active}`}
                onClick={() => handleSelectedYear(year)}
              >
                {year}
              </button>
            );
          })}
      </div>
      <div className='successful-launch'>
        <div className='sub-heading'>Successful Launch</div>
        <div className='years-button'>
          <button
            type='button'
            key={1}
            className={`btn-launch ${
              filters.selectedLaunch === true ? 'active' : ''
            }`}
            onClick={() => handleLaunchType(true)}
          >
            True
          </button>
          <button
            type='button'
            key={2}
            className={`btn-launch ${
              filters.selectedLaunch === false ? 'active' : ''
            }`}
            onClick={() => handleLaunchType(false)}
          >
            False
          </button>
        </div>
      </div>

      <div className='successful-landing'>
        <div className='sub-heading'>Successful Landing</div>
        <div className='years-button'>
          <button
            type='button'
            key={3}
            className={`btn-landing ${
              filters.selectedLanding === true ? 'active' : ''
            }`}
            onClick={() => handleLandingType(true)}
          >
            True
          </button>
          <button
            type='button'
            key={4}
            className={`btn-landing ${
              filters.selectedLanding === false ? 'active' : ''
            }`}
            onClick={() => handleLandingType(false)}
          >
            False
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceFilter;
