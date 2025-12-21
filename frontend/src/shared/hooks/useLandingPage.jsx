import { useContext } from "react";
import { LandingPageContext } from '../context';

const useLandingPage = () => useContext(LandingPageContext.Context)

export default useLandingPage;