import Context from './Context';
import { dashboardConstants } from '../../constants';
import { useState } from 'react';

const Provider = ({ children }) => {
    const { getDefaultPageHeader } = dashboardConstants;
    const [pageHeader, setPageHeader] = useState(getDefaultPageHeader());

    const updateHeaderValue = (newValue) => setPageHeader(newValue);

    return (
        <Context.Provider value={{ pageHeader, updateHeaderValue }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;