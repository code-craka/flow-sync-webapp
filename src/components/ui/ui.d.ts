// Type declarations for UI components (JavaScript files)
declare module '@/components/ui/button' {
  export const Button: any
  export const buttonVariants: any
}

declare module '@/components/ui/dropdown-menu' {
  export const DropdownMenu: any
  export const DropdownMenuContent: any
  export const DropdownMenuItem: any
  export const DropdownMenuLabel: any
  export const DropdownMenuSeparator: any
  export const DropdownMenuTrigger: any
}

declare module '@/components/ui/dialog' {
  export const Dialog: any
  export const DialogContent: any
  export const DialogDescription: any
  export const DialogFooter: any
  export const DialogHeader: any
  export const DialogTitle: any
  export const DialogTrigger: any
}

declare module '@/components/ui/alert-dialog' {
  export const AlertDialog: any
  export const AlertDialogAction: any
  export const AlertDialogCancel: any
  export const AlertDialogContent: any
  export const AlertDialogDescription: any
  export const AlertDialogFooter: any
  export const AlertDialogHeader: any
  export const AlertDialogTitle: any
  export const AlertDialogTrigger: any
}

declare module '@/components/ui/avatar' {
  export const Avatar: any
  export const AvatarImage: any
  export const AvatarFallback: any
}

declare module '@/components/ui/card' {
  export const Card: any
  export const CardHeader: any
  export const CardTitle: any
  export const CardDescription: any
  export const CardContent: any
  export const CardFooter: any
}

declare module '@/components/ui/checkbox' {
  export const Checkbox: any
}

declare module '@/components/ui/badge' {
  export const Badge: any
  export const badgeVariants: any
}

declare module '@/components/ui/separator' {
  export const Separator: any
}

declare module '@/components/ui/input' {
  export const Input: any
}

declare module '@/components/ui/label' {
  export const Label: any
}

declare module '@/components/ui/textarea' {
  export const Textarea: any
}

declare module '@/components/ui/select' {
  export const Select: any
  export const SelectTrigger: any
  export const SelectValue: any
  export const SelectContent: any
  export const SelectItem: any
  export const SelectGroup: any
  export const SelectLabel: any
}

declare module '@/components/ui/table' {
  export const Table: any
  export const TableHeader: any
  export const TableBody: any
  export const TableFooter: any
  export const TableHead: any
  export const TableRow: any
  export const TableCell: any
  export const TableCaption: any
}

declare module '@/components/ui/use-toast' {
  export function useToast(): {
    toast: (options: {
      title?: string
      description?: string
      variant?: 'default' | 'destructive' | 'success'
      duration?: number
    }) => void
    dismiss: (toastId?: string) => void
  }
  export const toast: any
}

declare module '@/contexts/AuthContext' {
  import type { AuthContextType, User, Session } from '@/types'
  export function useAuth(): AuthContextType & {
    user: User | null
    session: Session | null
    loading: boolean
  }
  export const AuthProvider: any
}

declare module './AuthContext' {
  import type { AuthContextType, User, Session } from '@/types'
  export function useAuth(): AuthContextType & {
    user: User | null
    session: Session | null
    loading: boolean
  }
  export const AuthProvider: any
}
