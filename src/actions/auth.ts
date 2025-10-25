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

export const signUp = async ( {
    email,
    password,
    fullName,
    phone
} : IAuthRegister) => {
    try {
    //1. Create o Register new user

    const {data,error} = await supabase.auth.signUp({
        email,
        password
    })

    if(error) {
        throw new Error(error.message);
    }

    const userId = data.user?.id;

    if(!userId){
        throw new Error('Error not get userId')
    }

    // User Authentication

    const {error : signInError} = 
    await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(signInError){
        console.log(signInError)
        throw new Error('Email or password incorrect')
    }

    //3. Insert default rol (CUSTOMER)

      const {error: roleError} = await supabase.
        from('users_roles')
        .insert({
        user_id: userId,
        role: 'customer'
      })

      if(roleError){
        console.log(roleError)
        throw new Error('Error register role user')
      }

      //4. Insert dates user to customer table

      const {error: customerError} = await supabase
        .from('customers')
        .insert({
            user_id: userId,
            full_name: fullName,
            phone,
            email
        })

        if(customerError) {
            console.log(customerError);
            throw new Error('Error insert user dates')
        }

        return data;

    }catch(error){

        console.log(error);
        throw new Error('Error insert new customer register')

    }
}


//Start session function

export const signIn = async ({ email, password } : IAuthLogin ) => {
    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if(error){
        console.log(error);
        throw new Error('Error start session')
    };

    return data;
}

//Close session function

export const signOut = async () => {
    const { error} = await supabase.auth.signOut();

    if(error){
        console.log(error);
        throw new Error('Error close session')
    }
}

export const getSession = async () => {
    const {data, error} = await supabase.auth.getSession();

    if(error) {
        console.log(error);
        throw new Error('Error get session')
    }

    return data;
}