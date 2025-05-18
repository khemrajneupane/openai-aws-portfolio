import Link from "next/link";

export default function FargateCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-aws-blue">
      <div className="bg-aws-blue p-4">
        <h3 className="text-xl font-bold text-white">AWS Fargate</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          Serverless compute engine for containers that works with ECS and EKS.
        </p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          <li>• No server management</li>
          <li>• Fine-grained resource allocation</li>
          <li>• Integrated with other AWS services</li>
        </ul>
        <Link href="/api/aws/fargate" className="text-aws-blue hover:underline">
          View Fargate Demo →
        </Link>
      </div>
    </div>
  );
}
