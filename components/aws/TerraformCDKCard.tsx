import Link from "next/link";

export default function TerraformCDKCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-aws-dark">
      <div className="bg-aws-dark p-4">
        <h3 className="text-xl font-bold text-white">Terraform & AWS CDK</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          Infrastructure as Code tools for provisioning and managing cloud
          resources.
        </p>
        <ul className="text-sm text-gray-600 mb-4 space-y-1">
          <li>• Version-controlled infrastructure</li>
          <li>• Repeatable deployments</li>
          <li>• Multi-cloud support (Terraform)</li>
        </ul>
        <div className="space-y-2">
          <Link
            href="https://github.com/yourusername/portfolio-infra"
            className="block text-aws-blue hover:underline"
          >
            View Terraform Code →
          </Link>
          <Link
            href="https://github.com/yourusername/portfolio-infra"
            className="block text-aws-blue hover:underline"
          >
            View CDK Code →
          </Link>
        </div>
      </div>
    </div>
  );
}
