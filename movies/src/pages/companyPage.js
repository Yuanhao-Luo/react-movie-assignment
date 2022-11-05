import React from "react";
import { useParams } from 'react-router-dom';
import { getCompany, getCompanyImages } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import CompanyDetails from "../components/companyDetail/";
import PageTemplate from "../components/templateDetailPage";
// import useMovie from "../hooks/useMovie";

const CompanyPage = (props) => {
  const { id } = useParams();
  const { data: company} = useQuery(
    ["company", { id: id }],
    getCompany
  ); 
   
  const { data: image, error, isLoading, isError } = useQuery(
    ["images", { id: id }],
    getCompanyImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = image.logos ;

  return (
    <>
      {company ? (
        <>
          <PageTemplate company={company} images={images} title={company.name} link={company.homepage}>
            <CompanyDetails company={company} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default CompanyPage;