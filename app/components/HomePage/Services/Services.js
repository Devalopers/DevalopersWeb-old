import React from 'react';
import ServiceItem from './ServiceItem';

function Services() {
  return (
    <section id="services" className="section-bg">
      <div className="container">
        <header className="section-header">
          <h3>Services</h3>
          <p>Our Provided Services</p>
        </header>

        <div className="row">
          <ServiceItem
            title="Service 1"
            description="Description for service 1"
            align="left"
          >
            <i className="ion-ios-analytics-outline" />
          </ServiceItem>
          <ServiceItem
            title="Service 2"
            description="Service 2 description"
            align="right"
          >
            <i className="ion-ios-albums-outline" />
          </ServiceItem>
        </div>
      </div>
    </section>
  );
}

export default Services;
