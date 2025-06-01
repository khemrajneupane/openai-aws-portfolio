"use client";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankYouMessage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Thank You for Reaching Out to Me!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your message has been successfully sent. I will get back to you as
          soon as possible.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return Home
          </Link>

          <p className="text-sm text-gray-500">
            I am feeling excited and wishing to be helpful in your mission.
          </p>
        </div>
      </div>
    </div>
  );
}
