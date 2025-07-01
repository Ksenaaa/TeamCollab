import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
    const [isOpen, setOpen] = useState(initialState);

    const onToggle = useCallback(() => setOpen(prevState => !prevState), []);

    const onOpen = useCallback(() => setOpen(true), []);

    const onClose = useCallback(() => setOpen(false), []);

    return { isOpen, onToggle, onOpen, onClose };
};
