import styled from 'styled-components';

export const DevContact = styled.section`
  .dev-contact-area {
    position: relative;
    z-index: 1;
  }

  .dev-contact-area .google-maps {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 500px;
  }

  @media only screen and (max-width: 767px) {
    .dev-contact-area .google-maps {
      height: 280px;
    }
  }
  .dev-contact-area .google-maps iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  .dev-contact-form {
    position: relative;
    z-index: 1;
  }
`;
