import { supabase } from "../supabase/client"

interface IAuthLogin {
    email: string,
    password: string
}

interface IAuthRegister {
    email: string,
    password: string,
    fullName: string,
    phone?: string,
}

export const signUp = async ({
    email,
    password,
    fullName,
    phone
}: IAuthRegister) => {
    try {
        //1. Create o Register new user

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            throw new Error(error.message);
        }

        const userId = data.user?.id;

        if (!userId) {
            throw new Error('No se pudo obtener el identificador del usuario')
        }

        // User Authentication

        const { error: signInError } =
            await supabase.auth.signInWithPassword({
                email,
                password
            })

        if (signInError) {
            console.log(signInError)
            throw new Error('El correo electrónico o la contraseña son incorrectos')
        }

        //3. Insert default rol (CUSTOMER)

        const { error: roleError } = await supabase.
            from('users_roles')
            .insert({
                user_id: userId,
                role: 'customer'
            })

        if (roleError) {
            console.log(roleError)
            throw new Error('No se pudo registrar el rol del usuario')
        }

        //4. Insert dates user to customer table

        const { error: customerError } = await supabase
            .from('customers')
            .insert({
                user_id: userId,
                full_name: fullName,
                phone,
                email
            })

        if (customerError) {
            console.log(customerError);
            throw new Error('No se pudieron guardar los datos del usuario')
        }

        return data;

    } catch (error) {

        console.log(error);
        throw new Error('No se pudo completar el registro. Inténtalo de nuevo')

    }
}


//Start session function

export const signIn = async ({ email, password }: IAuthLogin) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.log(error);
        throw new Error('No se pudo iniciar sesión. Verifica tus datos e inténtalo de nuevo')
    };

    return data;
}

//Close session function

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
        throw new Error('No se pudo cerrar la sesión')
    }
}

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.log(error);
        throw new Error('No se pudo recuperar la sesión')
    }

    return data;
}

export const getUseDate = async (userId: string) => {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.log(error);
        throw new Error(error.message);
    }

    return data;
}

export const getUserRole = async (userId: string) => {
    const { data, error } = await supabase
        .from('users_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.log(error);
        throw new Error('Error al obtener el rol del usuario');
    }

    return data;
}
