import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | AICE",
  description: "Privacy Policy for AICE - AI Center of Excellence",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Last Updated: January 2026
            </h2>
            <p className="mb-4">
              At AICE (Artificial Intelligence Center of Excellence), we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Information We Collect
            </h2>
            <p className="mb-4">
              We may collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address when you pre-enroll for our courses</li>
              <li>Name and contact information</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process your enrollment and provide course access</li>
              <li>Send you updates about course availability and enrollment</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our services and website experience</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Your Rights
            </h2>
            <p className="mb-4">
              You have the right to access, update, or delete your personal information at any time. 
              To exercise these rights, please contact us using the information provided in our Contact page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at the information 
              provided on our Contact page.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

