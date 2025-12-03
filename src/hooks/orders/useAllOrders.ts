import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "../../actions";

export const useAllOrders = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrder,
    });
    return {
        data,
        isLoading

    }
}