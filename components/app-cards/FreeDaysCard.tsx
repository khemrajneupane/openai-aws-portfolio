import {
  Radio,
  ExternalLink,
  CalendarDays,
  Users,
  CheckCircle,
  LogIn,
} from "lucide-react";
export default function FreeDaysCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Radio className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          Free Days Calculation
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            A full-stack web application built with Next.js, enabling users to
            log in via form authentication or Google login. Logged-in users can
            mark their free days on a calendar, and the system ranks the most
            common free days among all users.
          </p>

          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <LogIn className="w-4 h-4 text-emerald-600" />
              Secure Login with Google or email/password
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-indigo-500" />
              Select free days via an interactive calendar
            </li>
            <li className="flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-500" />
              See most common free days among all users
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Built with Next.js, Tailwind CSS, and MongoDB
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://hamro-pariwar.vercel.app/"
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
