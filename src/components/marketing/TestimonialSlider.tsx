/**
 * Testimonial Slider Component
 *
 * Auto-scrolling testimonials with beautiful animations
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialSlider({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < current.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg md:text-xl leading-relaxed mb-8 relative z-10">
              "{current.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src={current.avatar} alt={current.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                  {current.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role} at {current.company}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

// Default testimonials for demo
export const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechCorp',
    content:
      'FlowSync AI transformed how our team collaborates. The AI-powered insights have helped us ship 40% faster while maintaining high quality.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content:
      'The best project management tool we\'ve ever used. The real-time collaboration features are game-changing, and the AI suggestions are surprisingly accurate.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Design Lead',
    company: 'Creative Studios',
    content:
      'Beautiful UI, powerful features, and incredible support. FlowSync AI helps our distributed team stay aligned and productive across 5 time zones.',
    rating: 5,
  },
];
