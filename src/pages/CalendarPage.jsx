import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, PlusCircle, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CalendarPage = () => {
  // This is a placeholder. A real calendar would need a library like FullCalendar or build custom logic.
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Simplified month view
  const today = new Date().getDate();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Project Calendar</h1>
          <p className="text-muted-foreground mt-1 text-lg">View your tasks and deadlines at a glance.</p>
        </div>
        <Button size="lg">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Event
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-lg rounded-xl overflow-hidden border">
          <CardHeader className="p-6 bg-muted/50 border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
              <CardTitle className="text-2xl font-semibold">May 2025</CardTitle>
              <Button variant="outline" size="icon"><ChevronRight className="h-5 w-5" /></Button>
            </div>
            <Button variant="outline">Today</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center font-medium text-muted-foreground border-r last:border-r-0">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-5">
              {days.map(day => (
                <motion.div
                  key={day}
                  className={`p-3 h-28 border-r border-b ${day > 31 ? 'bg-muted/30' : 'hover:bg-muted/50 transition-colors cursor-pointer'} ${day === today && day <= 31 ? 'bg-primary/10' : ''}`}
                  whileHover={{ scale: day <= 31 ? 1.02 : 1 }}
                  onClick={() => day <=31 && alert(`Clicked on day ${day}`)}
                >
                  <span className={`font-medium ${day > 31 ? 'text-muted-foreground/50' : ''}`}>{day <= 31 ? day : ''}</span>
                  {/* Placeholder for events */}
                  {day === 15 && (
                    <div className="mt-1 p-1.5 bg-blue-500 text-white rounded-md text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Team Meeting
                    </div>
                  )}
                   {day === 22 && (
                    <div className="mt-1 p-1.5 bg-green-500 text-white rounded-md text-xs">
                      Project Deadline
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CalendarPage;