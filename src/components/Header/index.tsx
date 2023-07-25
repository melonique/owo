import PropTypes from 'prop-types';
import React from 'react';
import Image from 'next/image';
import owologo from "../../../public/owo.svg";

const Header = ({}) => (
  <div className="text-center pt-5 pb-5">
    <a href="https://owo.quebec" target="_blank">
      <Image
        priority
        src={owologo}
        alt="owo"
        width={175}
      />
    </a>
  </div>
);

Header.propTypes = {};

export default Header;
