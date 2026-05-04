"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const ROLES = [
  { value: "super_admin", label: "Super admin" },
  { value: "editor", label: "Editor" },
] as const;

/** Returns a user-facing message if the password does not meet policy, otherwise null. */
function validateManagementPassword(password: string): string | null {
  const missing: string[] = [];
  if (password.length < 8) missing.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) missing.push("an uppercase letter");
  if (!/[a-z]/.test(password)) missing.push("a lowercase letter");
  if (!/[0-9]/.test(password)) missing.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) missing.push("a special character");
  if (missing.length === 0) return null;
  return `Password must include ${missing.join(", ")}.`;
}

type FormProps = {
  onAuthenticated?: () => void;
};

export default function Form({ onAuthenticated }: FormProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "editor" as "super_admin" | "editor",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/management/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoginError(
          typeof data.message === "string" ? data.message : "Login failed"
        );
        return;
      }
      if (data.token) {
        localStorage.setItem("rm_token", data.token);
        onAuthenticated?.();
      } else {
        setLoginError("No token returned");
      }
    } catch {
      setLoginError("Something went wrong. Try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    const policyError = validateManagementPassword(registerData.password);
    if (policyError) {
      setRegisterError(policyError);
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    setRegisterLoading(true);
    try {
      const res = await fetch("/api/management/controller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name.trim(),
          email: registerData.email.trim(),
          password: registerData.password,
          role: registerData.role,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRegisterError(
          typeof data.message === "string"
            ? data.message
            : "Registration failed"
        );
        return;
      }
      setRegisterSuccess(
        typeof data.message === "string"
          ? data.message
          : "Account created. You can sign in."
      );
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "editor",
      });
    } catch {
      setRegisterError("Something went wrong. Try again.");
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-muted/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Management
          </CardTitle>
          <CardDescription>
            Sign in to the admin area or create a management account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full gap-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign in</TabsTrigger>
              <TabsTrigger value="register">Create account</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      className="pr-10"
                      type={showLoginPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowLoginPassword((v) => !v)}
                      aria-label={
                        showLoginPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showLoginPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {loginError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {loginError}
                  </p>
                ) : null}
                <Button type="submit" className="w-full" disabled={loginLoading}>
                  {loginLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="mt-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Name</Label>
                  <Input
                    id="register-name"
                    autoComplete="name"
                    required
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData((d) => ({ ...d, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-role">Role</Label>
                  <Select
                    value={registerData.role}
                    onValueChange={(value: "super_admin" | "editor") =>
                      setRegisterData((d) => ({ ...d, role: value }))
                    }
                  >
                    <SelectTrigger
                      id="register-role"
                      className="w-full"
                      size="default"
                    >
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      className="pr-10"
                      type={showRegisterPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData((d) => ({
                          ...d,
                          password: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowRegisterPassword((v) => !v)}
                      aria-label={
                        showRegisterPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use at least 8 characters with uppercase, lowercase, a number,
                    and a special character (e.g. !@#$%).
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="register-confirm"
                      className="pr-10"
                      type={showRegisterConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData((d) => ({
                          ...d,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowRegisterConfirm((v) => !v)}
                      aria-label={
                        showRegisterConfirm
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showRegisterConfirm ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {registerError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {registerError}
                  </p>
                ) : null}
                {registerSuccess ? (
                  <p className="text-sm text-muted-foreground" role="status">
                    {registerSuccess}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerLoading}
                >
                  {registerLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
