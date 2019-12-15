import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #ffffff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }


/* :: 2.0 Spacing CSS */
.mt-15 {
  margin-top: 15px;
}

.mt-30 {
  margin-top: 30px;
}

.mt-40 {
  margin-top: 40px;
}

.mt-50 {
  margin-top: 50px;
}

.mt-70 {
  margin-top: 70px;
}

.mt-80 {
  margin-top: 80px;
}

.mt-100 {
  margin-top: 100px;
}

.mt-150 {
  margin-top: 150px;
}

.mr-15 {
  margin-right: 15px;
}

.mr-30 {
  margin-right: 30px;
}

.mr-50 {
  margin-right: 50px;
}

.mr-100 {
  margin-right: 100px;
}

.mb-15 {
  margin-bottom: 15px;
}

.mb-30 {
  margin-bottom: 30px;
}

.mb-40 {
  margin-bottom: 40px;
}

.mb-50 {
  margin-bottom: 50px;
}

.mb-60 {
  margin-bottom: 60px;
}

.mb-70 {
  margin-bottom: 70px;
}

.mb-80 {
  margin-bottom: 80px;
}

.mb-100 {
  margin-bottom: 100px;
}

.ml-15 {
  margin-left: 15px;
}

.ml-30 {
  margin-left: 30px;
}

.ml-50 {
  margin-left: 50px;
}

.ml-100 {
  margin-left: 100px;
}

.pt-50 {
  padding-top: 50px !important;
}

.section-padding-80 {
  padding-top: 80px;
  padding-bottom: 80px;
}

.section-padding-0-80 {
  padding-top: 0;
  padding-bottom: 80px;
}

.section-padding-80-0 {
  padding-top: 80px;
  padding-bottom: 0;
}

.background-curve {
  position: absolute;
  width: 70%;
  top: 0;
  height: 100%;
  right: 0;
  z-index: 0;
  
}

.background-curve img {
  width: 100%;
  height: auto;
  background-repeat: no-repeat;


`;

export default GlobalStyle;
