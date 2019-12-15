import React from 'react';
import aboutImage from '../img/about-img.svg';
import aboutImage1 from '../img/about-extra-1.svg';
import aboutImage2 from '../img/about-extra-2.svg';
import AboutUsSection from './AboutUsSection';
import ListItem from './ListItem';

function AboutUs() {
  return (
    <section id="about">
      <div className="container">
        <header className="section-header">
          <h3>About Us</h3>
          <p>
            Our mission is to help developers find jobs and freelance projects.
            <br />
            and companies to find employees and freelancers in the MENA region.
          </p>
        </header>
        <AboutUsSection
          title="Are you a Developer searching for a Job or a Project to invest
                invest your abilities?"
          img={aboutImage}
          imgAlign="right"
        >
          <ListItem
            title="Find a project"
            description="Pick a project and work hard for it"
          >
            <i className="fa fa-briefcase" />
          </ListItem>

          <ListItem title="Get rated" description="Get rated by companies">
            <i className="fa fa-star" />
          </ListItem>

          <ListItem
            title="Find better opportunities"
            description="Get noticed by other companies"
          >
            <i className="fa fa-building" />
          </ListItem>
        </AboutUsSection>
        <AboutUsSection
          title="Are you a Project Manager?"
          imgAlign="left"
          img={aboutImage1}
        >
          <p>
            Search for a new recruiter for your company
            <br />
            Or even recruit a freelancer to get a project done.
          </p>
        </AboutUsSection>
        <AboutUsSection
          title="We Connect Developers and Companies"
          img={aboutImage2}
          imgAlign="right"
        >
          <p>Get notified whenever we find a job or project that suits you.</p>
        </AboutUsSection>
      </div>
    </section>
  );
}

export default AboutUs;
