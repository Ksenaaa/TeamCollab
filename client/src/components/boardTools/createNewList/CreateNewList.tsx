'use client'

import { Button } from "@/components/button/Button";


export const CreateNewList: React.FC = () => {
    const handleAddList = () => {
        console.log('Add List')
    }

    return (
        <div className="flex flex-start">
            <Button onClick={handleAddList} title="Add List" />
        </div>
    );
};
