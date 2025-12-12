import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { signIn } from "../../actions";
import toast from "react-hot-toast";

export const useLogin = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/home');
        },
        onError: err => {
            toast.error(err.message, {
                position: 'bottom-right',
            });
        }
    })

    return {
        mutate,
        isPending
    }

}