'use client'

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BoardList } from "../boardList/BoardList";
import { CreateNewTask } from "../boardListTask/createNewTask/CreateNewTask";
import { CreateNewList } from "../boardList/createNewList/CreateNewList";
import { BoardDataType } from "@/models/boardTypes";
import { move, reorder } from '@/utils/helpers/dragAndDrop';
import { useEffect, useState, useTransition } from 'react';
import { updateListsOrderAction } from '@/actions/listActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { updateTasksOrderAction, updateTasksOrderInDifferentListsAction } from '@/actions/taskActions';

interface BoardProps {
    board: BoardDataType
}

export const BoardComponent: React.FC<BoardProps> = ({ board }) => {
    const [, startTransition] = useTransition();
    const [boardData, setBoard] = useState<BoardDataType>(board);
    const router = useRouter();

    const onDragEnd = (result: DropResult) => {
        const { source, destination, type } = result;

        if (!destination) return;

        // --- Handling List Reordering ---
        if (type === 'list') {
            if (source.index === destination.index) return;

            const newLists = reorder(board.lists, source.index, destination.index);
            const updatedListsWithOrder = newLists.map((list, index) => ({ id: list.id, order: index }));

            setBoard(prevBoard => ({ ...prevBoard, lists: newLists }));

            startTransition(async () => {
                const actionResult = await updateListsOrderAction({
                    boardId: board.id, newLists: updatedListsWithOrder
                });

                if (!actionResult?.success) {
                    toast.error(actionResult.error || "Failed to reorder lists");
                    setBoard(board);
                }
                router.refresh()
            });
        }

        // --- Handling Task Reordering / Moving ---
        if (type === 'task') {
            const sourceListId = source.droppableId;
            const destinationListId = destination.droppableId;
            const sourceListIndex = board.lists.findIndex(list => list.id === sourceListId);
            const destinationListIndex = board.lists.findIndex(list => list.id === destinationListId);
            const sourceList = board.lists[sourceListIndex];
            const destinationList = board.lists[destinationListIndex];

            if (sourceListIndex < 0 || destinationListIndex < 0) return;

            // Reordering within the same list
            if (sourceListId === destinationListId) {
                if (source.index === destination.index) return;

                const reorderedTasks = reorder(sourceList.tasks, source.index, destination.index);
                const updatedTasksWithOrder = reorderedTasks.map((task, index) => ({ id: task.id, order: index }));

                setBoard(prevBoard => {
                    const newLists = Array.from(prevBoard.lists);
                    newLists[sourceListIndex] = { ...sourceList, tasks: reorderedTasks };
                    return { ...prevBoard, lists: newLists };
                });

                startTransition(async () => {
                    const actionResult = await updateTasksOrderAction({
                        listId: sourceListId, newTasks: updatedTasksWithOrder
                    });

                    if (!actionResult?.success) {
                        toast.error(actionResult.error || "Failed to reorder tasks");
                        setBoard(board);
                    }
                    router.refresh()
                });
            } else {
                // Moving task to a different list
                const resultMove = move(
                    sourceList.tasks,
                    destinationList.tasks,
                    source,
                    destination
                );

                const updatedSourceTasksWithOrder = resultMove[sourceListId].map((task, index) => ({ ...task, order: index, listId: sourceListId }));
                const updatedDestinationTasksWithOrder = resultMove[destinationListId].map((task, index) => ({ ...task, order: index, listId: destinationListId }));
                const newDestinationListTasks = updatedDestinationTasksWithOrder.map(task => ({ id: task.id, order: task.order }));

                setBoard(prevBoard => {
                    const newLists = Array.from(prevBoard.lists);
                    newLists[sourceListIndex] = { ...sourceList, tasks: updatedSourceTasksWithOrder };
                    newLists[destinationListIndex] = { ...destinationList, tasks: updatedDestinationTasksWithOrder };
                    return { ...prevBoard, lists: newLists };
                });

                startTransition(async () => {
                    const actionResult = await updateTasksOrderInDifferentListsAction({
                        sourceListId: sourceListId,
                        destinationListId: destinationListId,
                        sourceMovedTask: { id: sourceList.tasks[source.index].id, order: source.index },
                        newDestinationListTasks
                    });

                    if (!actionResult?.success) {
                        toast.error(actionResult.error || "Failed to reorder tasks");
                        setBoard(board);
                    }
                    router.refresh()
                });
            }
        }
    };

    useEffect(() => {
        setBoard(board)
    }, [board])

    return (
        <div className="h-fit border border-solid border-indigo rounded-xl p-4 mx-auto my-0">
            <div className="h-full flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <CreateNewTask board={board} />
                    <CreateNewList board={board} />
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={board.id} type="list" direction="horizontal">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex space-x-4 p-2 items-start overflow-scroll"
                            >
                                {boardData.lists.map((list, index) =>
                                    <BoardList key={list.id} list={list} index={index} />
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};
