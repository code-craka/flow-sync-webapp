import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const Section = ({ title, children, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="mb-8 scroll-mt-20"
  >
    <h2 className="text-2xl font-semibold mb-4 text-primary gradient-text">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 flex flex-col pt-16 md:pt-20">
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl soft-shadow border-border overflow-hidden">
              <CardHeader className="bg-muted/30 p-6 sm:p-8 border-b">
                <div className="flex items-center space-x-3 mb-2">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">
                    Privacy Policy
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Last Updated: May 30, 2025</p>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 text-foreground">
                <Section title="1. Introduction" id="introduction">
                  <p>FlowSyncAI ("we," "us," "our") is a global AI-powered productivity platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. We are committed to protecting your data and complying with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the UK and EU, the California Consumer Privacy Act (CCPA) for California residents, and the Digital Security Act (DSA) / proposed Data Protection Law of Bangladesh.</p>
                </Section>

                <Section title="2. What Data We Collect" id="data-collected">
                  <p>We may collect the following types of information:</p>
                  <ul>
                    <li><strong>Account Data:</strong> Name, email address, password (hashed), and profile information if you sign up via OAuth providers (e.g., Google, GitHub).</li>
                    <li><strong>Product Usage Data:</strong> Information related to your use of the Service, such as tasks created, projects managed, comments, chat messages, and interactions with AI features.</li>
                    <li><strong>Technical Data:</strong> Device type, browser type and version, IP address, approximate location (derived from IP address), operating system, and cookie data (see our Cookies section below).</li>
                  </ul>
                </Section>

                <Section title="3. Legal Basis for Processing (GDPR)" id="legal-basis">
                  <p>If you are in the European Economic Area (EEA) or the UK, we process your personal data based on the following legal grounds:</p>
                  <ul>
                    <li><strong>Consent:</strong> Where you have given us explicit consent for specific processing activities.</li>
                    <li><strong>Contractual Necessity:</strong> To perform our contractual obligations to you, such as providing the Service.</li>
                    <li><strong>Legitimate Interests:</strong> For our legitimate interests, such as improving the Service, security, and analytics, provided these interests are not overridden by your data protection rights.</li>
                  </ul>
                </Section>

                <Section title="4. Your Rights" id="your-rights">
                  <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                  <p><strong>GDPR (UK/EU Users):</strong></p>
                  <ul>
                    <li>Right of Access: To request copies of your personal data.</li>
                    <li>Right to Rectification: To request correction of inaccurate data.</li>
                    <li>Right to Erasure ("Right to be Forgotten"): To request deletion of your data.</li>
                    <li>Right to Data Portability: To receive your data in a machine-readable format.</li>
                    <li>Right to Object: To object to processing based on legitimate interests.</li>
                    <li>Right to Restriction of Processing: To request limitation of how we use your data.</li>
                  </ul>
                  <p><strong>CCPA (California Users):</strong></p>
                  <ul>
                    <li>Right to Know: About the categories and specific pieces of personal information collected.</li>
                    <li>Right to Delete: To request deletion of your personal information.</li>
                    <li>Right to Opt-Out of Sale: We do not sell your personal data, so this right is noted for completeness but not applicable in that manner.</li>
                    <li>Right to Non-Discrimination: For exercising your CCPA rights.</li>
                  </ul>
                  <p><strong>Bangladesh (DSA / Data Protection Draft Bill):</strong></p>
                  <ul>
                    <li>Right to Privacy: As enshrined in law.</li>
                    <li>Right to Correction: To request correction of inaccurate personal data.</li>
                    <li>Right to Withdrawal of Consent: Where processing is based on consent.</li>
                  </ul>
                  <p>To exercise these rights, please contact us at <a href="mailto:privacy@flowsync.ai" className="text-primary hover:underline">privacy@flowsync.ai</a>.</p>
                </Section>

                <Section title="5. How We Use Your Data" id="data-usage">
                  <p>We use your data for the following purposes:</p>
                  <ul>
                    <li>To provide, operate, and maintain our Service, including user authentication.</li>
                    <li>To personalize your experience and provide AI-powered suggestions and features.</li>
                    <li>To improve our Service, develop new features, and conduct analytics.</li>
                    <li>To communicate with you, including sending transactional emails and service updates.</li>
                    <li>To ensure security and prevent fraud.</li>
                  </ul>
                </Section>

                <Section title="6. Sharing and Disclosure" id="sharing-disclosure">
                  <p>We do <strong>not</strong> sell your personal data.</p>
                  <p>We may share your information with trusted third-party service providers (processors) who assist us in operating our Service, such as:</p>
                  <ul>
                    <li>Supabase (for backend infrastructure, database, and authentication).</li>
                    <li>Stripe (for payment processing, if applicable).</li>
                    <li>Analytics providers (e.g., PostHog) to help us understand Service usage.</li>
                  </ul>
                  <p>These processors are contractually bound to protect your data and use it only for the purposes we specify. Where required by law (e.g., for transfers outside the EEA/UK), we ensure appropriate safeguards like Data Processing Addendums (DPAs) and Standard Contractual Clauses (SCCs) are in place.</p>
                  <p>We may also disclose your information if required by law or in response to valid requests by public authorities.</p>
                </Section>

                <Section title="7. International Transfers" id="international-transfers">
                  <p>Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. FlowSyncAI is a global service, and data may be processed in various locations, including the United States.</p>
                  <p>For transfers of data from the EEA, UK, or Switzerland, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) or other mechanisms recognized by applicable law to ensure your data is adequately protected.</p>
                </Section>

                <Section title="8. Security Measures" id="security">
                  <p>We implement robust security measures to protect your data, including:</p>
                  <ul>
                    <li>TLS encryption for data in transit.</li>
                    <li>Hashed credentials for account security.</li>
                    <li>Supabase's built-in security features, including Row Level Security (RLS).</li>
                    <li>Network security measures like IP restriction where appropriate.</li>
                    <li>Internal access controls and logs.</li>
                    <li>Regular security reviews and updates to our practices.</li>
                  </ul>
                  <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                </Section>

                <Section title="9. Data Retention" id="data-retention">
                  <p>We retain your personal data for as long as your account is active or as needed to provide you with the Service. We may also retain your data for a longer period if necessary to comply with our legal obligations, resolve disputes, or enforce our agreements.</p>
                </Section>

                <Section title="10. Cookies and Tracking Technologies" id="cookies">
                  <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
                  <ul>
                    <li><strong>Functional Cookies:</strong> Essential for the operation of our Service (e.g., session management).</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how our Service is used (e.g., by PostHog).</li>
                  </ul>
                  <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. For more information on how to manage cookies, please refer to your browser's help documentation.</p>
                </Section>

                <Section title="11. Children's Privacy" id="childrens-privacy">
                  <p>Our Service is not intended for use by individuals under the age of 13 (in the USA) or under the age of 16 (in the EU/UK and other regions where this age limit applies). We do not knowingly collect personally identifiable information from children under these ages. If you become aware that a child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
                </Section>

                <Section title="12. Contact Us" id="contact">
                  <p>If you have any questions, requests, or complaints about this Privacy Policy or our data practices, please contact us at:</p>
                  <p>Email: <a href="mailto:privacy@flowsync.ai" className="text-primary hover:underline">privacy@flowsync.ai</a></p>
                </Section>

                <Section title="13. Changes to This Policy" id="changes-policy">
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                </Section>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default PrivacyPolicyPage;