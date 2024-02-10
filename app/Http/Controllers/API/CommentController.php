<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Comment\CreateRequest;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function loadFeedbackComments($feedbackId)
    {
        $feedback = Feedback::find($feedbackId);

        if (! $feedback) {
            return response()->json([
                'error' => 'Somewent went wrong please refresh the webpage and try again! If still problem persists, contact with administrator'
            ], 404);
        }

        $comments = Comment::with(['user'])->where('feedback_id', $feedback->id)->orderBy('id', 'desc')->get();

        return response()->json($comments);
    }

    public function store(CreateRequest $request)
    {
        $userId = auth()->check() ? auth()->id(): null;

        $user = User::find($userId);
        $feedback = Feedback::find($request->feedback_id);

        if (! $user) {
            return response()->json([
                'error' => 'Your login session is expired, please login again and try again! If still problem persists, contact with administrator'
            ], 404);
        }

        if (! $feedback) {
            return response()->json([
                'error' => 'Unable to find the feedback, please refresh the webpage and try again! If still problem persists, contact with administrator'
            ], 404);
        }

        $comment = Comment::create([
            'user_id' => $user->id,
            'feedback_id' => $feedback->id,
            'comment' => $request->comment
        ]);

        return response()->json([

            'comment' => [
                'user' => [
                    'name' => $comment->user ? $comment->user->name: ''
                ],
                'created_at' => $comment->created_at,
                'comment' => $comment->comment
            ]

        ], 201);

    }
}
