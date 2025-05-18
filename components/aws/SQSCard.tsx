import Link from "next/link";

export default function SQSCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-aws-orange">
      <div className="bg-aws-orange p-4">
        <h3 className="text-xl font-bold text-white">Amazon SQS</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          Fully managed message queuing service for microservices and serverless
          applications.
        </p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          <li>• Decouple application components</li>
          <li>• Highly scalable</li>
          <li>• Standard and FIFO queues</li>
        </ul>
        <Link href="/api/aws/sqs" className="text-aws-blue hover:underline">
          View SQS Demo →
        </Link>
      </div>
    </div>
  );
}
