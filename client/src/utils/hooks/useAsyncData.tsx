import { ActionResult } from "@/models/actionResponse";
import { useEffect, useState, useTransition, useRef } from "react";

export function useAsyncData<T,>(action?: () => Promise<ActionResult<T[]>>) {
    const [data, setData] = useState<T[]>([]);
    const [isPending, startTransition] = useTransition();

    const fetchedRef = useRef(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        if (!action || fetchedRef.current) return;

        mountedRef.current = true;
        fetchedRef.current = true;

        startTransition(() => {
            action()
                .then((result) => {
                    if (mountedRef.current && result?.success) setData(result.data);
                })
                .catch((error) => {
                    console.error('Failed to fetch options:', error.message);
                });
        });
    }, [action]);

    return { data, isPending }
}
