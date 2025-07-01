'use client'

import { Button } from "@/components/button/Button";


export const CreateNewTask: React.FC = () => {
    const handleAddTask = () => {
        console.log('Add task')
    }

    return (
        <div className="flex flex-start">
            <Button onClick={handleAddTask} title="Add Task" />
        </div>
    );
};
