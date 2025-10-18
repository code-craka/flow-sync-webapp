/**
 * GDPR Compliance Page
 */

import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const gdprRights = [
  {
    title: 'Right to Access',
    description: 'You have the right to request a copy of all personal data we hold about you.',
  },
  {
    title: 'Right to Rectification',
    description: 'You can request that we correct any inaccurate or incomplete personal data.',
  },
  {
    title: 'Right to Erasure',
    description: 'You can request that we delete your personal data under certain conditions.',
  },
  {
    title: 'Right to Restriction',
    description: 'You can request that we restrict the processing of your personal data.',
  },
  {
    title: 'Right to Data Portability',
    description: 'You can request to receive your personal data in a structured, machine-readable format.',
  },
  {
    title: 'Right to Object',
    description: 'You can object to the processing of your personal data for direct marketing purposes.',
  },
];

export default function GDPRPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <Badge variant="secondary" className="mb-4">GDPR Compliance</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Your Data,{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Your Rights
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-green-500/10 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">GDPR Compliant</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    FlowSync AI is fully compliant with the EU General Data Protection Regulation (GDPR). We have implemented appropriate technical and organizational measures to ensure the security and privacy of your personal data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Your GDPR Rights
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {gdprRights.map((right, index) => (
                <motion.div
                  key={right.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2">{right.title}</h3>
                          <p className="text-sm text-muted-foreground">{right.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Process Data */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How We Process Your Data
            </h2>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Legal Basis for Processing</h3>
                  <p className="text-muted-foreground">
                    We process your personal data based on one or more of the following legal grounds:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                    <li>Your consent</li>
                    <li>Performance of a contract</li>
                    <li>Compliance with legal obligations</li>
                    <li>Legitimate interests</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Data We Collect</h3>
                  <p className="text-muted-foreground">
                    We collect and process the following types of personal data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                    <li>Account information (name, email, password)</li>
                    <li>Usage data (activity logs, preferences)</li>
                    <li>Technical data (IP address, browser type, device information)</li>
                    <li>Communication data (support messages, feedback)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Data Retention</h3>
                  <p className="text-muted-foreground">
                    We retain your personal data for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Data Transfers</h3>
                  <p className="text-muted-foreground">
                    We may transfer your personal data to countries outside the European Economic Area (EEA). When we do, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exercise Your Rights */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Exercise Your Rights
            </h2>
            <p className="text-lg text-muted-foreground">
              You can exercise any of your GDPR rights by contacting our Data Protection Officer. We will respond to your request within 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                Submit Data Request
              </Button>
              <Button size="lg" variant="outline" asLink to="/contact">
                Contact DPO
              </Button>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm inline-block mt-8">
              <p className="text-sm text-muted-foreground">
                Data Protection Officer:{' '}
                <a href="mailto:dpo@flowsync.ai" className="text-primary hover:underline font-semibold">
                  dpo@flowsync.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">Related Policies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/legal/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/legal/cookies">Cookie Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/legal/security">Security</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
