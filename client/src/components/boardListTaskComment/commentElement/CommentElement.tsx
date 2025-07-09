import { CommentWithUserType } from "@/models/boardTypes"
import { formatDateWithTime } from "@/utils/helpers/formatDateWithTime"
import { DeleteComment } from "../deleteComment/DeleteComment"
import { UpdateComment } from "../updateComment/UpdateComment"

interface CommentProps {
    comment: CommentWithUserType
}

export const CommentElement: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="w-9 h-9 bg-indigo-100 text-white flex items-center justify-center rounded-full font-bold text-md mr-3 shadow-sm">
                        {comment.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 text-base">{comment.user.name}</p>
                        <p className="text-gray-600 text-xs">{formatDateWithTime(comment.createdAt)}</p>
                    </div>
                </div>

                <div className="flex flex-row">
                    <UpdateComment comment={comment} />
                    <DeleteComment comment={comment} />
                </div>
            </div>
            <p className="text-gray-800 text-xs whitespace-pre-wrap">
                {comment.text}
            </p>
        </div>
    )
}
