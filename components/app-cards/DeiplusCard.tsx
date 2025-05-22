import { Radio, Star, Clock, User, ExternalLink, Podcast } from "lucide-react";

export default function DeiplusCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Radio className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          Deiplus Media Platform
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Lead frontend developer for
            <strong className="text-gray-900">Radio Dei</strong> platform
            featuring:
          </p>

          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-green-600" />
              Live radio with Radioplayer
            </li>
            <li className="flex items-center gap-2">
              <Podcast className="w-4 h-4 text-green-600" />
              Podcast: audio and video with JWPlayer
            </li>
            <li className="flex items-center gap-2">
              <User className="w-4 h-4 text-aws-orange" />
              User login & profile management
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Add to favourites
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              Resume playback & watch history
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://deiplus.fi/"
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
