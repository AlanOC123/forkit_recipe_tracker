import { useQuery } from "@tanstack/react-query";
import { interfaceService } from "../../../../../api";

const fetchResults = async(searchTerm) => await interfaceService.get(`api/recipes/?term=${searchTerm}`)

export const useSearchRecipes = (searchTerm) => {
    return useQuery({
        queryKey: ['recipes', 'search', searchTerm],
        queryFn: () => fetchResults(searchTerm),
        enabled: () => searchTerm && searchTerm?.length >= 2,
        staleTime: 1000 * 60 * 5
    })
}