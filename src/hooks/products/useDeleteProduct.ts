import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../actions';
import toast from 'react-hot-toast';

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
            toast.success('Producto eliminado correctamente', {
                position: 'bottom-right',
            });
        },
        onError: (error: Error) => {
            console.log(error);
            if (error.message === 'No se puede eliminar el producto porque tiene pedidos asociados.') {
                toast.error(error.message, {
                    position: 'bottom-right',
                });
                return;
            }

            toast.error('Ocurrió un error al eliminar el producto', {
                position: 'bottom-right',
            });
        },
    });

    return {
        mutate,
        isPending,
    };
};
