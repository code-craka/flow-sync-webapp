/**
 * Security Page
 */

import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye, FileCheck, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.',
  },
  {
    icon: Key,
    title: 'SSO & SAML Support',
    description: 'Enterprise-grade single sign-on with support for SAML 2.0 and OAuth 2.0.',
  },
  {
    icon: Eye,
    title: 'Access Controls',
    description: 'Role-based access control (RBAC) with granular permissions and audit logging.',
  },
  {
    icon: Server,
    title: 'Infrastructure Security',
    description: 'Hosted on SOC 2 Type II compliant infrastructure with 99.9% uptime SLA.',
  },
  {
    icon: FileCheck,
    title: 'Regular Audits',
    description: 'Annual third-party security audits and continuous vulnerability scanning.',
  },
  {
    icon: Shield,
    title: 'Data Privacy',
    description: 'GDPR, CCPA, and HIPAA compliant with comprehensive data protection measures.',
  },
];

const certifications = [
  { name: 'SOC 2 Type II', status: 'Certified' },
  { name: 'ISO 27001', status: 'Certified' },
  { name: 'GDPR', status: 'Compliant' },
  { name: 'HIPAA', status: 'Compliant' },
  { name: 'CCPA', status: 'Compliant' },
];

export default function SecurityPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Enterprise-Grade{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Security
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Your data security and privacy are our top priorities. Learn about our comprehensive security measures and compliance certifications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Security Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Compliance & Certifications
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm text-center">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-green-500" />
                      </div>
                      <h3 className="font-semibold mb-1">{cert.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {cert.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Security Practices
            </h2>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Data Encryption</h3>
                  <p className="text-muted-foreground">
                    All data in transit is protected using TLS 1.3 encryption. Data at rest is encrypted using AES-256 encryption with regularly rotated encryption keys managed through industry-standard key management systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Access Management</h3>
                  <p className="text-muted-foreground">
                    We implement the principle of least privilege with role-based access controls. All access is logged and monitored. Multi-factor authentication (MFA) is available and enforced for enterprise accounts.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Our infrastructure is hosted on AWS with SOC 2 Type II compliance. We implement network isolation, DDoS protection, and automated backup systems with point-in-time recovery.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Incident Response</h3>
                  <p className="text-muted-foreground">
                    We maintain a comprehensive incident response plan with 24/7 security monitoring. In the event of a security incident, we will notify affected customers within 72 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Questions About Security?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our security team is here to help. Contact us for security questionnaires, audits, or compliance documentation.
            </p>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm inline-block">
              <p className="text-sm text-muted-foreground">
                Security Team:{' '}
                <a href="mailto:security@flowsync.ai" className="text-primary hover:underline font-semibold">
                  security@flowsync.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
