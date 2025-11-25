import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProducto } from "../../actions";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteProducto,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
            toast.success('Producto eliminado correctamente', {
                position: 'bottom-right',
            });
        },
        onError: error => {
            toast.error('Ocurrio un error al eliminar el producto', {
                position: 'bottom-right',
            });
            console.log(error);
        }
    })
    return { mutate, isPending };
}