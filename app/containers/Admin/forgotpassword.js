import React from 'react';
import axios from 'axios';
import { DevContact } from '../../components/devcontact';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItem from '../../components/formitem';
import { FlashHandle } from '../../components/flash';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      statusIsVisible: false,
      apiStatus: false,
      apiMessage: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e);
    if (!this.validateForm()) return; // TODO add more validations + flash messages
    axios
      .post(`https://devalopers.herokuapp.com/admin/forgotPassword`, {
        email: this.state.email,
      })
      .then(res => {
        console.log(res);
        this.setState({
          statusIsVisible: true,
          apiStatus: true,
          apiMessage: res.data.message,
        });
      })
      .catch(err => {
        console.log(err.response);
        if (!err.response)
          return { error: 'unhandled error', message: error.message };
        const res = err.response;
        this.setState({
          statusIsVisible: true,
          apiStatus: false,
          apiMessage: res.data.message,
        });
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  validateForm() {
    if (this.state.email.length == 0) return false;
    return true;
  }

  render() {
    return (
      <div>
        <BreadCrumb
          title="Forget Password"
          items={['Admin', 'Forgot Password']}
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
                    <FlashHandle
                      visible={this.state.statusIsVisible}
                      status={this.state.apiStatus}
                      message={this.state.apiMessage}
                    />
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <FormItem>
                            <input
                              className="mb-30"
                              type="email"
                              name="email"
                              placeholder="Email"
                              required
                              onChange={this.handleChange}
                              value={this.state.fullname}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12">
                          <div style={{ textAlign: 'right' }}>
                            <DevButton
                              type="Submit"
                              click={this.handleClick}
                              title="Send Link"
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
