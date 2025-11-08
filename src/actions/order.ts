import type { OrderInput } from "../interface";
import { supabase } from "../supabase/client";

export const createOrder = async (order: OrderInput) => {

    //1. Get user authenticated + customer table
    const {data, error: errorUser} = await supabase.auth.getUser();

    if(errorUser){
        console.log(errorUser);
        throw new Error(errorUser.message);        
    }

    const user_id = data.user.id;

    const {data:customer , error: errorCustomer} = await 
        supabase
        .from('customers')
        .select('id')
        .eq('user_id', user_id)
        .single();

    if(errorCustomer){
        console.log(errorCustomer);
        throw new Error(errorCustomer.message);        
    }
    
    const customeId = customer.id;

    // 2. Check stock enable of earch Item cart

    for ( const item of order.cartItems ) {
        const {data: variantData, error: variantError} = await 
        supabase
        .from('variants')
        .select('stock')
        .eq('id', item.variantId)
        .single();
        
        if(variantError){
            console.log(variantError);
            throw new Error(variantError.message);            
        }

        if(variantData.stock < item.quantity){
            throw new Error("Stock unenable");
            
        }       
    }

    //3. Insert address data

    const {data: addressDate , error: addressError} = await supabase
    .from('addresses')
    .insert({
        address_line_1: order.address.addressLine1,
        addess_line_2: order.address.addressLine2,
        city: order.address.city,
        state: order.address.state,
        postal_code: order.address.postalCode,
        country: order.address.country,
        customer_id: customeId, 
    })
    .select()
    .single();

    if(addressError){
        console.log(addressError);
        throw new Error(addressError.message);        
    }

    //4. Create order

    const {data: orderDate, error: errorOrder} = await supabase
    .from('orders')
    .insert({
        customer_id: customeId,
        address_id: addressDate.id,
        total_amount: order.totalAmount,
        status: 'Pending',
    })
    .select()
    .single();

    if(errorOrder){
        console.log(errorOrder);
        throw new Error(errorOrder.message);
    }

    //5. Save order Details

    const orderItems = order.cartItems.map( item => ({
        order_id: orderDate.id,
        variant_id: item.variantId,
        quantity: item.quantity,
        price: item.price,
    }));

    const {error: orderItemError} = await 
    supabase
    .from('order_items')
    .insert(orderItems);

    if(orderItemError){
        console.log(orderItemError);
        throw new Error(orderItemError.message);
        
    }

    // 6. Get stock currented

    for( const item of order.cartItems){
        const {data: variantData} = await supabase
        .from('variants')
        .select('stock')
        .eq('id', item.variantId)
        .single();

        if(!variantData){
            throw new Error("Stock unenable");
            
        }

        const newStock = variantData.stock - item.quantity;

        const {error: updateErrorStock} = await supabase.
        from('variants')
        .update({
            stock: newStock,
        })
        .eq('id', item.variantId);

        if(updateErrorStock){
            console.log(updateErrorStock);
            throw new Error("Don't update stock");
            
        }


    }

    return orderDate;

}

export const getOrdersByCustomerId = async () => {

    const {data, error: errorUserId} = await supabase.auth.getUser()

    if(errorUserId){
        console.log(errorUserId);
        throw new Error(errorUserId.message);        
    }

    const userId = data.user.id;

    const {data: customer, error: errorCustomerId} = await 
    supabase
    .from('customers')
    .select('id')
    .eq('user_id',userId)
    .single();

    if(errorCustomerId){
        console.error(errorCustomerId);
        throw new Error(errorCustomerId.message);        
    }

    const customeId = customer.id;

    const {data: orders, error: errorOrder} = await 
    supabase
    .from('orders')
    .select('id,total_amount,status,created_at')
    .eq('customer_id',customeId)
    .order('created_at',{
        ascending:false,
    });

    if(errorOrder){
        console.log(errorOrder);
        throw new Error(errorOrder.message);        
    }

    return orders;
}

export const getOrderById = async (orderId: number) => {

    const {data, error: errorUser} = await supabase.auth.getUser();

    if(errorUser){
        console.log(errorUser);
        throw new Error(errorUser.message);       
    }

    const userId = data.user.id;

    const {data: customer, error: errorCustomer} = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', userId)
    .single();

    if(errorCustomer){
        console.log(errorCustomer);
        throw new Error(errorCustomer.message);       
    }

    const customeId = customer.id;

    const {data: order, error: errorOrder} = await supabase
    .from('orders')
	.select('*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name, storage, products(name, images)))')
    .eq('customer_id', customeId)
    .eq('id',orderId)
    .single();

    if(errorOrder){
        console.log(errorOrder);
        throw new Error(errorOrder.message);       
    }
    return {
		customer: {
			email: order?.customers?.email,
			full_name: order.customers?.full_name,
		},
		totalAmount: order.total_amount,
		status: order.status,
		created_at: order.created_at,
		address: {
			addressLine1: order.addresses?.address_line_1,
			addressLine2: order.addresses?.addess_line_2,
			city: order.addresses?.city,
			state: order.addresses?.state,
			postalCode: order.addresses?.postal_code,
			country: order.addresses?.country,
		},
		orderItems: order.order_items.map(item => ({
			quantity: item.quantity,
			price: item.price,
			color_name: item.variants?.color_name,
			storage: item.variants?.storage,
			productName: item.variants?.products?.name,
			productImage: item.variants?.products?.images[0],
		})),
	};
};
