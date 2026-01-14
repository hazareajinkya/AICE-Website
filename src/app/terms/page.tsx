import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | AICE",
  description: "Terms of Service for AICE - AI Center of Excellence",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest mb-8">
          Terms of Service
        </h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Last Updated: January 2026
            </h2>
            <p className="mb-4">
              Please read these Terms of Service ("Terms") carefully before using the AICE (Artificial Intelligence 
              Center of Excellence) website and services. By accessing or using our services, you agree to be bound 
              by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Course Enrollment and Payment
            </h2>
            <p className="mb-4">
              When you enroll in our courses:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You agree to pay the specified course fees</li>
              <li>All payments are processed securely through third-party payment providers</li>
              <li>Course fees are non-refundable unless otherwise stated</li>
              <li>Pre-enrollment does not guarantee course access until full payment is received</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Course Access and Usage
            </h2>
            <p className="mb-4">
              Upon enrollment, you will receive:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Lifetime access to course materials</li>
              <li>Access across all devices</li>
              <li>Community membership</li>
              <li>Certificate of completion upon course completion</li>
            </ul>
            <p className="mt-4">
              You agree not to share, distribute, or resell course materials without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Intellectual Property
            </h2>
            <p className="mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, audio clips, 
              video clips, and software, is the property of AICE or its content suppliers and is protected by 
              copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              User Conduct
            </h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Reproduce, duplicate, or copy course materials without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Disclaimer
            </h2>
            <p className="mb-4">
              The information provided in our courses is for educational purposes only. While we strive to provide 
              accurate and up-to-date information, we make no warranties or representations about the accuracy, 
              completeness, or suitability of the information provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Limitation of Liability
            </h2>
            <p className="mb-4">
              AICE shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Changes to Terms
            </h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes 
              by posting the updated Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us using the information provided 
              on our Contact page.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

