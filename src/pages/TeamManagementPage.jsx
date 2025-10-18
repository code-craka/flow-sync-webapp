import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserPlus, Trash2, Edit } from 'lucide-react';

const teamMembers = [
  { id: 'tm1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=64' },
  { id: 'tm2', name: 'Bob The Builder', email: 'bob@example.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=64' },
  { id: 'tm3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=64' },
  { id: 'tm4', name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=64' },
];

const TeamManagementPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Team Management</h1>
        <p className="text-muted-foreground">Manage your workspace members and their permissions.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 bg-card border rounded-lg shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Invite New Member</h2>
        <form className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
            <Input type="email" id="email" placeholder="name@example.com" />
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
            <Select defaultValue="editor">
              <SelectTrigger id="role" className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border rounded-lg shadow-sm overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[150px]">Role</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    member.role === 'Admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    member.role === 'Editor' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400'
                  }`}>
                    {member.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default TeamManagementPage;