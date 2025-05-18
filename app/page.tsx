/*import ChatInterface from "@/components/ChatInterface";
import LambdaCard from "@/components/aws/LambdaCard";
import FargateCard from "@/components/aws/FargateCard";
import EC2Card from "@/components/aws/EC2Card";
import SQSCard from "@/components/aws/SQSCard";
import RedisCard from "@/components/aws/RedisCard";
import TerraformCDKCard from "@/components/TerraformCDKCard";*/

import EC2Card from "@/components/aws/EC2Card";
import FargateCard from "@/components/aws/FargateCard";
import LambdaCard from "@/components/aws/LambdaCard";
import RedisCard from "@/components/aws/RedisCard";
import SQSCard from "@/components/aws/SQSCard";
import TerraformCDKCard from "@/components/aws/TerraformCDKCard";
import ChatInterface from "@/components/chatUI/ChatInterface";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-aws-dark mb-4">
          Welcome to My AWS Portfolio
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Showcasing my expertise with AWS services, infrastructure as code, and
          modern web development.
        </p>
      </section>

      <section id="aws-services" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          AWS Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LambdaCard />
          <FargateCard />
          <EC2Card />
          <SQSCard />
          <RedisCard />
          <TerraformCDKCard />
        </div>
      </section>

      <section id="chat" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          AI Chat Demo
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <ChatInterface />
        </div>
      </section>
    </div>
  );
}
