import { useQuery } from '@tanstack/react-query';
import { interfaceService } from '../../../../../api';
import { getOptionsEndpoint } from '../constants';

const fetchOptions = async () => {
    const { data } = await interfaceService.get(getOptionsEndpoint());
    return data;
}

const useOptions = () => {
    return useQuery({
        queryKey: ['registrationOptions'],
        queryFn: fetchOptions,
        staleTime: 1000 * 60 * 60
    })
}

export default useOptions