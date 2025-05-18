import Link from "next/link";

export default function RedisCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-aws-blue">
      <div className="bg-aws-blue p-4">
        <h3 className="text-xl font-bold text-white">
          Amazon ElastiCache (Redis)
        </h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          Fully managed Redis service for low-latency, high-throughput data
          access.
        </p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          <li>• In-memory data store</li>
          <li>• Sub-millisecond latency</li>
          <li>• Session caching, real-time analytics</li>
        </ul>
        <Link href="/api/aws/redis" className="text-aws-blue hover:underline">
          View Redis Demo →
        </Link>
      </div>
    </div>
  );
}
