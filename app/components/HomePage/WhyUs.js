/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function WhyUs() {
  return (
    <section id="why-us" className="wow fadeIn">
      <div className="container">
        <header className="section-header">
          <h3>Why choose us?</h3>
          <p>
            Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
            vel partiendo abhorreant vituperatoribus.
          </p>
        </header>

        <div className="row row-eq-height justify-content-center">
          <div className="col-lg-4 mb-4">
            <div className="card wow bounceInUp">
              <i className="fa fa-diamond" />
              <div className="card-body">
                <h5 className="card-title">Corporis dolorem</h5>
                <p className="card-text">
                  Deleniti optio et nisi dolorem debitis. Aliquam nobis est est
                  est temporibus sunt ab inventore officiis aut voluptatibus.
                </p>
                <a href="#" className="readmore">
                  Read more{' '}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card wow bounceInUp">
              <i className="fa fa-language" />
              <div className="card-body">
                <h5 className="card-title">Voluptates dolores</h5>
                <p className="card-text">
                  Voluptates nihil et quis omnis et eaque omnis sint aut.
                  Ducimus dolorum aspernatur.
                </p>
                <a href="#" className="readmore">
                  Read more{' '}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card wow bounceInUp">
              <i className="fa fa-object-group" />
              <div className="card-body">
                <h5 className="card-title">Eum ut aspernatur</h5>
                <p className="card-text">
                  Autem quod nesciunt eos ea aut amet laboriosam ab. Eos quis
                  quis porro in non nemo ex.{' '}
                </p>
                <a href="#" className="readmore">
                  Read more{' '}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row counters">
          <div className="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">274</span>
            <p>Clients</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">421</span>
            <p>Projects</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">1,364</span>
            <p>Hours Of Support</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">18</span>
            <p>Hard Workers</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
