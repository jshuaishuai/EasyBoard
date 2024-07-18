import { useMutation } from "convex/react";
import { useState } from "react"


export const useApiMutation = (mutationFunction: any) => {
    const [pengding, setPengding] = useState(false);

    const apiMutation = useMutation(mutationFunction);

    const mutate = (payload: any) => {

        setPengding(true);

        return apiMutation(payload)
            .finally(() => {
                setPengding(false)
            })
            .then(result => {
                return result;
            })
            .catch(error => {
                throw error;
            })
    };

    return {
        pengding,
        mutate,
    }
}
