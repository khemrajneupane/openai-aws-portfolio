import Link from "next/link";

export default function EC2Card() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-aws-dark">
      <div className="bg-aws-dark p-4">
        <h3 className="text-xl font-bold text-white">Amazon EC2</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          Scalable virtual servers in the cloud with flexible pricing options.
        </p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          <li>• Wide range of instance types</li>
          <li>• Elastic IP addresses</li>
          <li>• Free tier eligible</li>
        </ul>
        <Link href="/api/aws/ec2" className="text-aws-blue hover:underline">
          View EC2 Demo →
        </Link>
      </div>
    </div>
  );
}
