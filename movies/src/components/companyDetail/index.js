import React from "react";
import Typography from "@mui/material/Typography";




const CompanyDetails = ({ company }) => {  // Don't miss this!
    console.log(company)
  return (
    <>
      <Typography variant="h5" component="h3">
        Headquarters:
      </Typography>

      <Typography variant="h6" component="p">
        {company.headquarters}
      </Typography>

      
    </>
  );
};
export default CompanyDetails ;