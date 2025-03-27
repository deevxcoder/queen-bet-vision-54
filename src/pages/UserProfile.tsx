
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { User, Shield, Wallet, Clock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { user, updateUserProfile, isLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateUserProfile(data);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-queen-dark p-4">
        <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
          <CardHeader className="text-center">
            <CardTitle>Not Logged In</CardTitle>
            <CardDescription className="text-white/70">You need to log in to view your profile</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-queen-text-secondary">Manage your account information</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
              <Link to="/dashboard">
                <Shield className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button asChild className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
              <Link to="/wallet">
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription className="text-white/70">Basic details about your account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-queen-gold to-queen-gold/80 flex items-center justify-center mb-4">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover" 
                  />
                ) : (
                  <User size={48} className="text-queen-dark" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-queen-text-secondary">{user.email}</p>
              
              <div className="mt-4 w-full">
                <div className="flex justify-between text-sm py-2 border-b border-white/10">
                  <span className="text-queen-text-secondary">Member Since</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-white/10">
                  <span className="text-queen-text-secondary">Account Type</span>
                  <span className="capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-queen-text-secondary">Balance</span>
                  <span className="text-queen-gold">₹{user.balance.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 hover:text-white">
                <Clock className="h-4 w-4 mr-2" />
                Activity Log
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2 bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription className="text-white/70">Update your personal information</CardDescription>
              </div>
              {!isEditing && (
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing || isLoading}
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing || isLoading}
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!isEditing || isLoading}
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isEditing && (
                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-queen-gold text-queen-dark hover:bg-queen-gold/90"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        disabled={isLoading}
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                        className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
