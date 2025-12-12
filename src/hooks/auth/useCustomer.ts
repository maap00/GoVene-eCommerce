import { useQuery } from "@tanstack/react-query"
import { getUseDate } from "../../actions"


export const useCustomer = (userId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['customer', userId],
        queryFn: () => getUseDate(userId),
        enabled: !!userId,
        retry: false,
        refetchOnWindowFocus: true,
    })

    return {
        data,
        isLoading,
        error
    }
}