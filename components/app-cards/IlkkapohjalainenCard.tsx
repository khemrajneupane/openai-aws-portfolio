import {
  Newspaper,
  Globe,
  BookmarkCheck,
  MessageCircleHeart,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

export default function IlkkaPohjalainenCard() {
  return (
    <div className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Newspaper className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          Ilkkapohjalainen News
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Built a CMS-based frontend for{" "}
            <strong className="text-gray-900">Imediat</strong> using{" "}
            <strong className="text-gray-900">React.js, Node.js</strong>, and{" "}
            <strong>Malibu</strong> (by Quintype).
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-600" />
              Tulo SSO for login
            </li>
            <li className="flex items-center gap-2">
              <MessageCircleHeart className="w-4 h-4 text-pink-500" />
              Coral Comment system
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-aws-blue" />
              Chartbeat for analytics
            </li>
            <li className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              Bookmarking & tag following
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://ilkkapohjalainen.fi/"
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
