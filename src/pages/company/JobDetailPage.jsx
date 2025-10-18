import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase, MapPin, CheckCircle, Send } from 'lucide-react';

const jobDetailsData = {
  'frontend-engineer': {
    title: 'Frontend Engineer (Remote)',
    department: 'Engineering',
    location: 'Remote',
    summary: 'Build beautiful, responsive, and high-performance user interfaces for FlowSyncAI using React, TailwindCSS, and Framer Motion.',
    responsibilities: [
      'Develop and maintain user-facing features using React.js.',
      'Build reusable components and front-end libraries for future use.',
      'Translate designs and wireframes into high-quality code.',
      'Optimize components for maximum performance across a vast array of web-capable devices and browsers.',
      'Collaborate with product designers and backend engineers to deliver a seamless user experience.',
      'Write clean, maintainable, and well-documented code.',
    ],
    requirements: [
      'Proven experience as a Frontend Engineer or similar role.',
      'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.',
      'Thorough understanding of React.js and its core principles.',
      'Experience with popular React.js workflows (such as Redux, Zustand, or Context API).',
      'Familiarity with TailwindCSS and utility-first CSS.',
      'Experience with modern frontend build pipelines and tools (e.g., Vite, Webpack, Babel).',
      'Knowledge of code versioning tools, such as Git.',
      'Excellent problem-solving skills and attention to detail.',
      'Ability to work independently and as part of a remote team.',
    ],
    niceToHaves: [
      'Experience with Framer Motion or other animation libraries.',
      'Familiarity with Supabase or other BaaS platforms.',
      'Experience with TypeScript.',
      'Understanding of UI/UX design principles.',
    ],
  },
  'product-designer': {
    title: 'Product Designer (Remote)',
    department: 'Design',
    location: 'Remote',
    summary: 'Shape the user experience of FlowSyncAI, creating intuitive and elegant designs that solve complex user problems.',
     responsibilities: [
      'Conduct user research and usability testing to understand user needs and pain points.',
      'Create wireframes, prototypes, and high-fidelity mockups for new features and improvements.',
      'Collaborate closely with product managers and engineers to define and implement design solutions.',
      'Maintain and evolve FlowSyncAI\'s design system and UI guidelines.',
      'Advocate for user-centered design principles throughout the product development lifecycle.',
      'Iterate on designs based on feedback, data, and user testing.',
    ],
    requirements: [
      'Proven experience as a Product Designer, UI/UX Designer, or similar role.',
      'Strong portfolio showcasing your design process and impactful solutions.',
      'Proficiency in design tools such as Figma, Sketch, or Adobe XD.',
      'Solid understanding of user-centered design principles and best practices.',
      'Experience with creating and maintaining design systems.',
      'Excellent visual design skills with a strong sense of typography, color, and layout.',
      'Ability to clearly articulate design decisions and rationale.',
      'Experience working in an agile development environment.',
    ],
    niceToHaves: [
      'Experience designing for AI-powered products.',
      'Knowledge of HTML, CSS, and JavaScript for prototyping purposes.',
      'Experience with motion design and micro-interactions.',
    ],
  },
  'ai-prompt-engineer': {
    title: 'AI Prompt Engineer (Remote)',
    department: 'AI & Research',
    location: 'Remote',
    summary: 'Craft and optimize prompts for our AI models (GPT-4 and others) to deliver magical experiences within FlowSyncAI.',
    responsibilities: [
      'Design, develop, and refine prompts for large language models (LLMs) like GPT-4.',
      'Collaborate with product and engineering teams to integrate AI features into FlowSyncAI.',
      'Analyze AI model outputs and iterate on prompts to improve accuracy, relevance, and tone.',
      'Stay up-to-date with the latest advancements in LLMs and prompt engineering techniques.',
      'Develop evaluation metrics and processes for assessing prompt performance.',
      'Document best practices and guidelines for prompt engineering within the company.',
    ],
    requirements: [
      'Proven experience in prompt engineering or working extensively with LLMs.',
      'Deep understanding of how LLMs work, including their capabilities and limitations.',
      'Excellent writing and communication skills, with an ability to craft clear and concise prompts.',
      'Strong analytical and problem-solving skills.',
      'Ability to iterate quickly and experiment with different prompting strategies.',
      'Familiarity with AI ethics and responsible AI development principles.',
    ],
    niceToHaves: [
      'Experience with fine-tuning LLMs.',
      'Programming skills (e.g., Python) for scripting and automation related to AI models.',
      'Background in linguistics, cognitive science, or a related field.',
      'Experience working with APIs for AI models.',
    ],
  },
};

const DetailSection = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
    <ul className="list-none space-y-2 pl-0">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const JobDetailPage = () => {
  const { jobId } = useParams();
  const job = jobDetailsData[jobId];

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">The job listing you're looking for doesn't exist or has been filled.</p>
          <Button asChild>
            <Link to="/company/careers">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" className="group">
              <Link to="/company/careers">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Openings
              </Link>
            </Button>
          </div>

          <Card className="rounded-2xl shadow-xl soft-shadow border-border overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b bg-muted/20">
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight gradient-text mb-2">
                {job.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <CardDescription className="text-lg text-muted-foreground mb-8">{job.summary}</CardDescription>
              
              <DetailSection title="Responsibilities" items={job.responsibilities} />
              <DetailSection title="Requirements" items={job.requirements} />
              {job.niceToHaves && job.niceToHaves.length > 0 && (
                <DetailSection title="Nice to Haves" items={job.niceToHaves} />
              )}

              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">How to Apply</h3>
                <p className="text-muted-foreground mb-6">
                  If you're excited about this role and believe you're a good fit, we'd love to hear from you! Please send your resume and a cover letter (optional, but appreciated) to:
                </p>
                <Button size="lg" asChild className="rounded-lg gradient-bg text-white group">
                  <a href={`mailto:jobs@flowsync.ai?subject=Application for ${encodeURIComponent(job.title)}`}>
                    Apply Now <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  FlowSyncAI is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailPage;