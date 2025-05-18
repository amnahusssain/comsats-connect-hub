
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Authentication = () => {
  const navigate = useNavigate();
  const { login, selectedCampus } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to COMSATS Connect Hub!",
        });
        navigate('/home');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // In a real app, you'd register the user here
    // For now, just try to log them in
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Account created",
          description: "Welcome to COMSATS Connect Hub!",
        });
        navigate('/home');
      } else {
        toast({
          title: "Registration failed",
          description: "Please check your email format and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const validateEmail = (email: string) => {
    if (!selectedCampus) return true;
    return email.endsWith(selectedCampus.emailExtension);
  };
  
  return (
    <div className="min-h-screen bg-comsats-gray p-5 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-comsats-blue">
            {selectedCampus?.name}
          </h1>
          <p className="text-gray-600 text-sm">
            Please use your campus email ({selectedCampus?.emailExtension})
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={!validateEmail(email) && email ? 'border-red-500' : ''}
                    />
                    {!validateEmail(email) && email && (
                      <p className="text-red-500 text-xs">
                        Email must end with {selectedCampus?.emailExtension}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-comsats-blue hover:bg-comsats-blue/90"
                    disabled={loading || !validateEmail(email)}
                  >
                    {loading ? 'Logging in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={!validateEmail(email) && email ? 'border-red-500' : ''}
                    />
                    {!validateEmail(email) && email && (
                      <p className="text-red-500 text-xs">
                        Email must end with {selectedCampus?.emailExtension}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className={
                        password && confirmPassword && password !== confirmPassword
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {password && confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-xs">Passwords don't match</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-comsats-blue hover:bg-comsats-blue/90"
                    disabled={
                      loading || 
                      !validateEmail(email) || 
                      (password !== confirmPassword) ||
                      password.length < 6
                    }
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/campus-selection')}
            >
              Back to Campus Selection
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Authentication;
