
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
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Authentication = () => {
  const navigate = useNavigate();
  const { login, selectedCampus } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
              Sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
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
