import { supabase } from "@/config/SupabaseClient"
import { UpdatePasswordRequest, UpdatePasswordResponse, success, fail } from "./UserInformation"
import { fromAuthenticationResponseToUser } from "./Authentication"

export const updatePassword = async (request: UpdatePasswordRequest): Promise<UpdatePasswordResponse> => {
    const { data, error } = await supabase.auth.updateUser({ password: request.password })

    return error || !data ? fail(error) : success(fromAuthenticationResponseToUser(data.user))
}
