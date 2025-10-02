import { useQueries } from "@tanstack/react-query";
import { getRandomProducts, getRecentProducts } from "../../actions";

export const useHomeProducts = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['recentProducts'],
                queryFn: getRecentProducts,
            },
            {
                queryKey: ['popularProducts'],
                queryFn: getRandomProducts,
            }            
            
        ],
    });

    const [recentProductsResult, popularProductsResult] = results;

    // to combinate queries results

    const isLoading = recentProductsResult.isLoading || popularProductsResult.isLoading;
    const error = recentProductsResult.error || popularProductsResult.error;

    return {
        recentProducts: recentProductsResult.data || [],
        popularProducts: popularProductsResult.data || [],
        isLoading,
        error,
    };
};