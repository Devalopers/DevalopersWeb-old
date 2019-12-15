import styled from 'styled-components';

export const AvatarWrapper = styled.div`
  .avatar-wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    margin: 50px auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 1px 15px -5px black;
    transition: all 0.3s ease;
  }
  .avatar-wrapper:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .avatar-wrapper:hover .profile-pic {
    opacity: 0.5;
  }
  .avatar-wrapper .profile-pic {
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
  }
  .avatar-wrapper .profile-pic:after {
    font-family: FontAwesome;
    content: '\f007';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 190px;
    background: #ecf0f1;
    color: #34495e;
    text-align: center;
  }
  .avatar-wrapper .upload-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .avatar-wrapper .upload-button .fa-arrow-circle-up {
    position: absolute;
    font-size: 234px;
    top: -17px;
    left: 0;
    text-align: center;
    opacity: 0;
    transition: all 0.3s ease;
    color: #34495e;
  }
  .avatar-wrapper .upload-button:hover .fa-arrow-circle-up {
    opacity: 0.9;
  }
`;
