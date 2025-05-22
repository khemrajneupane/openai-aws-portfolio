import { LayoutDashboard, Puzzle, Wand2, ExternalLink } from "lucide-react";

export default function MediaToolsCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2">
        <LayoutDashboard className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          Fiare Media Tools
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>Suite of digital tools for media houses focusing on:</p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-purple-600" />
              Layout automation & editorial planning
            </li>
            <li className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-aws-orange" />
              3rd-party tool integrations
            </li>
            <li className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-aws-blue" />
              UI design for media workflows
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <a
            href="https://www.fiaremediatools.fi/"
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
