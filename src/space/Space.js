import React, { useState, useEffect } from 'react';
import SpaceFilter from './filter/SpaceFilter';
import './Space.css';

const Space = () => {
  const [spacesData, setSpacesData] = useState([]);
  const getData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSpacesData(data));
  };

  const renderSpaceCard = (data) => {
    return (
      <div className='space-view'>
        {data &&
          data.map((data, index) => {
            return (
              <div
                className='space-program-name'
                key={data && data.launch_date_local}
              >
                <div className='space-img'>
                  <img src={data.links.mission_patch_small}></img>
                </div>

                <div className='space-card-details'>
                  <div className='mission-header'>
                    {`${data.mission_name} #${data.flight_number}`}{' '}
                  </div>
                  {data && data.mission_id && data.mission_id.length > 0 && (
                    <div className='mission-id'>
                      <span className='label'>Mission Id: </span>
                      {data.mission_id.map((id) => {
                        return <li>{id}</li>;
                      })}
                    </div>
                  )}
                  <div className='mission-name'>
                    <span className='label'>Launch Year: </span>
                    <span className='val'>{`${data.launch_year}`}</span>
                  </div>
                  <div className='mission-name'>
                    <span className='label'>Sucessful Launch: </span>
                    <span className='val'>{`${data.launch_success}`}</span>
                  </div>
                  <div className='mission-name'>
                    <span className='label'>Sucessful Landing: </span>
                    <span className='val'>{`${data.mission_name}`}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const handleFilter = (year, selectedLaunch, selectedLanding) => {
    let url = 'https://api.spacexdata.com/v3/launches?limit=100';

    if (year !== null) url = url + `&launch_year=${year}`;
    if (selectedLaunch !== null)
      url = url + `&launch_success=${selectedLaunch}`;
    if (selectedLanding !== null)
      url = url + `&land_success=${selectedLanding}`;

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
