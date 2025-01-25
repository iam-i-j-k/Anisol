import React, { useState } from "react";
import toast from 'react-hot-toast';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0) {
      toast.error("Please enter your feedback and select a rating");
      return;
    }

    setIsSubmitting(true);

    // Simulate a delay for feedback submission
    setTimeout(() => {
      toast.success("Feedback submitted successfully");
      setFeedback("");
      setRating(0);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 m-6">
      <h2 className="text-lg font-semibold">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleRating(star)}
              className={`h-8 w-8 cursor-pointer ${
                rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
            </svg>
          ))}
        </div>
        <textarea
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          placeholder="Enter your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
            isSubmitting
              ? "bg-black cursor-not-allowed"
              : "bg-black "
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;