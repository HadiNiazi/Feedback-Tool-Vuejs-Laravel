<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Feedback\CreateRequest;
use App\Models\Category;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $userId = auth()->check() ? auth()->id(): null;

        $feedbacks = Feedback::with(['user', 'category'])->where('user_id', $userId)->paginate(10);

        return response()->json($feedbacks);
    }

    public function store(CreateRequest $request)
    {
        $category = $request->category;
        $user = auth()->user();

        $category = Category::find($category);

        if (! $category) {
            return response()->json([
                'error' => 'Unable to find the category, please choose the correct category'
            ]);
        }

        if (! $user) {
            return response()->json([
                'error' => 'User session is expired, please go back and login the user again.'
            ]);
        }

        Feedback::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Feedback saved successfully'
        ], 201);
    }

    public function show($id)
    {
        $feedback = Feedback::find($id);

        if (! $feedback) {
            return response()->json([
                'error' => 'Unable to find the feedback, please refresh the webpage and try again! If still problem persists, contact with administrator'
            ], 404);
        }

        return response()->json($feedback);
    }

    public function openMyFeedbacks()
    {
        $userId = auth()->check() ? auth()->id(): null;

        $feedbacks = Feedback::with(['user', 'category'])->where('user_id', '!=', $userId)->paginate(10);

        return response()->json($feedbacks);
    }

    public function categories()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories
        ], 201);
    }
}
