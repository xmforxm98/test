import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Brain, Lock, Mail, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string, username: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && role) {
      onLogin(role, username);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white mb-2">AI Case Management System</h1>
          <p className="text-slate-400">Epic 1: Case Intelligence & Automation</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Sign In
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username/Email */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Username or Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-300">
                  Role
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger 
                    id="role"
                    className="bg-slate-950/50 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="case-lead" className="text-white focus:bg-blue-600/20 focus:text-blue-400">
                      Case Lead
                    </SelectItem>
                    <SelectItem value="case-lead-2" className="text-white focus:bg-blue-600/20 focus:text-blue-400">
                      Case Lead 2
                    </SelectItem>
                    <SelectItem value="analyst" className="text-white focus:bg-blue-600/20 focus:text-blue-400">
                      Analyst
                    </SelectItem>
                    <SelectItem value="dept-admin" className="text-white focus:bg-blue-600/20 focus:text-blue-400">
                      Dept Admin
                    </SelectItem>
                    <SelectItem value="dept-head" className="text-white focus:bg-blue-600/20 focus:text-blue-400">
                      Dept Head
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/20 mt-6"
              >
                Sign In
              </Button>

              {/* Demo Instructions */}
              <div className="mt-4 p-3 rounded-lg bg-blue-950/30 border border-blue-800/30">
                <p className="text-xs text-blue-300">
                  <span className="font-semibold">Demo Mode:</span> Enter any username and password to access the system
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Powered by AI Intelligence Engine
        </p>
      </div>
    </div>
  );
}