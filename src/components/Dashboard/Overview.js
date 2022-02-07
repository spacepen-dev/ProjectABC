import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import EmptyData from "./EmptyData";
import WarningPage from "./WarningPage";
import DetailsCard from "./DetailsCard";
import EyeSVG from "./svg/Eyes";
import WhiteWallet from "./svg/WhiteWallet";
import ProfileWhite from "./svg/ProfileWhite";
import SalariesHistory from "./SalariesHistory";
import Slider from "./Slider";

const Overview = ({ trial }) => {
  const [pageId, setId] = useState(1);
  const [small, setSmall] = useState("first");

  const getId = (e) => {
    console.log(e.target.id);
    setId(Number(e.target.id));
    setSmall(e.target.nextSibling.id);
  };

  return (
    <Container fluid className='overview h-100'>
      <div className='d-flex justify-content-between align-items-center details-container'>
        <DetailsCard
          heading=' TOTAL BALANCE'
          number='$50,000'
          firstSVG={EyeSVG()}
          secondSVG={WhiteWallet()}
        />
        <DetailsCard
          heading='TOTAL EMPLOYEES'
          number='60'
          secondSVG={ProfileWhite()}
        />
        <DetailsCard
          heading='TOTAL TRANSACTIONS'
          number='50'
          secondSVG={WhiteWallet()}
        />
      </div>
      <article className='d-flex align-items-center top-tab'>
        <div className='h-100 d-flex justify-content-between align-items-center w-100'>
          <Slider
            name='SALARY HISTORY'
            id={1}
            small={small}
            getId={getId}
            pageId={pageId}
            smallId='first'
          />
          <Slider
            name='ACCOUNT HISTORY'
            id={2}
            small={small}
            getId={getId}
            pageId={pageId}
            smallId='second'
          />
          <Slider
            name='TAX HISTORY'
            id={3}
            small={small}
            getId={getId}
            pageId={pageId}
            smallId='third'
          />
          <div className=' overview-btn'>
            <Button className='button'>View All</Button>
          </div>
        </div>
      </article>
      <article className='bottom-tab'>
        {pageId === 1 ? <SalariesHistory /> : ""}
      </article>
    </Container>
  );
};

export default Overview;
