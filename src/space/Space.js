/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import SpaceFilter from './filter/SpaceFilter';
import './Space.css';

const Space = () => {
  const [spacesData, setSpacesData] = useState([]);
  const [landingButton, setLandingButton] = useState(null);
  const getData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSpacesData(data));
  };

  const renderSpaceCard = (data) => (
    <div className='space-view'>
      {data
        && data.map((card) => {
          const landingSuccess = card
            && card.rocket
            && card.rocket.first_stage
            && card.rocket.first_stage.cores[0]
            && card.rocket.first_stage.cores[0].land_success;

          const cardDetails = (
            <div
              className='space-program-name'
              key={card && card.launch_date_local}
            >
              <div className='space-img'>
                <img src={card.links.mission_patch_small} alt='not loading' />
              </div>

              <div className='space-card-details'>
                <div className='mission-header'>
                  {`${card.mission_name} #${card.flight_number}`}
                  {' '}
                </div>
                {card && card.mission_id && card.mission_id.length > 0 && (
                  <div className='mission-id'>
                    <span className='label'>Mission Id: </span>
                    {card.mission_id.map((id) => (
                      <li key={id}>{id}</li>
                    ))}
                  </div>
                )}
                <div className='mission-name'>
                  <span className='label'>Launch Year: </span>
                  <span className='val'>{`${card.launch_year}`}</span>
                </div>
                <div className='mission-name'>
                  <span className='label'>Sucessful Launch: </span>
                  <span className='val'>{`${card.launch_success}`}</span>
                </div>
                <div className='mission-name'>
                  <span className='label'>Sucessful Landing: </span>
                  <span className='val'>{`${landingSuccess}`}</span>
                </div>
              </div>
            </div>
          );
          return (landingButton !== null ? (landingSuccess !== null ? '' : cardDetails) : cardDetails);
        })}
    </div>
  );

  const handleFilter = (year, selectedLaunch, selectedLanding) => {
    setLandingButton(landingButton);
    let url = 'https://api.spacexdata.com/v3/launches?limit=100';

    if (year !== null) url += `&launch_year=${year}`;
    if (selectedLaunch !== null) url = `${url}&launch_success=${selectedLaunch}`;
    if (selectedLanding !== null) url = `${url}&land_success=${selectedLanding}`;

    getData(url);
  };

  useEffect(() => {
    getData('https://api.spacexdata.com/v3/launches?limit=100');
  }, []);

  return (
    <div className='container'>
      <SpaceFilter handleFilter={handleFilter} />
      {spacesData && renderSpaceCard(spacesData)}
    </div>
  );
};

export default Space;
