import React from 'react';
import ReactSlider from 'react-slick';
import { Helmet } from "react-helmet";

export default React.forwardRef(function Slider({ settings, ...props }, ref) {
  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Helmet>
      <ReactSlider {...settings} ref={ref}>
        {props.children}
      </ReactSlider>
    </React.Fragment>
  );
});
