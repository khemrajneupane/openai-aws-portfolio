import {
  FileImage,
  Database,
  Code2,
  Squirrel,
  Paintbrush,
  Type,
  ExternalLink,
  Hotel,
} from "lucide-react";

export default function HotelBookingCard() {
  return (
    <div className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Hotel className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          Hotel Booking System
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Developed a modern hotel booking application using{" "}
            <strong>Next.js</strong> and <strong>Redux </strong>
            for state management, ensuring a seamless and responsive user
            experience. Implemented user authentication and profile management,
            along with advanced filtering options for personalized search
            results. Integrated <strong>Cloudinary</strong> for efficient image
            processing and storage, <strong>Tailwind CSS</strong> for a sleek
            and responsive UI, and <strong>TypeScript </strong>
            for robust code quality. Utilized <strong>MongoDB</strong> for
            scalable and efficient data management.
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <FileImage className="w-4 h-4 text-purple-700 mt-1" />
              Images stored in Cloudinary
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 text-green-700 mt-1" />
              MongoDB / Mongoose Object Data Modeling (ODM) library
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 text-black mt-1" />
              Next.js
            </li>
            <li className="flex items-start gap-2">
              <Squirrel className="w-4 h-4 text-orange-500 mt-1" />
              Redux for state management
            </li>
            <li className="flex items-start gap-2">
              <Paintbrush className="w-4 h-4 text-blue-500 mt-1" />
              Tailwind CSS for responsive UI
            </li>
            <li className="flex items-start gap-2">
              <Type className="w-4 h-4 text-blue-900 mt-1" />
              TypeScript for type safety
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://hotel-booking-khem.vercel.app/"
            className="inline-flex items-center gap-1 text-sm font-medium text-aws-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
