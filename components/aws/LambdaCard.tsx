import Link from "next/link";

export default function LambdaCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-aws-orange">
      <div className="bg-aws-orange p-4">
        <h3 className="text-xl font-bold text-white">AWS Lambda</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          Serverless compute service that runs your code in response to events.
        </p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          <li>• Event-driven architecture</li>
          <li>• Automatic scaling</li>
          <li>• Pay-per-use pricing</li>
        </ul>
        <Link href="/api/aws/lambda" className="text-aws-blue hover:underline">
          View Lambda Demo →
        </Link>
      </div>
    </div>
  );
}
