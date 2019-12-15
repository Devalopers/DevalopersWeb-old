import React, { Component } from 'react';
import { node, number, bool } from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import styled from 'styled-components';
export class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: true };

    this.hide = this.hide.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  componentDidMount() {
    this.remaining = this.props.duration;
    this.resumeTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  hide() {
    this.setState({ isVisible: false });
  }

  resumeTimer() {
    window.clearTimeout(this.timer);

    this.start = new Date();
    this.timer = setTimeout(this.hide, this.remaining);
  }

  pauseTimer() {
    if (this.props.persistOnHover) {
      clearTimeout(this.timer);

      this.remaining -= new Date() - this.start;
    }
  }

  render() {
    const { isVisible } = this.state;
    const { children } = this.props;
    const ispermanent = this.props.ispermanent || false;

    return isVisible || ispermanent ? (
      <FlashtStyleWrapper>
        <div
          // eslint-disable-next-line react/prop-types
          className={this.props.type + ' ' + (isVisible? "fade-In":"")}
          onMouseEnter={this.pauseTimer}
          onMouseLeave={this.resumeTimer}
        >
          {children}
        </div>
      </FlashtStyleWrapper>
    ) : null;
  }
}

FlashMessage.defaultProps = {
  duration: 5000,
  children: null,
  persistOnHover: true,
};

FlashMessage.propTypes = {
  children: node,
  duration: number,
  persistOnHover: bool,
  ispermanent: bool,
};
const FlashtStyleWrapper = styled.div`
  @import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  .info,
  .success,
  .warning,
  .error {
    max-width: 70%;
    margin: 10px 0px;
    padding: 12px;
    border-radius: 50px;
  }
  .info {
    color: #00529b;
    background-color: #bde5f8;
    -webkit-box-shadow: 0 6px 30px 8px rgba(21, 131, 223, 0.15);
    box-shadow: 0 6px 30px 8px rgba(21, 131, 223, 0.15);
  }
  .success {
    color: #4f8a10;
    background-color: #dff2bf;
    -webkit-box-shadow: 0 6px 30px 8px rgba(21, 223, 131, 0.15);
    box-shadow: 0 6px 30px 8px rgba(21, 223, 131, 0.15);
  }
  .warning {
    color: #9f6000;
    background-color: #feefb3;
  }
  .error {
    color: #d8000c;
    background-color: #ffd2d2;
    -webkit-box-shadow: 0 6px 30px 8px rgba(223, 131, 21, 0.15);
    box-shadow: 0 6px 30px 8px rgba(223, 131, 21, 0.15);
  }
  .info i,
  .success i,
  .warning i,
  .error i {
    margin: 10px 22px;
    font-size: 2em;
    vertical-align: middle;
  }
  @-webkit-keyframes fadeOut {
    0% { opacity: 1;}
    99% { opacity: 0.01;width: 100%; height: 100%;}
    100% { opacity: 0;width: 0; height: 0;}
  }  
  @keyframes fadeOut {
      0% { opacity: 1;}
      99% { opacity: 0.01;width: 100%; height: 100%;}
      100% { opacity: 0;width: 0; height: 0;}
  }

  .fade-Out{
    display: block;
    -webkit-animation: fadeOut 1s;
    animation: fadeOut 1s;
    animation-fill-mode: forwards;
}
  .fade-In{
    animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
  }
  @keyframes fadeIn {
   0% {opacity: 0;}
   100% {opacity: 1;}
} 
`;
// const FlashStyleWrapper = styled`
//   @-webkit-keyframes fadeOut {
//     0% { opacity: 1;}
//     99% { opacity: 0.01;width: 100%; height: 100%;}
//     100% { opacity: 0;width: 0; height: 0;}
//   }  
//   @keyframes fadeOut {
//       0% { opacity: 1;}
//       99% { opacity: 0.01;width: 100%; height: 100%;}
//       100% { opacity: 0;width: 0; height: 0;}
//   }

//   .fade-Out{
//     display: block;
//     -webkit-animation: fadeOut 1s;
//     animation: fadeOut 1s;
//     animation-fill-mode: forwards;
// }
//   .fade-In{
//     animation: fadeIn ease 1s;
//   -webkit-animation: fadeIn ease 1s;
//   -moz-animation: fadeIn ease 1s;
//   -o-animation: fadeIn ease 1s;
//   -ms-animation: fadeIn ease 1s;
//   }
//   @keyframes fadeIn {
//    0% {opacity: 0;}
//    100% {opacity: 1;}
// } 
// `;
// export function FlashHandle(props) {
//   return(
//     // <FlashStyleWrapper>
//       <FlashMessage type={props.status? 'success': 'error'} className={props.visible? "fade-In":"fade-Out"}>
//         <strong>{props.message}</strong>
//       </FlashMessage>
//     // </FlashStyleWrapper>
//   );
// }

export function FlashHandle(props) {
  // eslint-disable-next-line no-nested-ternary
  return props.visible ? (
    props.status ? (
      <FlashMessage type="success" duration={props.duration}>
        <strong>{props.message}</strong>
      </FlashMessage>
    ) : (
      <FlashMessage type="error" duration={props.duration}>
        <strong>{props.message}</strong>
      </FlashMessage>
    )
  ) : null;
}

export default FlashMessage;
