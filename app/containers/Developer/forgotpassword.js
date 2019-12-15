import React from 'react';
import axios from 'axios';
import { Messages } from 'primereact/messages';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { BASE_URL } from '../../config/config';
import { DevContact } from '../../components/devcontact';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItemGenerator from './formitemgenerator';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };

    this.message = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showSuccess(status, message) {
    this.messages.show({
      severity: 'success',
      summary: status,
      detail: message,
    });
  }

  showError(status, message) {
    this.messages.show({
      severity: 'error',
      summary: status,
      detail: message,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    return axios
      .post(`${BASE_URL}/developer/forgotpassword`, { email: this.state.email })
      .then(res => this.showSuccess(res.data.status, res.data.message))
      .catch(err =>
        this.showError(err.response.data.status, err.response.data.message),
      );
  }

  render() {
    return (
      <div>
        <BreadCrumb
          title="Forget Password"
          items={['Developer', 'Forgot Password']}
        />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>Enter email address to receive reset link</h4>
                    </div>
                    <form
                      method="POST"
                      encType="multipart/form-data"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="row">
                        <div className="col-12">
                          <PrimereactStyle />
                          <Messages
                            style={{ width: '100%' }}
                            ref={el => {
                              this.messages = el;
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-30">
                          <FormItemGenerator
                            name="email"
                            value={this.state.email}
                            handler={this.handleChange}
                            options={{ required: true }}
                          />
                        </div>
                        <div className="col-12">
                          <div style={{ textAlign: 'right' }}>
                            <DevButton
                              title="Send Link"
                              type="submit"
                              class="btn-3 mt-15"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </DevContact>
      </div>
    );
  }
}

export default ForgotPassword;
