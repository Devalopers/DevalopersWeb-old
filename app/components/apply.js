import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Messages } from 'primereact/messages';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import Button from './devbutton';
import FormItem from './formitem';
import Modal from './modal';

export default class Apply extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {
        answers: [],
        cv: {},
      },
      visible: false,
      filename: 'select file...',
      fetch: {
        postId: '',
        type: '',
        questions: [
          {
            question: 'Are you a motivated individual?',
          },
        ],
      },
    };
    this.messages = null;
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileName = this.handleFileName.bind(this);
  }

  componentDidMount() {
    const { fetch } = { ...this.state };
    const currentState = fetch;
    const { id, type } = this.props;
    currentState.postId = id;
    currentState.type = type;
    this.setState({ fetch: currentState });
  }

  showError(status, message) {
    this.messages.show({
      severity: 'error',
      summary: status,
      detail: message,
    });
  }

  handleToggle() {
    return this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    const { userData } = { ...this.state };
    const currentState = userData;
    // eslint-disable-next-line react/no-access-state-in-setstate
    const a = userData.answers.slice();
    currentState.answers = a;
    a[Number(e.target.name)] = e.target.value;
    this.setState({ userData: currentState });
  }

  handleFileName(e) {
    const fileName = e.target.value.replace(/^.*[\\/]/, '');
    // eslint-disable-next-line no-useless-escape
    const [, extention] = fileName.split(/\.(?=[^\.]+$)/);
    const { userData } = { ...this.state };
    const currentState = userData;
    const file = e.target.files[0];
    currentState.cv = file;
    if (extention !== 'pdf') {
      this.showError('failed', 'Only supported file extension is pdf');
    } else {
      this.setState({ userData: currentState, filename: fileName });
    }
  }

  render() {
    return (
      <ApplyJobStyleWrapper>
        <Button
          title="Apply Now"
          class="btn-3 mt-15"
          click={this.handleToggle}
        />
        <Modal close={() => this.handleToggle()} status={this.state.visible}>
          <PrimereactStyle />
          <Messages
            style={{ width: '100%' }}
            ref={el => {
              this.messages = el;
            }}
          />
          <div className="header mt-15">
            <h2> Apply </h2>
          </div>
          <div className="body mt-50">
            <form onSubmit={this.handleSubmit} method="POST">
              <div className="row justify-content-center">
                <div className="col-12">
                  <FormItem>
                    <div className="mb-30 form-control custom-file-upload">
                      <input
                        name="file"
                        id="file"
                        accept=".pdf"
                        className="input-file"
                        type="file"
                        onChange={this.handleFileName}
                      />
                      <p className="upload-text">{this.state.filename}</p>
                      <Button>
                        <label
                          className="upload-file-btn btn dev-btn btn-3"
                          htmlFor="file"
                        >
                          upload
                        </label>
                      </Button>
                    </div>
                  </FormItem>
                </div>
              </div>
              <div className="row justify-content-center">
                {this.state.fetch.questions.map((entry, index) => (
                  <div key={entry.question} className="col-12 mt-15">
                    <h5>{entry.question}</h5>
                    <FormItem>
                      <textarea
                        name={`${index}`}
                        placeholder="Answer"
                        value={this.state.userData.answers[index]}
                        onChange={this.handleChange}
                      />
                    </FormItem>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="align-confirmation-btn">
                    <Button
                      title="Apply"
                      class="resize-sm-btn btn-3 mt-15"
                      type="submit"
                    />
                    <Button
                      title="Cancel"
                      class="resize-sm-btn btn-3 mt-15"
                      click={this.handleToggle}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </ApplyJobStyleWrapper>
    );
  }
}

const ApplyJobStyleWrapper = styled.div`
  .header {
    h2 {
      text-align: center;
    }
  }
  .align-confirmation-btn {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    button:not(last-child) {
      margin-right: 10px;
    }

    @media only screen and (max-width: 576px) {
      justify-content: center;
      flex-direction: row;
      button:not(last-child) {
        margin-left: 0px;
      }
    }
  }
  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
  .custom-file-upload {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .upload-text {
    margin-top: 10px;
    font-size: 1em;
    overflow: hidden;
    overflow-wrap: break-word;
    @media only screen and (max-width: 576px) {
      width: 120px;
    }
  }

  .upload-file-btn {
    margin-right: -20px;
    min-width: 100px;
    font-size: 1em;
    overflow: hidden;
  }

  .resize-sm-btn {
    @media only screen and (max-width: 576px) {
      min-width: 120px;
    }
  }
`;

Apply.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
